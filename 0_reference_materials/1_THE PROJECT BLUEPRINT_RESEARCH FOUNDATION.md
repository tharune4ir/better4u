# THE PROJECT BLUEPRINT — RESEARCH FOUNDATION
## A Unified Personal AI Chief-of-Staff / Life-Ops Agentic Platform (AEGIS + HYGEIA → ONE)

**TL;DR**
- Build ONE opinionated, zero-cost, action-taking agentic platform on **LangGraph 1.x (Python) + FastAPI + Next.js 15 + Supabase (Postgres/pgvector/Auth/Realtime/pgmq/pg_cron) + custom & official MCP tool servers**, with **Gemini free tier as the primary LLM behind a LiteLLM router that fails over to Groq and OpenRouter**, and a safety-first human-in-the-loop layer as the pedagogical centerpiece.
- The recommended product name is **VIZIER** (the ruler's right-hand steward/orchestrator), with **ATLAS** and **STEWARD** as strong alternates.
- Every free tier here is real but volatile — Google cut Gemini API free-tier quotas by 50–80% on December 6–7, 2025 — so the architecture must assume degradation and route around it, which is itself a core senior-level competency the project is designed to teach.

---

## Area 1 — Action-Based / Tool-Using Agent Architectures (the core)

The universal loop is **perceive → plan → act → observe**, repeated until goal or turn limit. **Function/tool calling** is the mechanism: the model returns a structured `function_call` (name + JSON args), your code executes it, and you feed back a `function_response`.

- **Gemini function calling**: tools are declared as function declarations; the model emits function calls; you execute and return results. Gemini also supports sandboxed **code execution** and a dedicated **Computer Use** model (`gemini-2.5-computer-use-preview-10-2025`) that returns UI actions (`open_web_browser`, `click_at`, `type_text_at`, `scroll_at`, `drag_and_drop`, `key_combination`, `wait`) on a **normalized 1000×1000 grid**, executed client-side via Playwright. It supports `enable_prompt_injection_detection=True` and a `yield_to_user` custom tool for human handoff.
- **Patterns to teach**: ReAct (reason+act interleaved), plan-and-execute (plan first, then run steps), reflection/self-critique loops, tree-of-thought planning, and task decomposition. Anthropic's guidance distinguishes deterministic **workflows** from **agents** and recommends the **orchestrator-workers** pattern.
- **Browser/computer-use agents**: the `browser-use` library and Playwright-based agents; Gemini Computer Use + Playwright follows an **Observation-Thought-Action loop** feeding base64 PNG screenshots + URL back each turn. Google's ADK ships a sample: `ComputerUseToolset(computer=PlaywrightComputer(screen_size=(1280,936)))`. **Always run in a sandbox/VM/container.** A minimal reference is `pmbstyle/gemini-computer-use`.
- **2025-2026 production structuring**: a **small set of well-designed, purpose-built tools beats mirroring a REST API** (LLMs pick better from focused tool surfaces); enforce explicit turn limits; add timeouts/retries/backoff; log every action with parameters and per-step screenshots for auditing.

## Area 2 — Multi-Agent Orchestration (2025-2026)

**Recommendation: LangGraph is the primary framework.** Rationale: its graph-based `StateGraph` gives deterministic control, native **durable execution**, **checkpointing/persistence**, streaming, first-class **human-in-the-loop via interrupts**, and audit trails — exactly the properties an action-taking, safety-gated Chief-of-Staff needs. LangGraph reached **v1.x** (`langgraph 1.2.7` on PyPI) and is the default runtime under all LangChain agents. It is used in production by Klarna, Replit, Elastic.

- **Patterns**: **supervisor** (`langgraph-supervisor`, `create_supervisor`) — a central router using structured output to pick the next specialist (more accurate routing); **swarm** (`langgraph-swarm`, `create_swarm`) — agents hand off directly via `Command(goto=..., graph=Command.PARENT)` (lower latency); plus **subgraphs** and **network**. Custom handoff tools use `create_handoff_tool` / `InjectedState`.
- **Checkpointers**: `InMemorySaver` (dev) and **`PostgresSaver`** (production — runs on Supabase Postgres). Long-term memory via `BaseStore` / `InMemoryStore`.
- **Alternatives & when they win**: **CrewAI** (fastest role-based prototyping, ~52k stars, v1.14.x) ; **AutoGen/AG2** (folded into **Microsoft Agent Framework 1.0**, GA April 3, 2026; AutoGen now maintenance-only); **OpenAI Agents SDK** (clean handoff model, OpenAI-locked, no built-in checkpointing); **Google ADK** (Apache-2.0, Gemini-optimized, native A2A, Cloud Run/Vertex deploy, ADK Web debug UI); **Pydantic AI** (type-safe, native MCP + A2A + durable execution); **Anthropic Claude Agent SDK** (deepest MCP integration, Claude-only).
- **Protocols**: the industry shorthand is **MCP for tools (vertical), A2A for agents (horizontal)** — both under Linux Foundation stewardship; ACP merged into A2A in late 2025.

## Area 3 — MCP (Model Context Protocol) Deep Dive

- **Spec**: JSON-RPC 2.0; three primitives — **Tools** (POST-like, side effects), **Resources** (GET-like, read-only context), **Prompts** (reusable parameterized templates). Transports: **stdio** (local subprocess), **SSE** (legacy remote), **Streamable HTTP** (production). Current protocol revision dated Nov 25, 2025; MCP Python SDK is `mcp 1.28.x`.
- **Build servers with FastMCP** (`jlowin/fastmcp`; FastMCP 1.0 was absorbed into the official SDK, standalone now powers ~70% of MCP servers). `@mcp.tool`, `@mcp.resource`, `@mcp.prompt` decorators auto-generate JSON schema from type hints + docstrings. Run with `mcp.run(transport="streamable-http")`. FastMCP 3.x adds `fastmcp dev` (hot reload), `fastmcp install`, `fastmcp inspect`. TypeScript SDK for Node/edge (Cloudflare Workers, Vercel Edge). Production caveats: stateless HTTP mode behind load balancers, disable proxy buffering for SSE, persistent JWT storage if OAuth.
- **Supabase MCP** (`supabase-community/supabase-mcp`; hosted remote `https://mcp.supabase.com/mcp`, OAuth 2.1): 20+ tools including `list_tables`, `list_extensions`, `list_migrations`, **`apply_migration`** (schema DDL, tracked as migrations), **`execute_sql`** (non-schema queries), `get_logs`, `search_docs`, plus branching and project/account management. Local auth via **Personal Access Token**. **Security: enable `read_only=true` and `project_ref` scoping, and use the `features` flag to limit tool groups** — primary risk is prompt injection (e.g., a support ticket instructing the LLM to `select * from` a sensitive table).
- **Google Workspace MCP servers (community)**:
  - All-in-one: **`taylorwilsdon/google_workspace_mcp`** (PyPI `workspace-mcp`, built on FastMCP; run `uvx workspace-mcp --tools gmail drive calendar`) — 12 services, ~114 tools; Gmail tools like `search_gmail_messages`, `get_gmail_message_content`, `send`, `forward_gmail_message`, drafts, labels.
  - Gmail-specific: **`@gongrzhe/server-gmail-autoauth-mcp`** (original unmaintained since Aug 2025; active fork **`ArtyMcLabin/Gmail-MCP-Server`**) — `send_email`, `draft_email`, `search_emails` (Gmail operators), label management, `download_attachment`.
  - Calendar: **`@cocal/google-calendar-mcp`** (`nspady/google-calendar-mcp`) — `create-event`, `list-events`, `search-events`, `get-freebusy`, `update-event`; `ENABLED_TOOLS` env var filters exposed tools. **Test-mode OAuth tokens expire after 7 days.**
- **Google first-party MCP (2026, preview)**: dedicated per-service remote servers (`gmailmcp`/`calendarmcp`/`drivemcp.googleapis.com/mcp/v1`, plus People/Chat), gated behind the **Google Workspace Developer Preview Program**, **StreamableHTTP only**, OAuth 2.0, dotted tool names (`gmail.search_threads`, `calendar.list_events`). Google announced **50+ Google-managed MCP servers** at Cloud Next '26 and adopted MCP across services from December 2025. You cannot install custom MCP in the consumer Gemini app.
- **Threats**: tool poisoning, confused deputy, the lethal trifecta (Area 8). Mitigate with tool allowlists, manual approval, least-privilege scopes.

## Area 4 — Real Google Workspace + Web/Notification Integrations (free, secondary account)

- **Gmail API**: OAuth2; quota measured in **quota units** — `messages.send`=100, `threads.get`=40, `messages.get`=20, `messages.list`=5. **Consumer accounts capped at 500 sent emails/day** and 250 quota units/sec per user. New per-project model (1.2M units/min, 6,000/min/user, 80M units/day billing threshold — billing not yet active, 90-day notice promised) applies to projects created **on/after May 1, 2026**; older projects keep prior quotas. All standard use is currently free.
- **OAuth consent for personal/secondary account**: GCP project → enable APIs → OAuth consent screen in **Testing mode** → add yourself as a **test user** → create **Desktop app** OAuth client (no redirect URIs needed) → download `credentials.json` → run local browser auth flow → cache `token.json`/`token.pickle`. Testing-mode refresh tokens can expire in ~7 days; re-auth or publish the app.
- **Calendar / Drive / Tasks / People APIs**: Python via `google-api-python-client` + `google-auth-oauthlib`; free within quotas.
- **Web actions**: `httpx`/`requests` for fetch; Playwright + BeautifulSoup for scraping; **yfinance** (free finance); **Open-Meteo** (free weather, no key); free news feeds/RSS.
- **Free notification channels**:
  - **Telegram Bot API**: message **@BotFather** → `/newbot` → token → POST `https://api.telegram.org/bot<TOKEN>/sendMessage` with `chat_id`+`text`. Limits ~30 msg/s global, ~1/s per chat; 429 returns `retry_after`.
  - **Discord webhooks**: Channel → Integrations → Webhooks → copy URL → POST `{"content":"..."}`. ~30 messages/min per webhook; 429 with `Retry-After`.
  - **ntfy.sh**: `curl -d "message" ntfy.sh/mytopic` (no signup). Free tier: **250 notifications/day**, 15MB attachments, 3-hour attachment expiry; self-hostable.

## Area 5 — Memory Systems

Memory scopes to teach: **short-term** (conversation/checkpointer), **long-term**, **episodic** (past interactions), **semantic** (facts/preferences), **procedural** (learned behaviors/rules).

- **LangMem** (LangChain, MIT, free `pip install langmem`): native to the LangGraph store; supports episodic/semantic/procedural, including procedural memory where the agent rewrites its own instructions. Best if committed to LangGraph; benchmarks are middling (~58% LOCOMO) with high p95 latency, so not for hard real-time recall.
- **Mem0** (Apache-2.0, ~52k stars, free tier 1,000 memories/month): fast (0.2s p95 search), ~90% token savings, framework-agnostic REST API; graph memory on paid.
- **Zep/Graphiti**: **Graphiti** (Apache-2.0, temporal knowledge graph with bi-temporal `valid_at`/`invalid_at` edges) is the only self-hostable piece — **Zep Community Edition was deprecated in April 2025, with additional feature retirements in February 2026**. On independent LongMemEval (GPT-4o), **Zep/Graphiti scored 63.8% vs Mem0's 49.0% — a 14.8-point gap** driven by explicit temporal validity windows; the trade-off is heavier infra (needs Neo4j/FalkorDB/Kuzu).
- **Recommendation**: start with **LangGraph store + pgvector on Supabase** for zero-cost semantic/episodic memory, plus **LangMem** for the memory-type taxonomy lessons; add **Mem0 free tier** as a comparison lab. Teach memory **consolidation/summarization** to stay within Supabase's 500MB. A Chief-of-Staff should remember its principal via a `principal_profile` (tone, counterparts, priorities, working style) that grows through explicit and inferred facts.

## Area 6 — RAG State of the Art (2025-2026)

- **pgvector on Supabase** (included free on all tiers): **HNSW is the 2026 default** (`CREATE INDEX ... USING hnsw (embedding vector_cosine_ops) WITH (m=16, ef_construction=64)`; build before data unlike IVFFlat). Sequential scan is fine under ~10k rows. **halfvec** quantization + **Matryoshka** embeddings scale to millions of chunks on one server.
- **Hybrid search**: BM25 (lexical) + dense (semantic) fused with **Reciprocal Rank Fusion (RRF)**; pgvector handles both natively. Research nuance: hybrid boosts smaller embedding models more than top-tier ones (which already encode lexical signal).
- **Reranking** (highest-ROI single improvement): cross-encoder such as **bge-reranker-v2-m3** over top-50 → top-5 (retrieval accuracy +15–30%).
- **Free embeddings**: **Gemini embeddings** (free tier), open-source **BGE-M3**, **nomic-embed-text**, sentence-transformers (run locally via Ollama or HF text-embeddings-inference).
- **Agentic RAG**: query routing, confidence-based fallbacks, adaptive retrieval; GraphRAG-lite. **Free doc parsing**: `unstructured`, `docling`, `PyMuPDF`. Evaluate with **RAGAS** (faithfulness >0.9, answer relevancy >0.85, context precision >0.8).

## Area 7 — Durable Execution & Background Work

- **Checkpointing**: LangGraph **`PostgresSaver`** on Supabase Postgres (stable in LangGraph 0.4+).
- **Scheduling (free)**: **Supabase Cron (pg_cron)** for in-DB recurring jobs (can trigger Edge Functions); **GitHub Actions scheduled workflows** as free external cron (also solves the Supabase 7-day pause via a keep-alive ping every ~3 days); **APScheduler** in-process for local dev.
- **Queues (free)**: **Supabase Queues (pgmq)** — Postgres-native durable queue with `send`/`send_batch`/`read`/`delete`/`archive` and a **visibility timeout** for exactly-once-ish processing (requires Postgres ≥ 15.6.1.143). Alternative: **Upstash Redis** free tier. Note: Vercel free serverless functions have a 10s timeout; Supabase Edge Functions allow 150s — offload long work to a worker.
- **Reliability patterns to teach**: exponential retry/backoff, **idempotency keys** (prevent double-sending emails), and the **transactional outbox pattern** (write action-intent to an `actions_outbox` row in the same DB transaction; an idempotent worker sends and marks it sent). pgmq backups can re-deliver, so workers must be idempotent.

## Area 8 — Safety, Guardrails, Permissions for Action-Taking Agents (MAJOR SECTION)

- **The lethal trifecta** — coined by Simon Willison on June 16, 2025: an agent with **(1) access to private data, (2) exposure to untrusted content, and (3) the ability to externally communicate** can be turned into a data-exfiltration tool via prompt injection. Removing any one leg is the cheapest guardrail. **Meta's "Agents Rule of Two"** (published October 31, 2025) formalizes this: an agent should satisfy **no more than two of the three** properties in any single session; Willison endorsed it as the best practical advice currently available. This is structural, not a detectable bug — an inbox-reading agent that can also send email or browse is inherently exploitable.
- **HITL approval flows**: **LangGraph `interrupt()` / `Command(resume=...)`** to pause before any risky action, surfaced in an **approval inbox** UI. The **LoopRails** framework offers a clean teaching model: **Grade** each action by consequence (G0–G3), **Guard** with matching controls, **Show** the reviewer the real action (not a tidy summary), and **Prove** oversight catches seeded errors — every governed action should stay **Reversible, Authorized, Interruptible, Logged (RAIL)**. Sobering benchmark: even with plan approval, humans caught bad actions only ~9–26% of the time, so layer defenses.
- **Permission tiers**: read-only → propose-draft → auto-execute; plus action budgets, rate limits, dry-run modes, undo/rollback, and audit logs.
- **Prompt-injection defenses**: input guardrails (classifiers like **Llama Prompt Guard 2**, ~86M-param mDeBERTa, 20–50ms), output guardrails (block exfiltration/PII on the way out), tool allowlists, least-privilege scopes, and privilege separation at the gateway. Map to OWASP **LLM01 Prompt Injection**, **LLM06 Excessive Agency**, **LLM10 Unbounded Consumption**. Study **CVE-2025-32711 (EchoLeak, M365 Copilot)** as a case study.
- **Output validation**: **Pydantic** structured outputs, **Instructor**, provider structured-output modes; **Guardrails AI** and **NeMo Guardrails** (free/OSS) for policy enforcement.

## Area 9 — Evaluation & Observability (eval-ops)

- **Observability (free)**: **Langfuse** (MIT; self-host via `docker compose up` or generous free cloud tier, no card; `@observe()` decorator; OpenTelemetry/OpenInference native; passed 28,900 GitHub stars as of June 2026). Self-hosting runs 5+ services (ClickHouse, Postgres, Redis, app). Alternatives: **Arize Phoenix** (OSS, OpenInference/OTel-native, notebook-friendly), **Laminar** (Apache-2.0, agent-first, 20× trace compression, free 1GB), **LangSmith** (LangChain-native, self-host is Enterprise-only).
- **Evaluation (free)**: **DeepEval** (Apache-2.0, 16k+ stars, 50+ metrics, pytest-style `deepeval test run`), **RAGAS** (reference-free RAG metrics), **Promptfoo** (CLI + red-teaming). A solid $0 combo: Promptfoo/DeepEval + Arize Phoenix, or DeepEval + Langfuse.
- **Agent-specific**: trajectory evaluation, golden datasets (write 20–30 cases with expected outputs first), LLM-as-judge, regression testing in CI, cost/token tracking. Instrument once with OpenInference/OTel to stay backend-portable.

## Area 10 — Full-Stack Architecture (one repo)

- **Frontend**: **Next.js 15 App Router** on **Vercel Hobby (free)** — 100GB bandwidth, serverless functions (5-min timeout), no built-in DB. Agent UIs: streaming chat (SSE), agent activity feed, **approval inbox**, plan visualization with **React Flow**, real-time via **Supabase Realtime** (broadcast/presence/postgres-changes). shadcn/ui + Tailwind.
- **Backend**: **FastAPI** (ASGI; SSE streaming, WebSockets, background tasks). Free hosting ranked: **Google Cloud Run** (Always Free ~2M requests/month + 360k vCPU-sec, fast cold starts, best for containerized APIs, WebSockets/background jobs OK); **Render** free (750 CPU-hrs, spins down after 15 min idle → ~1 min cold start); **Hugging Face Spaces** (2 vCPU/16GB, sleeps after ~48h). **Recommendation: run-locally-first** on the build laptop, then Cloud Run.
- **Supabase free tier (2026, verified)**: 500MB database, 1GB file storage, 5GB egress, 50,000 MAU, 500k Edge Function invocations, **2 active projects**, **auto-pause after 7 days idle**; RLS + pgvector + pg_cron + pgmq included; no backups on free. Crossing egress triggers a Fair-Use 402 until reset.
- **Auth**: **Supabase Auth** (free, RLS-integrated). **Monorepo layout**: `/app` (Next.js) · `/backend` (FastAPI + LangGraph) · `/mcp-servers` (FastMCP) · `/supabase` (migrations) · `/academy` (lesson content). Docker for Cloud Run.

## Area 11 — Free LLM Landscape (mid-2026)

- **Gemini free tier** (AI Studio API key, no card): after the **December 6–7, 2025 cuts** (Google cited "at scale fraud and abuse"; 2.5 Pro dropped from 500 to 100 RPD, an 80% cut) — **2.5 Pro: 5 RPM / ~100 RPD; 2.5 Flash: 10 RPM / 250 RPD; 2.5 Flash-Lite: 15 RPM / 1,000 RPD**; shared 250k TPM; 1M-token context. **Gemini 2.0 Flash was deprecated in February 2026 and retired March 3, 2026 — migrate to 2.5 Flash/Flash-Lite.** Gemini 3 Pro has no free API quota. **EEA/UK/Switzerland users must use the paid tier.** Rate limits are per project (multiple projects multiply capacity, but Google monitors abuse).
- **Groq free tier** (no card, org-level limits): Llama 3.3 70B, Llama 4 Scout, Qwen3 32B, Kimi K2, gpt-oss; ~30 RPM, ~1,000 RPD (70B) / 14,400 RPD (8B); extremely fast (LPU, ~394 TPS on Llama 70B). Risk: NVIDIA licensed Groq's tech Dec 2025 and ~90% of engineering moved over; GroqCloud continues under new CEO but long-term is uncertain.
- **OpenRouter free**: ~28 `:free` models (DeepSeek R1, Llama 3.3 70B, Qwen3 Coder, Gemma 3, Gemini Flash), 20 RPM, 50 RPD (→1,000 RPD after a one-time $10 credit). One key, many models, built-in failover.
- **Others**: **Cerebras** (~1M tokens/day, gpt-oss-120b), **NVIDIA NIM** (build.nvidia.com), **GitHub Models**, **Cohere** (Command R+ / Embed 4 / Rerank 3.5 — full RAG pipeline), **Mistral** free tier.
- **Ollama local** (8–16GB laptop): rank by **tool-call reliability first**. **Qwen3 8B** (Apache-2.0, ~5.2GB Q4, most stable local tool-caller, native `tools`+`think`), **gpt-oss:20b** (best in 16GB, no GPU needed), **Llama 3.1 8B** (simplest framework support), **Gemma 4** (reliability), **Llama 3 Groq Tool Use 8B** (89% Berkeley Function Calling Leaderboard). Set `OLLAMA_MAX_LOADED_MODELS=1` and use `Q4_K_M` on 8GB; verify tool support with `ollama show <model>`.
- **Router/fallback/caching**: **LiteLLM** (`BerriAI/litellm`, v1.77.x, 51k+ stars). `model_list` deployments (share a `model_name` to load-balance; wildcards `gemini/*`; multiple keys for rotation); `router_settings.fallbacks` (e.g., `{"gemini/gemini-2.0-flash": ["openrouter/google/gemini-2.0-flash-exp:free"]}` — on 429 the deployment goes on cooldown and the router picks the next); `retry_policy` per exception; `simple-shuffle` default strategy. **Caching**: in-memory (dev), Redis (multi-instance), and **redis-semantic** (`similarity_threshold`, embedding model, ~20ms hits at zero API cost) — the key lever for stretching free quotas.

## Area 12 — The Chief-of-Staff Domain

Highest-value features and the token-thrifty pattern behind them:
- **Morning briefing** (calendar + email + news + weather synthesis): run deterministic fetch scripts on cron; use the LLM only for the final "what does my day mean" synthesis to avoid a token bill.
- **Inbox triage + drafting**, **meeting prep + scheduling negotiation** (via `get-freebusy`), **GTD task/project management**, **research assistant with citations** (agentic RAG), **spending awareness** (free manual CSV import), **habit/goal tracking with proactive nudges**, **auto-generated weekly reviews**, **document management**, **travel planning**, and **proactive agent patterns** (agent-initiated actions on schedules/triggers).
- **OSS inspiration / the gap this project fills**: Clawdbot/OpenClaw (self-hosted, filesystem memory, headless browser, cron, ClawdHub plugins, 24 messaging channels), QwenPaw (kernel-level Sandbox/Tool Guard, sub-agents, ACP), Leon 2.0 (Skills→Actions→Tools→Functions, layered memory, proactive pulse), and Xavier Vasques' local multi-agent "Chief of Staff" (IBM Granite 4, Qdrant, LiteLLM, Obsidian). **None combine deep in-app pedagogy + real external actions + evals/observability + safety-first HITL in one repo on free tiers** — that is VIZIER's differentiation.

## Area 13 — Learning Academy Design

- **Dictionary module**: glossary schema (`term`, `definition`, `category`, `aliases[]`, `related_terms[]`, `example`, `difficulty`) with SM-2-lite spaced-repetition fields (`ease`, `interval`, `next_review`).
- **Learning module**: beginner→master curriculum; lessons/workbooks; progress schema (`user_id`, `lesson_id`, `status`, `score`, `completed_at`).
- **Workbook/lab pattern**: **"run this → observe this → break this → fix this."** The app teaches its own architecture — each feature deep-links to the lesson explaining the competency it demonstrates.

**Feature → learning-competency mapping (proposed):**
| Feature | Competency taught |
|---|---|
| Morning briefing | Tool orchestration + scheduling/durable execution |
| Inbox triage/draft | Function calling + HITL approval + prompt-injection defense (reads untrusted email) |
| Meeting scheduling | Multi-step planning + external write actions + idempotency |
| Research assistant | RAG (hybrid + rerank) + citations + agentic RAG |
| Memory of principal | Memory taxonomy (episodic/semantic/procedural) + pgvector |
| Weekly review | Reflection loops + summarization/consolidation |
| Proactive nudges | Event/trigger-driven agents + queues/outbox |
| (All features) | Observability + evals (Langfuse traces + DeepEval regression) |

## Area 14 — Career/Market Case (2026)

- **Demand**: per Lightcast's analysis in Chapter 4 of Stanford HAI's 2026 AI Index, the "Agentic AI" skill cluster grew from 0.06% of US postings in 2024 to 0.23% in 2025 — **a more than 280% increase in a single year, representing nearly 90,000 job postings in the US alone**. 57% of organizations now have agents in production (LangChain State of Agent Engineering). "Agentic AI Engineer" is under two years old as a job title.
- **Salary**: US average ~$188k–$192k (Glassdoor, May 2026); typical band $152k–$247k; senior specialists $200k–$312k; frontier-lab senior roles $300k–$550k+ TC; a documented 15–40% premium over generalist ML engineers.
- **What senior interviews probe**: **eval design** (the hardest skill to fake — a portfolio showing real eval rigor stands out), reliability/failure modes under load, multi-agent orchestration, tool/function orchestration, RAG architecture, production MLOps, safety/prompt-injection, and observability. Hiring managers explicitly want people who "build measurable, boring, dependable systems."
- **Why this project reads as senior**: it maps 1:1 to those competencies — real actions with HITL gates, evals + observability, durable execution, memory, multi-agent orchestration, and safety — the exact "keep agents running reliably" skill set the market says is scarce.

---

## Recommended ONE Opinionated Stack

- **Agent framework**: **LangGraph 1.x (Python)** — supervisor + subgraphs, `PostgresSaver` checkpointer, `interrupt()` HITL.
- **LLM strategy**: **LiteLLM router** — Gemini 2.5 Flash / Flash-Lite primary → Groq → OpenRouter `:free` fallback on 429; **Ollama Qwen3 8B** local for offline/dev; redis-semantic caching to stretch quotas.
- **Memory**: LangGraph store + **pgvector** (semantic/episodic) + **LangMem** (procedural); consolidation to fit 500MB; optional Mem0 lab.
- **Tools**: **MCP servers via FastMCP (Python)** — custom action servers + **Supabase MCP** (`read_only`+`project_ref`) + **Google Workspace MCP**; Playwright for browser actions.
- **Database domains**: `users/auth`, `principal_profile`, `memories` (vector), `conversations/messages`, `tasks/projects`, `actions_outbox`, `approvals`, `audit_log`, `briefings`, `glossary_terms`, `lessons`, `progress`, `eval_runs`.
- **Backend**: FastAPI (SSE) local-first → **Cloud Run**. **Frontend**: **Next.js 15 + Supabase Realtime + React Flow** on **Vercel**.
- **Safety**: HITL interrupts, permission tiers, tool allowlists, Pydantic validation, Rule of Two, audit + outbox.
- **Eval/obs**: **Langfuse + DeepEval + RAGAS**.
- **Scheduling/queues**: **pg_cron + pgmq + GitHub Actions keep-alive**.

## Naming Recommendation

**VIZIER** — the sovereign's right-hand administrator/orchestrator; connotes stewardship, delegation, and coordinating many specialists, matching the multi-agent supervisor architecture and unifying **AEGIS** (protection/guardrails) with **HYGEIA** (self-improvement/health). Alternates: **ATLAS** (bears the load), **STEWARD** (plain and apt), **MAJORDOMO** (head of household staff), **MENTOR** (Athena-as-advisor lineage), **SOLON** (wise lawgiver → guardrails), **ARGUS** (hundred-eyed → observability), **ATHENA** (wise counsel).

## Every Manual Human Step (to sequence in the blueprint)

**Software to install**: Python 3.11+, Node.js LTS, Git, `uv`/pip, Docker Desktop, **Ollama** (+ `ollama pull qwen3:8b`), Playwright (`playwright install chromium`), Supabase CLI, gcloud CLI (for Cloud Run).
**Accounts + API keys**: Google AI Studio (Gemini API key), Groq console key, OpenRouter key, Supabase project (+ Personal Access Token for MCP), **GCP project** (enable Gmail/Calendar/Drive/Tasks/People APIs → OAuth consent screen in Testing mode → add self as test user → create Desktop OAuth client → download `credentials.json`), Telegram bot via BotFather, optional Discord webhook / ntfy.sh topic, Vercel account, Langfuse account.
**Per-run dev acts**: create venv, install/manage packages, set env vars / `.env`, run the local OAuth flow to mint `token.json`, run Python files, apply Supabase migrations, start MCP servers.

## Caveats

- **Free tiers change fast**: Gemini cut 50–80% in Dec 2025; Groq's future is uncertain post-NVIDIA. **Fallback routing (LiteLLM) is mandatory, not optional.**
- **Supabase free** projects pause after 7 days idle and cap at 500MB / 2 projects — keep-alive + memory consolidation required; no backups.
- **Google OAuth** testing-mode tokens can expire in ~7 days; Gmail consumer sending is capped at 500/day.
- **Gemini Computer Use** and **Google first-party Workspace MCP** are **preview** — pin versions and expect breaking changes.
- **The lethal trifecta is structural**: enforce Meta's Rule of Two and require HITL approval on every external write; treat every email/web input as untrusted.
- Where sources conflicted on exact Gemini RPD after the Dec 2025 cuts (some cite 2.5 Pro at 25 RPD, others 100), the figures above use Google's official rate-limits documentation; re-verify at build time, as these numbers move.