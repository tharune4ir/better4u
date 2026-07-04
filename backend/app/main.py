from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
import json
from langchain_core.messages import HumanMessage
from app.settings import settings
from app.llm.gateway import gateway
from app.agents.supervisor import supervisor_agent

app = FastAPI(
    title="VIZIER API",
    description="Backend API services for VIZIER - Personal AI Chief-of-Staff",
    version="0.1.0"
)

# CORS Configuration
# Browsers enforce the Same-Origin Policy, which prevents a script running on one origin 
# (e.g. localhost:3000) from querying a resource on another origin (e.g. localhost:8000) 
# unless the server explicitly permits it.
# We configure Cross-Origin Resource Sharing (CORS) to allow localhost:3000.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"], # Allow all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"], # Allow all headers
)

class ChatRequest(BaseModel):
    message: str
    thread_id: Optional[str] = None

@app.post("/chat")
async def chat(request: ChatRequest):
    """
    Gateway chat endpoint. Accepts a user query, streams agent status transitions via SSE,
    and returns the final synthesized agent message.
    """
    async def sse_generator():
        thread_id = request.thread_id or "default-session"
        config = {"configurable": {"thread_id": thread_id}}
        inputs = {"messages": [HumanMessage(content=request.message)], "scratchpad": {}}
        
        try:
            # Stream graph updates
            for chunk in supervisor_agent.stream(inputs, config, stream_mode="updates"):
                for node_name, state_update in chunk.items():
                    if node_name == "supervisor":
                        next_agent = state_update.get("next_agent", "FINALIZE")
                        yield f"event: status\ndata: {json.dumps({'agent': 'SUPERVISOR', 'message': f'Routing to {next_agent}...'})}\n\n"
                    elif node_name == "scheduler_node":
                        yield f"event: status\ndata: {json.dumps({'agent': 'SCHEDULER', 'message': 'Scheduler is checking dates/calendar events...' })}\n\n"
                    elif node_name == "scribe_node":
                        yield f"event: status\ndata: {json.dumps({'agent': 'SCRIBE', 'message': 'Scribe is drafting message draft...' })}\n\n"
                    elif node_name == "researcher_node":
                        yield f"event: status\ndata: {json.dumps({'agent': 'RESEARCHER', 'message': 'Researcher is querying DuckDuckGo/fetching url...' })}\n\n"
                    elif node_name == "analyst_node":
                        yield f"event: status\ndata: {json.dumps({'agent': 'ANALYST', 'message': 'Analyst is running stock ticker queries/math...' })}\n\n"
                    elif node_name == "finalize_node":
                        final_msg = state_update["messages"][-1]
                        yield f"event: message\ndata: {json.dumps({'reply': final_msg.content})}\n\n"
        except Exception as e:
            yield f"event: error\ndata: {json.dumps({'error': str(e)})}\n\n"
            
    return StreamingResponse(sse_generator(), media_type="text/event-stream")

@app.get("/health")
def health_check():
    """
    Ping endpoint to verify server is active and reachable.
    """
    return {
        "status": "ok",
        "service": "vizier"
    }

@app.get("/config-check")
def config_check():
    """
    Diagnostics endpoint to check if required keys are populated in the environment.
    
    CRITICAL SECURITY DESIGN:
    - We NEVER return the actual secret values of the keys here.
    - Returning raw keys is an extreme security risk (CWE-200: Information Exposure).
    - If this endpoint leaked keys, any script running on an authorized origin (or someone 
      accessing the endpoint directly) could extract your private API keys.
    - Therefore, we cast each configuration value to a boolean, reporting only True/False 
      to indicate if the key is present.
    """
    return {
        "GEMINI_API_KEY_PRESENT": bool(settings.GEMINI_API_KEY),
        "GROQ_API_KEY_PRESENT": bool(settings.GROQ_API_KEY),
        "OPENROUTER_API_KEY_PRESENT": bool(settings.OPENROUTER_API_KEY),
        "SUPABASE_URL_PRESENT": bool(settings.SUPABASE_URL),
        "SUPABASE_ANON_KEY_PRESENT": bool(settings.SUPABASE_ANON_KEY),
        "SUPABASE_SERVICE_ROLE_KEY_PRESENT": bool(settings.SUPABASE_SERVICE_ROLE_KEY),
        "SUPABASE_DB_URL_PRESENT": bool(settings.SUPABASE_DB_URL),
        "LANGFUSE_PUBLIC_KEY_PRESENT": bool(settings.LANGFUSE_PUBLIC_KEY),
        "LANGFUSE_SECRET_KEY_PRESENT": bool(settings.LANGFUSE_SECRET_KEY),
        "TELEGRAM_BOT_TOKEN_PRESENT": bool(settings.TELEGRAM_BOT_TOKEN),
        "TELEGRAM_CHAT_ID_PRESENT": bool(settings.TELEGRAM_CHAT_ID),
        "GEMINI_MODEL_CONFIGURED": settings.GEMINI_MODEL
    }

# =====================================================================
# MEMORIES ENDPOINTS
# =====================================================================
class MemoryCreateRequest(BaseModel):
    kind: str
    content: str
    importance: int

class MemoryUpdateRequest(BaseModel):
    kind: str
    content: str
    importance: int

@app.get("/memories")
def get_memories(search: Optional[str] = None):
    """
    Get list of memories, optionally filtered by keyword search.
    """
    from app.rag.memory import parse_db_url_to_dsn
    import psycopg
    dsn = parse_db_url_to_dsn(settings.SUPABASE_DB_URL)
    with psycopg.connect(dsn) as conn:
        with conn.cursor() as cur:
            if search:
                cur.execute(
                    """
                    SELECT id, kind, content, importance, created_at, last_accessed_at 
                    FROM memories 
                    WHERE content ILIKE %s 
                    ORDER BY created_at DESC
                    """,
                    (f"%{search}%",)
                )
            else:
                cur.execute(
                    """
                    SELECT id, kind, content, importance, created_at, last_accessed_at 
                    FROM memories 
                    ORDER BY created_at DESC
                    """
                )
            rows = cur.fetchall()
            memories = []
            for r in rows:
                memories.append({
                    "id": str(r[0]),
                    "kind": r[1],
                    "content": r[2],
                    "importance": r[3],
                    "created_at": r[4].isoformat(),
                    "last_accessed_at": r[5].isoformat()
                })
            return memories

@app.post("/memories")
def create_memory(req: MemoryCreateRequest):
    """
    Manually create a new memory and calculate its embedding vector.
    """
    from app.rag.memory import save_memory
    memory_id = save_memory(kind=req.kind, content=req.content, importance=req.importance)
    return {"status": "ok", "id": memory_id}

@app.put("/memories/{memory_id}")
def update_memory(memory_id: str, req: MemoryUpdateRequest):
    """
    Update memory content, kind, importance, and re-compute its embedding.
    """
    from app.rag.memory import parse_db_url_to_dsn
    from app.llm.gateway import gateway
    import psycopg
    
    try:
        embedding = gateway.embed([req.content])[0]
        embedding_str = "[" + ",".join(map(str, embedding)) + "]"
    except Exception as e:
        print(f"[Memory System Error] Failed to generate embedding on update: {e}")
        embedding_str = None
        
    dsn = parse_db_url_to_dsn(settings.SUPABASE_DB_URL)
    with psycopg.connect(dsn) as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE memories 
                SET kind = %s, content = %s, importance = %s, embedding = %s, last_accessed_at = now()
                WHERE id = %s
                """,
                (req.kind, req.content, req.importance, embedding_str, memory_id)
            )
    return {"status": "ok"}

@app.delete("/memories/{memory_id}")
def delete_memory(memory_id: str):
    """
    Delete a memory by its UUID.
    """
    from app.rag.memory import parse_db_url_to_dsn
    import psycopg
    dsn = parse_db_url_to_dsn(settings.SUPABASE_DB_URL)
    with psycopg.connect(dsn) as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM memories WHERE id = %s", (memory_id,))
    return {"status": "ok"}


# =====================================================================
# PROPOSALS ENDPOINTS (Block 9.2 — Write Actions via Proposal Gate)
# These endpoints power the web Approval Inbox (built in Block 10.1).
# The CLI reviewer (python -m app.actions.review) uses the same DB.
# =====================================================================

@app.get("/proposals")
def get_proposals(status: Optional[str] = None):
    """
    List proposals, optionally filtered by status.
    Status values: proposed, approved, rejected, executed, failed
    """
    import psycopg
    import re
    from app.settings import settings

    def parse_db_url_to_dsn(url):
        m = re.match(r"postgresql://([^:]+):(.+)@([^:]+):(\d+)/(.+)", url)
        if not m:
            return url
        user, password, host, port, dbname = m.groups()
        return f"dbname={dbname} user={user} password={password} host={host} port={port}"

    dsn = parse_db_url_to_dsn(settings.SUPABASE_DB_URL)
    with psycopg.connect(dsn) as conn:
        with conn.cursor() as cur:
            if status:
                cur.execute(
                    """
                    SELECT id, agent, action_type, payload, rationale, risk_tier, status,
                           idempotency_key, created_at, decided_at, executed_at, result
                    FROM proposed_actions
                    WHERE status = %s
                    ORDER BY created_at DESC
                    """,
                    (status,)
                )
            else:
                cur.execute(
                    """
                    SELECT id, agent, action_type, payload, rationale, risk_tier, status,
                           idempotency_key, created_at, decided_at, executed_at, result
                    FROM proposed_actions
                    ORDER BY created_at DESC
                    LIMIT 50
                    """
                )
            rows = cur.fetchall()
            proposals = []
            for r in rows:
                proposals.append({
                    "id": str(r[0]),
                    "agent": r[1],
                    "action_type": r[2],
                    "payload": r[3],
                    "rationale": r[4],
                    "risk_tier": r[5],
                    "status": r[6],
                    "idempotency_key": r[7],
                    "created_at": r[8].isoformat() if r[8] else None,
                    "decided_at": r[9].isoformat() if r[9] else None,
                    "executed_at": r[10].isoformat() if r[10] else None,
                    "result": r[11],
                })
            return proposals


@app.post("/proposals/{proposal_id}/approve")
def approve_proposal(proposal_id: str):
    """
    Approve a pending proposal and immediately execute it.
    Idempotency: if already executed, returns 'already_executed'.
    """
    import psycopg
    import re
    from datetime import datetime, timezone
    from app.settings import settings
    from app.actions.executors import execute_proposal

    def parse_db_url_to_dsn(url):
        m = re.match(r"postgresql://([^:]+):(.+)@([^:]+):(\d+)/(.+)", url)
        if not m:
            return url
        user, password, host, port, dbname = m.groups()
        return f"dbname={dbname} user={user} password={password} host={host} port={port}"

    dsn = parse_db_url_to_dsn(settings.SUPABASE_DB_URL)
    with psycopg.connect(dsn) as conn:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE proposed_actions SET status='approved', decided_at=%s WHERE id=%s AND status='proposed'",
                (datetime.now(timezone.utc), proposal_id)
            )
        conn.commit()

    try:
        result = execute_proposal(proposal_id)
        return {"status": "executed", "result": result}
    except Exception as e:
        return {"status": "error", "error": str(e)}


@app.post("/proposals/{proposal_id}/reject")
def reject_proposal(proposal_id: str):
    """
    Reject a pending proposal. Sets status to 'rejected'. Cannot be undone.
    """
    import psycopg
    import re
    from datetime import datetime, timezone
    from app.settings import settings

    def parse_db_url_to_dsn(url):
        m = re.match(r"postgresql://([^:]+):(.+)@([^:]+):(\d+)/(.+)", url)
        if not m:
            return url
        user, password, host, port, dbname = m.groups()
        return f"dbname={dbname} user={user} password={password} host={host} port={port}"

    dsn = parse_db_url_to_dsn(settings.SUPABASE_DB_URL)
    with psycopg.connect(dsn) as conn:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE proposed_actions SET status='rejected', decided_at=%s WHERE id=%s AND status='proposed'",
                (datetime.now(timezone.utc), proposal_id)
            )
        conn.commit()
    return {"status": "rejected", "proposal_id": proposal_id}
