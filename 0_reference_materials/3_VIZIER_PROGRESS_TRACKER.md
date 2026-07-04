# VIZIER — Master Progress Tracker & Learning Logbook

> Keep this file at the repo ROOT as `PROGRESS.md`. Update it after EVERY session — it's part of the discipline.
> Rule: a block is only ✅ when its VERIFY checklist in the Build Guide fully passed AND you committed.

---

## 0. VITAL SIGNS (fill these in once, update when they change)

| Item | Value | Notes |
|---|---|---|
| Project start date | ____ | |
| Repo GitHub URL | ____ | secondary account |
| Supabase project name | ____ | pauses after ~1 week idle — click Restore |
| Google Cloud project | vizier-actions | OAuth in TESTING mode — token expires ~7 days |
| Last OAuth re-consent date | ____ | re-run authorize.py when expired |
| Current phase | ____ | |
| Total hours logged | ____ | be honest |

---

## 1. PHASE 0 — LAPTOP SETUP (manual)

- [ ] Python 3.12 installed, `python --version` works in a fresh terminal
- [ ] Node LTS installed, `node --version` works
- [ ] Git installed + `user.name` / `user.email` configured (secondary email)
- [ ] Antigravity signed into secondary account, auto-run terminal DISABLED
- [ ] (Optional) Ollama installed, `qwen2.5:7b` or `:3b` pulled and answers a prompt

## 2. PHASE 1 — ACCOUNTS & KEYS (manual)

- [ ] Gemini API key (AI Studio, secondary acct)
- [ ] Groq API key
- [ ] OpenRouter API key + noted 2–3 free tool-capable models
- [ ] Supabase: URL, anon key, service role key, session-pooler DB URL
- [ ] Supabase extensions enabled: `vector`, `pg_cron`
- [ ] Google Cloud: 5 APIs enabled (Gmail, Calendar, Drive, Tasks, People)
- [ ] OAuth consent screen created, TESTING mode, self added as Test user
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
| 1 | 2.1 Monorepo + env hygiene | ☐ | ☐ | ☐ | |
| 2 | 2.2 FastAPI + first ping | ☐ | ☐ | ☐ | |
| 3 | 3.1 Academy schema + seed (SQL 001–002) | ☐ | ☐ | ☐ | |
| 4 | 3.2 Academy UI (Dictionary/Lessons/Progress) | ☐ | ☐ | ☐ | |
| 5 | 4.1 LiteLLM gateway + fallbacks (seed 003) | ☐ | ☐ | ☐ | |
| 6 | 5.1 Handmade ReAct agent (seed 004) | ☐ | ☐ | ☐ | |
| 7 | 5.2 LangGraph + Postgres checkpointer (seed 005) | ☐ | ☐ | ☐ | |
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

### Block 2.1 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 2.2 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 3.1 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 3.2 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 4.1 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 5.1 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

### Block 5.2 — Date: ____ Hours: ____
WHAT I BUILT:
WHAT BROKE:
HOW I FIXED IT:
THE CONCEPT THAT CLICKED:
STILL FUZZY:
TERMS LEARNED:

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
