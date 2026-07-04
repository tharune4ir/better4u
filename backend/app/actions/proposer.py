"""
backend/app/actions/proposer.py
================================
Block 9.2 — Write Actions via Proposal Gate

This is the ONLY entry point for agents to create write actions.
Agents PROPOSE. Humans APPROVE. Executors ACT.

ARCHITECTURAL RULE (code-level enforcement, not prompt-level):
- Specialist tools import ONLY from this file (proposer.py).
- Specialist tools have NO import from executors.py.
- This means the agent CANNOT accidentally execute an action, even if
  the LLM generates code that tries to. The import chain simply doesn't exist.

WHY CODE-LEVEL > PROMPT-LEVEL:
- A prompt rule ("never send emails") relies on the LLM obeying every time.
- A code-level rule (agents can't import executors) is structurally impossible to bypass,
  regardless of how the LLM is prompted or manipulated via prompt injection.
"""

import os
import sys
import json
import uuid
import re
import psycopg
from typing import Optional

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from app.settings import settings


def _parse_db_url_to_dsn(url: str) -> str:
    """Convert a postgresql:// URI to space-separated key-value DSN for psycopg."""
    m = re.match(r"postgresql://([^:]+):(.+)@([^:]+):(\d+)/(.+)", url)
    if not m:
        return url
    user, password, host, port, dbname = m.groups()
    return f"dbname={dbname} user={user} password={password} host={host} port={port}"


def propose_action(
    agent: str,
    action_type: str,
    payload: dict,
    risk_tier: str,
    rationale: str
) -> str:
    """
    Insert a new proposal row into proposed_actions.
    
    Returns the proposal UUID (id) as a string, which agents relay to the user
    so the user knows which proposal to approve in the CLI reviewer.
    
    IDEMPOTENCY KEY:
    A fresh UUID4 is generated for every proposal. This key is UNIQUE in the DB,
    so even if "execute_proposal" is accidentally called twice with the same proposal_id,
    the executor detects status='executed' and returns early.
    
    RISK TIERS:
    - 'low':    reversible, low-impact (label_email, create_task)
    - 'medium': can be undone with effort (create_calendar_event)
    - 'high':   irreversible, external-world impact (send_email)
    """
    if action_type not in ('send_email', 'create_calendar_event', 'create_task', 'label_email'):
        raise ValueError(f"Unknown action_type: '{action_type}'")
    if risk_tier not in ('low', 'medium', 'high'):
        raise ValueError(f"Unknown risk_tier: '{risk_tier}'")

    idempotency_key = str(uuid.uuid4())
    
    dsn = _parse_db_url_to_dsn(settings.SUPABASE_DB_URL)
    with psycopg.connect(dsn) as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO proposed_actions
                    (agent, action_type, payload, rationale, risk_tier, idempotency_key)
                VALUES
                    (%s, %s, %s, %s, %s, %s)
                RETURNING id
                """,
                (agent, action_type, json.dumps(payload), rationale, risk_tier, idempotency_key)
            )
            proposal_id = str(cur.fetchone()[0])
        conn.commit()
    
    print(f"[Proposer] Created proposal {proposal_id} | agent={agent} | action={action_type} | risk={risk_tier}")
    return proposal_id
