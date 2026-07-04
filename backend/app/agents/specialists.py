import os
import sys
import json
import re
import ast
import operator
import datetime
import httpx
import trafilatura
import yfinance as yf
from typing import Annotated, Sequence, TypedDict, Dict, Any, Literal
from duckduckgo_search import DDGS
from langchain_core.messages import BaseMessage, AIMessage, HumanMessage, SystemMessage, ToolMessage
from langchain_core.tools import tool
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode

# Adjust path
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from app.llm.gateway import gateway

# ---------------------------------------------------------------------
# MCP Tools Sync Loader
# ---------------------------------------------------------------------
import asyncio
import threading
from functools import partial
from langchain_core.tools import StructuredTool
from app.mcp_client import get_mcp_tools

# We run a persistent background event loop for async MCP tool calls.
# MCP tools from langchain-mcp-adapters are async-only (StructuredTool without sync _run).
# LangGraph's ToolNode calls tools synchronously by default, so we bridge them here.
_mcp_loop = asyncio.new_event_loop()
_mcp_thread = threading.Thread(target=_mcp_loop.run_forever, daemon=True)
_mcp_thread.start()

def _run_async_tool(tool_obj, **kwargs):
    """Runs an async MCP tool on the background event loop from a sync context."""
    future = asyncio.run_coroutine_threadsafe(tool_obj.ainvoke(kwargs), _mcp_loop)
    return future.result(timeout=30)

def _make_sync_wrapper(tool_obj):
    """Create a synchronous StructuredTool wrapper around an async MCP tool."""
    tool_name = tool_obj.name
    tool_desc = tool_obj.description or f"MCP tool: {tool_name}"

    # Capture tool_obj in closure
    def _sync_fn(**kwargs) -> str:
        return _run_async_tool(tool_obj, **kwargs)

    # Use the original tool's args_schema if available (Pydantic model), else None
    schema = tool_obj.args_schema if hasattr(tool_obj.args_schema, "model_fields") else None

    return StructuredTool.from_function(
        func=_sync_fn,
        name=tool_name,
        description=tool_desc,
        args_schema=schema,
    )

mcp_tools_raw = []
try:
    class AsyncRunner:
        def __init__(self):
            self.result = []
        def run(self):
            self.result = asyncio.run(get_mcp_tools())
            
    runner = AsyncRunner()
    t_mcp = threading.Thread(target=runner.run)
    t_mcp.start()
    t_mcp.join()
    mcp_tools_raw = runner.result
except Exception as mcp_err:
    print(f"[Specialists MCP Load Warning] Failed to load MCP tools synchronously: {mcp_err}")
    mcp_tools_raw = []

# Wrap all async MCP tools into sync-compatible wrappers for ToolNode
mcp_tools = [_make_sync_wrapper(t) for t in mcp_tools_raw]


def _get_tool_schema(t) -> dict:
    if not t.args_schema:
        parameters = {"type": "object", "properties": {}}
    elif hasattr(t.args_schema, "model_json_schema"):
        parameters = t.args_schema.model_json_schema()
    elif hasattr(t.args_schema, "schema"):
        parameters = t.args_schema.schema()
    else:
        parameters = {"type": "object", "properties": {}}
    return {
        "type": "function",
        "function": {
            "name": t.name,
            "description": t.description or "",
            "parameters": parameters
        }
    }

# =====================================================================
# 1. STATE STRUCTURE FOR SPECIALISTS (COMPATIBLE WITH PARENT STATE)
# =====================================================================
class SpecialistState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]
    scratchpad: Dict[str, str]

# Helper to bridge LangChain messages to Gateway
def _bridge_to_gateway(messages_seq: Sequence[BaseMessage]) -> list:
    gateway_messages = []
    for m in messages_seq:
        if isinstance(m, SystemMessage):
            gateway_messages.append({"role": "system", "content": m.content})
        elif isinstance(m, HumanMessage):
            gateway_messages.append({"role": "user", "content": m.content})
        elif isinstance(m, AIMessage):
            msg = {"role": "assistant", "content": m.content or ""}
            if m.tool_calls:
                msg["tool_calls"] = [
                    {
                        "id": tc["id"],
                        "type": "function",
                        "function": {
                            "name": tc["name"],
                            "arguments": json.dumps(tc["args"])
                        }
                    } for tc in m.tool_calls
                ]
            gateway_messages.append(msg)
        elif isinstance(m, ToolMessage):
            gateway_messages.append({
                "role": "tool",
                "tool_call_id": m.tool_call_id,
                "name": m.name,
                "content": m.content
            })
    return gateway_messages

def _bridge_to_langchain(tool_calls: list) -> list:
    lc_tool_calls = []
    if tool_calls:
        for tc in tool_calls:
            tc_name = tc["function"]["name"]
            tc_args_str = tc["function"]["arguments"]
            tc_id = tc["id"]
            try:
                tc_args = json.loads(tc_args_str) if isinstance(tc_args_str, str) else tc_args_str
            except Exception:
                tc_args = {}
            # Guard: Pydantic requires args to be a dict, never None
            if tc_args is None:
                tc_args = {}
            lc_tool_calls.append({
                "name": tc_name,
                "args": tc_args,
                "id": tc_id
            })
    return lc_tool_calls


def make_specialist_node(agent_name: str, system_prompt: str, tools_schema: list):
    """
    Factory to create a standard model execution node for a specialist.
    """
    def node_fn(state: SpecialistState) -> Dict[str, Any]:
        msgs = [SystemMessage(content=system_prompt)] + list(state["messages"])
        gateway_messages = _bridge_to_gateway(msgs)
        
        # Invoke LLM
        res = gateway.complete(gateway_messages, tools=tools_schema)
        reply = res["reply"]
        tool_calls = res["tool_calls"]
        
        lc_tool_calls = _bridge_to_langchain(tool_calls)
        ai_msg = AIMessage(content=reply, tool_calls=lc_tool_calls)
        return {"messages": [ai_msg]}
    
    return node_fn

def should_continue_specialist(state: SpecialistState) -> Literal["continue", "end"]:
    last_msg = state["messages"][-1]
    if isinstance(last_msg, AIMessage) and last_msg.tool_calls:
        return "continue"
    return "end"

# =====================================================================
# 2. SCHEDULER SPECIALIST
# =====================================================================
@tool
def get_current_time() -> str:
    """Returns the current date and time formatted nicely."""
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

@tool
def upcoming_events() -> str:
    """
    Retrieves the next 5 upcoming events from the user's primary Google Calendar.
    Only read access is configured (Principle of Least Privilege).
    """
    try:
        from app.google.auth import get_google_credentials
        from googleapiclient.discovery import build
        
        creds = get_google_credentials()
        # Secure, read-only Calendar client connection.
        # CRITICAL SAFETY NOTE: No write permissions or scopes are granted in our OAuth token,
        # ensuring the agent can never add or modify events, even if compromised.
        service = build("calendar", "v3", credentials=creds)
        
        now = datetime.datetime.now(datetime.timezone.utc).isoformat()
        events_result = service.events().list(
            calendarId="primary",
            timeMin=now,
            maxResults=5,
            singleEvents=True,
            orderBy="startTime"
        ).execute()
        
        events = events_result.get("items", [])
        if not events:
            return "No upcoming events found in primary Google Calendar."
            
        formatted = []
        for idx, event in enumerate(events):
            start = event["start"].get("dateTime", event["start"].get("date"))
            formatted.append(f"{idx+1}. [{start}] {event.get('summary', 'No Title')}")
        return "\n".join(formatted)
    except Exception as e:
        return f"Error retrieving calendar events: {e}"

scheduler_tools = [get_current_time, upcoming_events]
for t in mcp_tools:
    if t.name in ("get_time", "read_todo_list"):
        scheduler_tools.append(t)
scheduler_schema = [_get_tool_schema(t) for t in scheduler_tools]

scheduler_system_prompt = (
    "You are VIZIER's SCHEDULER agent. You manage time-related queries, dates, and calendar events. "
    "Use your tools when asked about upcoming events or time. Keep responses concise and factual."
)

scheduler_node = make_specialist_node("SCHEDULER", scheduler_system_prompt, scheduler_schema)
scheduler_tool_node = ToolNode(scheduler_tools)

scheduler_workflow = StateGraph(SpecialistState)
scheduler_workflow.add_node("agent", scheduler_node)
scheduler_workflow.add_node("tools", scheduler_tool_node)
scheduler_workflow.add_edge(START, "agent")
scheduler_workflow.add_conditional_edges("agent", should_continue_specialist, {"continue": "tools", "end": END})
scheduler_workflow.add_edge("tools", "agent")
scheduler_graph = scheduler_workflow.compile()

# =====================================================================
# 3. SCRIBE SPECIALIST
# =====================================================================
@tool
def draft_message(recipient: str, channel: str, topic: str, content: str) -> str:
    """
    Drafts a message/email for a recipient on a specific channel (e.g. Email, Slack, LinkedIn) with the given content.
    Returns the compiled draft.
    """
    date_str = datetime.datetime.now().strftime("%B %d, %Y")
    
    if channel.lower() == "email":
        draft = (
            f"--- EMAIL DRAFT ---\n"
            f"Date: {date_str}\n"
            f"To: {recipient}\n"
            f"Subject: regarding {topic}\n\n"
            f"Dear {recipient},\n\n"
            f"{content}\n\n"
            f"Best regards,\nVIZIER (Chief-of-Staff)"
        )
    elif channel.lower() == "slack":
        draft = (
            f"--- SLACK MESSAGE TO @{recipient} ---\n"
            f"Topic: {topic}\n"
            f"\"{content}\"\n"
            f"(Sent via VIZIER)"
        )
    else:
        draft = (
            f"--- GENERAL POST ({channel}) TO {recipient} ---\n"
            f"Topic: {topic}\n\n"
            f"{content}\n\n"
            f"#VIZIER"
        )
    return draft

@tool
def read_recent_emails() -> str:
    """
    Reads the last 5 emails from the user's Gmail inbox.
    Only read access is configured (Principle of Least Privilege).
    """
    try:
        from app.google.gmail_reader import list_recent_messages
        
        # CRITICAL SAFETY NOTE: No write scopes (like send/delete/modify) are requested,
        # meaning the agent is structurally incapable of sending emails or modifying inbox state.
        messages = list_recent_messages(5)
        if not messages:
            return "No recent emails found in the inbox."
            
        formatted = []
        for idx, msg in enumerate(messages):
            formatted.append(
                f"Email {idx+1}:\n"
                f"  From: {msg['from']}\n"
                f"  Subject: {msg['subject']}\n"
                f"  Date: {msg['date']}\n"
                f"  Snippet: {msg['snippet']}\n"
            )
        return "\n---\n".join(formatted)
    except Exception as e:
        return f"Error retrieving emails: {e}"

scribe_tools = [draft_message, read_recent_emails]
for t in mcp_tools:
    if t.name == "telegram_notify":
        scribe_tools.append(t)
scribe_schema = [_get_tool_schema(t) for t in scribe_tools]

scribe_system_prompt = (
    "You are VIZIER's SCRIBE agent. You specialize in drafting messages, emails, and social media posts. "
    "You also have a tool to send push notification alerts to the principal's phone via Telegram (telegram_notify). "
    "Ensure all drafted text is clean, professional, and directly matches the user's intent."
)

scribe_node = make_specialist_node("SCRIBE", scribe_system_prompt, scribe_schema)
scribe_tool_node = ToolNode(scribe_tools)

scribe_workflow = StateGraph(SpecialistState)
scribe_workflow.add_node("agent", scribe_node)
scribe_workflow.add_node("tools", scribe_tool_node)
scribe_workflow.add_edge(START, "agent")
scribe_workflow.add_conditional_edges("agent", should_continue_specialist, {"continue": "tools", "end": END})
scribe_workflow.add_edge("tools", "agent")
scribe_graph = scribe_workflow.compile()

# =====================================================================
# 4. RESEARCHER SPECIALIST
# =====================================================================
@tool
def web_search(query: str) -> str:
    """Performs a web search using DuckDuckGo and returns summaries of top results."""
    try:
        results = []
        with DDGS() as ddgs:
            for r in ddgs.text(query, max_results=3):
                results.append(f"Title: {r.get('title')}\nURL: {r.get('href')}\nSnippet: {r.get('body')}\n")
        if not results:
            return f"No search results found for query: '{query}'"
        return "\n---\n".join(results)
    except Exception as e:
        return f"Error executing DuckDuckGo search: {e}"

@tool
def web_fetch(url: str) -> str:
    """Fetches raw text content from a web page URL using trafilatura."""
    try:
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
        res = httpx.get(url, headers=headers, timeout=10, follow_redirects=True)
        if res.status_code != 200:
            return f"Failed to fetch URL. HTTP Status: {res.status_code}"
        
        extracted = trafilatura.extract(res.text)
        if not extracted:
            return f"Web page loaded successfully, but failed to extract readable content from URL: '{url}'"
        # Return first 1500 chars to avoid model context bloat
        return extracted[:1500] + "\n[Content Truncated...]" if len(extracted) > 1500 else extracted
    except Exception as e:
        return f"Error fetching url '{url}': {e}"

@tool
def search_my_documents(query: str) -> str:
    """
    Searches the principal's private document database (like blueprints, notes, and guidelines) 
    for information matching the query.
    """
    try:
        from app.rag.retrieve import search
        docs = search(query, limit=3)
        if not docs:
            return f"No documents found matching the search query: '{query}'"
        
        formatted = []
        for idx, doc in enumerate(docs):
            formatted.append(
                f"Document Match {idx+1}:\n"
                f"Source: {doc['document_title']}\n"
                f"Content:\n{doc['content']}\n"
            )
        return "\n---\n".join(formatted)
    except Exception as e:
        return f"Error searching private documents: {e}"

researcher_tools = [web_search, web_fetch, search_my_documents]
researcher_schema = [
    {
        "type": "function",
        "function": {
            "name": t.name,
            "description": t.description,
            "parameters": t.args_schema.schema() if t.args_schema else {"type": "object", "properties": {}}
        }
    } for t in researcher_tools
]

researcher_system_prompt = (
    "You are VIZIER's RESEARCHER agent. You fetch information from the web or your private knowledge base. "
    "Always query your private documents (using search_my_documents) when asked about project blueprints, "
    "local guidelines, or personal context. Perform a web search for general current facts or news. "
    "Cite sources and document names where possible."
)

researcher_node = make_specialist_node("RESEARCHER", researcher_system_prompt, researcher_schema)
researcher_tool_node = ToolNode(researcher_tools)

researcher_workflow = StateGraph(SpecialistState)
researcher_workflow.add_node("agent", researcher_node)
researcher_workflow.add_node("tools", researcher_tool_node)
researcher_workflow.add_edge(START, "agent")
researcher_workflow.add_conditional_edges("agent", should_continue_specialist, {"continue": "tools", "end": END})
researcher_workflow.add_edge("tools", "agent")
researcher_graph = researcher_workflow.compile()

# =====================================================================
# 5. ANALYST SPECIALIST
# =====================================================================
@tool
def stock_lookup(symbol: str) -> str:
    """Looks up current financial and price information for a stock symbol (e.g. AAPL, GOOG)."""
    try:
        ticker = yf.Ticker(symbol.strip().upper())
        info = ticker.history(period="1d")
        if info.empty:
            return f"Failed to retrieve stock info for symbol: '{symbol}'"
        
        last_price = info["Close"].iloc[-1]
        high_price = info["High"].iloc[-1]
        low_price = info["Low"].iloc[-1]
        volume = info["Volume"].iloc[-1]
        
        result = (
            f"Stock symbol: {symbol.upper()}\n"
            f"Last Close: ${last_price:.2f}\n"
            f"Day High: ${high_price:.2f}\n"
            f"Day Low: ${low_price:.2f}\n"
            f"Volume: {volume:,}"
        )
        return result
    except Exception as e:
        return f"Error executing stock lookup for '{symbol}': {e}"

# AST calculator helper
AST_OPERATORS = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.Pow: operator.pow,
    ast.USub: operator.neg
}

def _safe_ast_eval(node):
    if isinstance(node, ast.Constant):
        if isinstance(node.value, (int, float)):
            return node.value
        raise ValueError(f"Constant value of type {type(node.value)} not permitted.")
    elif isinstance(node, ast.Num):
        return node.n
    elif isinstance(node, ast.BinOp):
        left = _safe_ast_eval(node.left)
        right = _safe_ast_eval(node.right)
        op_type = type(node.op)
        if op_type not in AST_OPERATORS:
            raise ValueError(f"Operator {op_type} not permitted.")
        return AST_OPERATORS[op_type](left, right)
    elif isinstance(node, ast.UnaryOp):
        operand = _safe_ast_eval(node.operand)
        op_type = type(node.op)
        if op_type not in AST_OPERATORS:
            raise ValueError(f"Operator {op_type} not permitted.")
        return AST_OPERATORS[op_type](operand)
    else:
        raise ValueError(f"AST node type {type(node)} is unsupported.")

@tool
def calculator(expression: str) -> str:
    """
    Evaluates basic math expressions safely.
    Example expression: "(23 * 17) + 5"
    """
    clean = re.sub(r"[^0-9\+\-\*\/\(\)\s\.]", "", expression)
    try:
        tree = ast.parse(clean.strip(), mode="eval")
        result = _safe_ast_eval(tree.body)
        return str(result)
    except Exception as e:
        return f"Error evaluating expression '{expression}': {e}"

analyst_tools = [stock_lookup, calculator]
analyst_schema = [
    {
        "type": "function",
        "function": {
            "name": t.name,
            "description": t.description,
            "parameters": t.args_schema.schema() if t.args_schema else {"type": "object", "properties": {}}
        }
    } for t in analyst_tools
]

analyst_system_prompt = (
    "You are VIZIER's ANALYST agent. You specialize in financial queries, metrics, and complex math. "
    "Use stock_lookup for ticker checks and calculator for mathematical equations."
)

analyst_node = make_specialist_node("ANALYST", analyst_system_prompt, analyst_schema)
analyst_tool_node = ToolNode(analyst_tools)

analyst_workflow = StateGraph(SpecialistState)
analyst_workflow.add_node("agent", analyst_node)
analyst_workflow.add_node("tools", analyst_tool_node)
analyst_workflow.add_edge(START, "agent")
analyst_workflow.add_conditional_edges("agent", should_continue_specialist, {"continue": "tools", "end": END})
analyst_workflow.add_edge("tools", "agent")
analyst_graph = analyst_workflow.compile()
