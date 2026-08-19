# CLAUDE.md

Guidance for Claude Code (and any other AI agent) working in this repository.

## Purpose

CafeBot is a simple chatbot for a cafe — answering menu questions, FAQs, and
basic order-related queries. It is a **beginner-friendly, minimal, low-cost**
project. Prefer the simplest solution that works over anything clever or
"enterprise-grade."

## Architecture Overview

```
cafebot/
├── frontend/   # index.html, styles.css, app.js — the chat UI (static, no build step)
├── backend/    # API that receives chat messages and calls the LLM
├── data/       # Menu items, FAQs, and other reference data the bot answers from
├── prompts/    # System prompts / instructions that define the bot's behavior
├── .env.example
└── README.md
```

Flow: **frontend** sends a user message → **backend** combines it with the
relevant **prompts** and **data** → calls the LLM API → returns the reply to
the frontend.

Keep the stack minimal: a single small backend service and a static frontend.
Avoid adding frameworks, databases, or infrastructure unless the task
actually requires them.

## Coding Rules

- Keep code simple and readable — this is a learning/beginner project.
- No premature abstraction. Don't build for hypothetical future features.
- No unnecessary dependencies. Justify any new package before adding it.
- Keep files small and single-purpose.
- Write no comments unless the *why* is genuinely non-obvious.
- Don't add error handling or config for cases that can't happen here.

## Security Rules

- Never commit real secrets. All API keys and credentials live in `.env`
  (which is git-ignored) — `.env.example` only holds placeholder values.
- Never hardcode API keys or tokens in frontend or backend source files.
- The LLM API key must only be used server-side (in `backend/`), never
  exposed to the frontend/browser.
- Sanitize/validate any user input before it reaches the LLM prompt or is
  stored/logged.
- Don't log full user messages or secrets to persistent logs.

## Token-Saving / Cost Rules

- Keep prompts in `prompts/` short and focused — avoid bloated system prompts.
- Don't send the entire `data/` contents to the LLM if only a subset is
  relevant to the user's question.
- Prefer the smallest/cheapest model that reliably does the job.
- Avoid unnecessary repeated LLM calls (e.g., no retries-by-default, no
  redundant calls for the same input).

## Scope Rule

- Only modify the files needed for the current task. Do not touch unrelated
  folders or files "while you're in there."
