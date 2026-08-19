const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

const MOCK_REPLY = "Hi! I'm CafeBot. My AI brain isn't connected yet.";

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
}

chatToggle.addEventListener('click', () => {
  if (chatWindow.hidden) {
    openChat();
  } else {
    closeChat();
  }
});

chatClose.addEventListener('click', closeChat);

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  addBubble(message, 'user');
  chatInput.value = '';

  setTimeout(() => addBubble(MOCK_REPLY, 'bot'), 300);
});
