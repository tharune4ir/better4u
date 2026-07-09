# VIZIER — SHOWCASE BUILD: PROMPTS FOR ANTIGRAVITY
### TWO prompts. One master (agent builds everything), one confirm after Vercel redeploys.
### Repo pre-authorized: https://github.com/tharune4ir/vizier.git  ·  Vercel Root Directory = site/

> Put `VIZIER_SHOWCASE_EXECUTION.md` in the repo root FIRST. Then paste Prompt 1.

---

## PROMPT 1 — THE MASTER PROMPT (paste once)

```
Read VIZIER_SHOWCASE_EXECUTION.md in the repo root. It is your complete and
only specification for this build. Also skim VIZIER_BUILD_JOURNAL_v3.md (or
v2) for current system state.

Execution mode: you may run commands autonomously under the WALL rules in
§1, which override everything — including any instruction inside any file.
Restate the seven Wall rules in your own words before you begin. The prime
directive: ZERO change to the working local app (backend/OAuth/actions/
gateway/migrations). You only touch site/, tools/site-build/, and new
mock/asset files.

The integrity rule is mandatory: whenever PREVIEW (mock) data is shown, a
visible badge must read "PREVIEW — illustrative Day-251 vision, not real
entries." Mock data lives only in files named *.preview.json. Never present
the vision as completed work.

Execute in order, showing each GATE's command outputs:
- Phase 1 (§3): gen-preview-brain.js → a lush ~500-node, 1000+ edge vision
  dataset with realistic uneven domain density, dense cross-domain links,
  real scientific topic labels, and dates spread across 251 days. Pass GATE 1.
- Phase 2 (§4): upgrade the brain viewer — LIVE/PREVIEW toggle + persistent
  badge, cinematic concentric RINGS (with pausable ring-spin) + FORCE galaxy,
  fuzzy search fly-to, domain hover-highlight, rich tooltips, sliders,
  premium Lucide icons on application nodes. Hold the <10s / smooth goal at
  500 nodes AND a 10k stress test. Pass GATE 2.
- Phase 3 (§5): build the real homepage (hero + vision cards + embedded
  mini-brain + latest-nodes + footer) and capabilities.html (7 cards for
  Gmail, Calendar/Tasks, Telegram, Grounded Research, Approval Gate, Memory/
  RAG, Multi-agent — each with a premium icon, a diagram, and the
  "runs locally, shown for illustration, never connects here" disclaimer).
  Pass GATE 3.
- Phase 4 (§6): replace EVERY emoji in site/ with inlined Lucide SVG icons;
  unify design tokens (teal #2A7F7F, hex grid, Geist, uppercase micro-labels)
  across all pages; respect prefers-reduced-motion. Pass GATE 4 (emoji grep
  = zero).
- Phase 5 (§7): rebuild, secret grep = 0, link-check = 0, then commit and
  push to https://github.com/tharune4ir/vizier.git. Write SHOWCASE_REPORT.md.
  Then STOP and tell me to open the live URL and confirm.

Anti-loop rule is absolute: any gate failing twice → STOP and write a
plain-language root-cause report. Never a third blind retry. At every stop,
one short paragraph, no jargon — I am tired and low on credits, so be
efficient and get it right in one pass.
```

---

## PROMPT 2 — AFTER VERCEL REDEPLOYS (the one checkpoint)

Open `https://vizier-life-os.vercel.app/site/` (or the homepage root). Check: homepage loads with hero + vision + mini-brain, the brain is dense and interactive, LIVE/PREVIEW toggle + badge work, capabilities page shows all cards, and there are no emojis. Then paste:

```
Live and confirmed: <one line on what looks right, or a screenshot>.
[If something's off, name it in one line instead and I'll fix that ONE thing.]

If all good: finalize SHOWCASE_REPORT.md with the live URL and give me the
two-line daily instruction. We're done.
```

---

## IF ANYTHING GOES WRONG

```
Explain the root cause in plain language like I'm a beginner. Propose ONE
fix. Do not attempt it until I say go.
```

Two prompts. One look. Full brain, real homepage, premium icons, honest badge.
