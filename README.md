# VIZIER - Personal AI Chief-of-Staff

VIZIER is an opinionated, zero-cost, action-taking agentic platform designed to act as your ultimate personal chief-of-staff.

* **Frontend (`web/`):** A Next.js 15 command center that includes a streaming chat interface, approval inbox, and real-time state visualization.
* **Backend (`backend/`):** A FastAPI API service driven by LangGraph multi-agent systems and unified behind a LiteLLM fallback router.
* **Database & Memory:** Powered by Supabase PostgreSQL with `pgvector` for semantic and episodic memory retrieval.
* **Real Integrations:** Interacts with Google Workspace (Gmail, Calendar, Tasks) and custom MCP servers using OAuth2.
* **Observability & Safety:** Integrated with Langfuse for tracing, DeepEval for regression test runs, and custom human-in-the-loop (HITL) gates.
