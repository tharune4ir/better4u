# VIZIER — Master Progress Tracker & Learning Logbook

> Keep this file at the repo ROOT as `PROGRESS.md`. Update it after EVERY session — it's part of the discipline.
> Rule: a block is only ✅ when its VERIFY checklist in the Build Guide fully passed AND you committed.

---

## 0. VITAL SIGNS (fill these in once, update when they change)

| Item | Value | Notes |
|---|---|---|
| Project start date | 2026-07-03 | |
| Repo GitHub URL | ____ | secondary account |
| Supabase project name | ____ | pauses after ~1 week idle — click Restore |
| Google Cloud project | vizier-actions | OAuth in TESTING mode — token expires ~7 days |
| Last OAuth re-consent date | ____ | re-run authorize.py when expired |
| Current phase | Phase 0 | |
| Total hours logged | ____ | be honest |

---

## 1. PHASE 0 — LAPTOP SETUP (manual)

- [x] Python 3.12 installed, `python --version` works in a fresh terminal (v3.12.9)
- [x] Node LTS installed, `node --version` works (v24.17.0)
- [x] Git installed + `user.name` / `user.email` configured
- [x] Antigravity signed into secondary account, auto-run terminal DISABLED
- [ ] (Optional) Ollama installed, `qwen2.5:7b` or `:3b` pulled and answers a prompt

## 2. PHASE 1 — ACCOUNTS & KEYS (manual)

- [ ] Gemini API key (AI Studio, secondary acct)
- [ ] Groq API key
- [ ] OpenRouter API key + noted 2–3 free tool-capable models
- [ ] Supabase: URL, anon key, service role key, session-pooler DB URL
- [ ] Supabase extensions enabled: `vector`, `pg_cron`
- [x] Google Cloud: 5 APIs enabled (Gmail, Calendar, Drive, Tasks, People)
- [x] OAuth consent screen created, TESTING mode, self added as Test user
- [ ] Desktop OAuth client created, `google_oauth_client.json` downloaded
- [ ] Langfuse: public key, secret key, host
- [ ] Telegram: bot created, token saved, chat id extracted via getUpdates
- [ ] Vercel + GitHub accounts ready (secondary email)
- [ ] All keys in temp file → will move to `.env` in Block 2.1 → temp file DELETED after

---

## 3. THE 22 BLOCKS — MASTER CHECKLIST

For each block: tick the three boxes, then fill its logbook entry in Section 4.

| # | Block | Prompted | Ran & Verified | Committed | Date |
|---|---|---|---|---|---|
| 1 | 2.1 Monorepo + env hygiene | ☑ | ☑ | ☑ | 2026-07-03 |
| 2 | 2.2 FastAPI + first ping | ☑ | ☑ | ☑ | 2026-07-04 |
| 3 | 3.1 Academy schema + seed (SQL 001–002) | ☑ | ☑ | ☑ | 2026-07-04 |
| 4 | 3.2 Academy UI (Dictionary/Lessons/Progress) | ☑ | ☑ | ☑ | 2026-07-04 |
| 5 | 4.1 LiteLLM gateway + fallbacks (seed 003) | ☑ | ☑ | ☑ | 2026-07-04 |
| 6 | 5.1 Handmade ReAct agent (seed 004) | ☑ | ☑ | ☑ | 2026-07-04 |
| 7 | 5.2 LangGraph + Postgres checkpointer (seed 005) | ☑ | ☑ | ☑ | 2026-07-04 |
| 8 | 6.1 Supervisor + 4 specialists + SSE (seed 006) | ☐ | ☐ | ☐ | |
| 9 | 7.1 pgvector RAG + hybrid search (mig 007) | ☐ | ☐ | ☐ | |
| 10 | 7.2 Long-term memory system (mig/seed 008) | ☐ | ☐ | ☐ | |
| 11 | 8.1 Own MCP server + Telegram action (seed 009) | ☐ | ☐ | ☐ | |
| 12 | 9.1 Google OAuth + Gmail/Calendar READ (seed 010) | ☐ | ☐ | ☐ | |
| 13 | 9.2 Write actions via proposal gate (mig 011) | ☐ | ☐ | ☐ | |
| 14 | 10.1 Approval Inbox + tiers + audit (mig 012) | ☐ | ☐ | ☐ | |
| 15 | 10.2 Injection defense + red-team drill (seed 013) | ☐ | ☐ | ☐ | |
| 16 | 11.1 Scheduler + Morning Briefing (mig 013, seed 014) | ☐ | ☐ | ☐ | |
| 17 | 12.1 Langfuse + golden evals (mig 014, seed 015) | ☐ | ☐ | ☐ | |
| 18 | 13.1 Command Center frontend (seed 016) | ☐ | ☐ | ☐ | |
| 19 | 14.1 Deploy + demo mode + README (seed 017) | ☐ | ☐ | ☐ | |

**Milestone moments — record the date you felt each one:**
- ⚡ Fallback chain saved me when I sabotaged my Gemini key: ____
- ⚡ Agent memory survived a server kill: ____
- ⚡ My phone buzzed from a natural-language command: ____
- ⚡ First REAL email sent only after my approval: ____
- ⚡ My injection attack FAILED against my own defenses: ____
- ⚡ Morning briefing arrived without me asking: ____
- ⚡ Public demo URL worked from my phone: ____

---

## 4. LEARNING LOGBOOK (fill after every block — this becomes your interview gold)

Copy this template per block:

```
### Block __._ — <name>            Date: ____   Hours: ____
WHAT I BUILT (one sentence, my own words):
WHAT BROKE:
HOW I FIXED IT (the actual debugging steps):
THE CONCEPT THAT CLICKED:
STILL FUZZY (ask the agent / revisit):
DICTIONARY TERMS I MARKED LEARNED TODAY:
```

*(19 empty entries pre-created below — fill as you go)*

### Block 2.1 — Date: 2026-07-03 Hours: 0.5
WHAT I BUILT: Restructured the workspace into a clean monorepo with `web/` and `backend/` folders, set up backend requirements, `.env.example`, and root `.gitignore`.
WHAT BROKE: Ran into "fatal: not a git repository" when attempting to check git status and run commit commands.
HOW I FIXED IT: Initialized the Git repository locally using `git init` and verified that local commits work independently of GitHub.
THE CONCEPT THAT CLICKED: Git is entirely local—commits are written to the local `.git` folder, and a remote repository is not required to create version checkpoints.
STILL FUZZY: None.
TERMS LEARNED: Monorepo, Virtual Environment (venv), secret hygiene, .gitignore.

### Block 2.2 — Date: 2026-07-04 Hours: 0.5
WHAT I BUILT: A FastAPI backend with CORS middleware configuration, secure config diagnostics, and a Next.js client status page at `/status` querying backend status.
WHAT BROKE: Encountered terminal path issues when activating the virtual environment (used `venv` instead of `.venv`, and ran `.bat` instead of `.ps1` on PowerShell).
HOW I FIXED IT: Moved to the `backend/` directory and ran the correct PowerShell activation script (`.venv\Scripts\Activate.ps1`).
THE CONCEPT THAT CLICKED: CORS (Cross-Origin Resource Sharing) prevents cross-site scripts from querying localhost unless the server explicitly white-lists the client's port.
STILL FUZZY: None.
TERMS LEARNED: CORS, REST API, JSON, Uvicorn, ASGI, Ports, localhost.

### Block 3.1 — Date: 2026-07-04 Hours: 0.5
WHAT I BUILT: SQL schema migrations creating database tables (`dictionary_terms`, `lessons`, `workbook_exercises`, `user_progress`) and a seeding script populating 44 core Agentic AI glossary items and historical lessons.
WHAT BROKE: Supabase SQL Editor threw a security warning alert recommending Row Level Security (RLS) be enabled.
HOW I FIXED IT: Analyzed the security boundary and clicked "Run without RLS" since the app runs locally on a personal machine where RLS restriction is not required.
THE CONCEPT THAT CLICKED: Cascade deletes (linked rows automatically self-clean when a parent record is deleted) and SQL check constraints ensuring type integrity.
STILL FUZZY: None.
TERMS LEARNED: UUID, Primary Key, Foreign Key, Check Constraint, Cascading Deletes, Database Index.

### Block 3.2 — Date: 2026-07-04 Hours: 0.5
WHAT I BUILT: The Next.js frontend pages for the Learning Academy dashboard stats, searchable dictionary, and syllabus rendering, connected to Supabase database.
WHAT BROKE: Browser requests returned empty data due to 401/403 (Permission Denied) Postgres permissions.
HOW I FIXED IT: Executed SQL commands in Supabase granting usage on public schema and select/modify permissions on the tables to the `anon`, `authenticated`, and `service_role` roles.
THE CONCEPT THAT CLICKED: Next.js Client vs Server Component separation (`"use client"`), React state re-rendering, and the PostgREST translation layer of Supabase.
STILL FUZZY: None.
TERMS LEARNED: Components, Props, State, Server Component, Client Component, PostgREST, SQL Privileges.

### Block 4.1 — Date: 2026-07-04 Hours: 0.5
WHAT I BUILT: LiteLLM model gateway (`gateway.py`) with fallback chain (Gemini -> Groq -> OpenRouter -> Ollama), exponential backoff with random jitter, provider cooldowns, development caching on-disk, and token/cost logging. Exposed POST `/chat` FastAPI endpoint.
WHAT BROKE: Database connection password contain slashes `/` which broke URI parsing, and git status was bloated tracking the entire `.venv/` due to a missing root `.gitignore`.
HOW I FIXED IT: Connected using key-value psycopg parameters directly and cleaned brackets from `.env`. Added a root `.gitignore` and unstaged `.venv` to restore repository hygiene.
THE CONCEPT THAT CLICKED: Token caching to preserve free-tier quotas and jitter to resolve concurrency spikes (thundering herd problem).
STILL FUZZY: None.
TERMS LEARNED: Rate Limit, Backoff, Jitter, Fallback Chain, Router, Cache Hit/Miss, Provider.

### Block 5.1 — Date: 2026-07-04 Hours: 0.5
WHAT I BUILT: A handmade ReAct agent loop (`handmade_react.py`) with a tool registry (safe AST calculator, time, weather). Implemented custom regex-based text parsing loop and a native function-calling loop.
WHAT BROKE: Emojis in print logs threw `UnicodeEncodeError` in Windows cp1252 shells. Zero-argument tools failed with `TypeError` when called with empty input strings.
HOW I FIXED IT: Removed console emojis, updated ReAct regex parser to match empty strings (`Action Input:\s*(.*)`), and validated function signature parameters using `inspect.signature`.
THE CONCEPT THAT CLICKED: Perceive-Plan-Act-Observe loops. Why native function-calling schemas beat fragile, error-prone custom regex text-parsers.
STILL FUZZY: None.
TERMS LEARNED: ReAct trace, tool schema, tool registry, max iterations, hallucinated tool call, native function calling.

### Block 5.2 — Date: 2026-07-04 Hours: 0.5
WHAT I BUILT: Refactored the agent loop into a LangGraph `StateGraph` with a `PostgresSaver` checkpointer connected to Supabase Postgres. Updated FastAPI POST `/chat` to run the graph and persist message state per `thread_id`.
WHAT BROKE: `psycopg` connection URI parser failed to resolve the host due to a slash `/` in the database password. Additionally, `checkpointer.setup()` migrations failed because psycopg default connection pools wrap `CREATE INDEX CONCURRENTLY` inside transaction blocks.
HOW I FIXED IT: Created a DSN string parser to convert the URI connection string to space-separated key-value parameters. Ran checkpointer setup using a temporary direct connection configured with `autocommit=True`.
THE CONCEPT THAT CLICKED: Durable execution: checkpointers serializing and writing graph checkpoints to Postgres, allowing states to survive server crashes.
STILL FUZZY: None.
TERMS LEARNED: StateGraph, node, edge, reducer, checkpointer, thread.

### Block 6.1 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 7.1 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 7.2 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 8.1 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 9.1 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 9.2 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 10.1 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 10.2 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 11.1 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 12.1 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 13.1 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 14.1 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

---

## 5. RECURRING MAINTENANCE (check weekly)

- [ ] Google OAuth token still valid? (testing mode ≈ 7 days → re-run authorize.py)
- [ ] Supabase project active (not paused)?
- [ ] All secrets still ONLY in .env / secrets/ (run `git status`, spot-check a recent commit)
- [ ] Free-tier watchlist: any provider emails about quota/model changes? (Gemini/Groq/OpenRouter/Supabase/Langfuse) → if yes, gateway-only fix per Appendix E.3
- [ ] Academy progress: any terms sitting in `review` status? Do a 10-minute dictionary review session
- [ ] `git push` done (laptop is not a backup!)

## 6. RED-TEAM EVIDENCE LOCKER (Phase 10+)

| Date | Attack I tried | What VIZIER did | Screenshot saved? |
|---|---|---|---|
| | | | ☐ |
| | | | ☐ |

## 7. EVAL SCORE HISTORY (Phase 12+)

| Date | Golden dataset score | What changed since last run | Regression? |
|---|---|---|---|
| | | | |

## 8. PARKED IDEAS (do NOT build mid-phase — park here)

-
-
