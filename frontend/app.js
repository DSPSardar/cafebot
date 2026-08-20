const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

const ERROR_REPLY = "Sorry, I'm having trouble connecting right now — please try again in a moment.";

let conversationHistory = [];

function openChat() {
  chatWindow.hidden = false;
  chatToggle.setAttribute('aria-expanded', 'true');
  chatInput.focus();
}

function closeChat() {
  chatWindow.hidden = true;
  chatToggle.setAttribute('aria-expanded', 'false');
  chatToggle.focus();
}

function addBubble(text, sender) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return bubble;
}

function showTypingIndicator() {
  return addBubble('...', 'bot');
}

chatToggle.addEventListener('click', () => {
  if (chatWindow.hidden) {
    openChat();
  } else {
    closeChat();
  }
});

chatClose.addEventListener('click', closeChat);

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  addBubble(message, 'user');
  chatInput.value = '';
  chatInput.disabled = true;

  const typingBubble = showTypingIndicator();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        conversationHistory: conversationHistory.slice(-10),
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    typingBubble.remove();
    addBubble(data.reply, 'bot');
    conversationHistory = Array.isArray(data.conversationHistory) ? data.conversationHistory : conversationHistory;
  } catch (err) {
    typingBubble.remove();
    addBubble(ERROR_REPLY, 'bot');
  } finally {
    chatInput.disabled = false;
    chatInput.focus();
  }
});
