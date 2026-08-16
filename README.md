# CafeBot

A beginner-friendly project scaffold for a cafe chatbot (e.g., answering menu questions, taking simple orders, or handling FAQs for a cafe).

> This repo currently contains only the project structure — no application code has been built yet.

## Project Structure

```
cafebot/
├── prompts/      # System prompts and instructions for the bot
├── data/         # Menu items, FAQs, or other reference data the bot uses
├── frontend/     # User-facing chat interface (to be built)
├── backend/      # API / bot logic that talks to the LLM (to be built)
├── .env.example  # Template for environment variables (API keys, etc.)
└── README.md     # This file
```

## Goals

- Keep things **minimal** — no unnecessary dependencies or services.
- Keep things **low-cost** — favor free tiers, local development, and simple hosting when the app is eventually built.
- Stay **beginner-friendly** — clear folder names, small files, no complex tooling.

## Getting Started

1. Copy `.env.example` to `.env` and fill in any required values (like an LLM API key) when you're ready to start building.
2. Add your bot's instructions to `prompts/`.
3. Add sample menu/data files to `data/`.
4. Build the backend in `backend/` and the frontend in `frontend/`.

## Status

📁 Structure only — implementation has not started yet.
