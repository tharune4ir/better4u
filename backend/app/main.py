from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from langchain_core.messages import HumanMessage
from app.settings import settings
from app.llm.gateway import gateway
from app.agents.core_agent import core_agent

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
def chat(request: ChatRequest):
    """
    Gateway chat endpoint. Accepts a user query, passes it to the LangGraph core_agent,
    which executes agent tool-loops dynamically, persisting state under the thread_id.
    """
    thread_id = request.thread_id or "default-session"
    config = {"configurable": {"thread_id": thread_id}}
    
    # Execute graph
    result = core_agent.invoke(
        {"messages": [HumanMessage(content=request.message)]},
        config
    )
    
    # Extract last message (final agent reply)
    final_msg = result["messages"][-1]
    
    return {
        "reply": final_msg.content,
        "thread_id": thread_id
    }

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

