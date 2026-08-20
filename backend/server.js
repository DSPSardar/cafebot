const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MENU_DATA = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'menu.json'), 'utf8'));
const HOURS_DATA = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'hours.json'), 'utf8'));

const SYSTEM_PROMPT =
  fs.readFileSync(path.join(__dirname, '..', 'prompts', 'system-prompt.md'), 'utf8') +
  '\n\n## Menu Data\n' + JSON.stringify(MENU_DATA) +
  '\n\n## Hours & Location Data\n' + JSON.stringify(HOURS_DATA);

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.post('/api/chat', async (req, res) => {
  const { message, conversationHistory } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message is required' });
  }

  const history = Array.isArray(conversationHistory) ? conversationHistory : [];

  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [...history, { role: 'user', content: message }],
    });

    const reply = response.content[0]?.text || "Sorry, I didn't catch that — could you try again?";

    res.json({
      reply,
      conversationHistory: [...history, { role: 'user', content: message }, { role: 'assistant', content: reply }],
    });
  } catch (err) {
    console.error('Claude API error:', err.message);
    res.json({
      reply: "Sorry, I'm having trouble connecting right now — please try again in a moment.",
      conversationHistory: history,
    });
  }
});

app.listen(PORT, () => {
  console.log(`CafeBot server running at http://localhost:${PORT}`);
});
