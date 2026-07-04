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

