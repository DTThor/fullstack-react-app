import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeCoach, addUserMessage, addAssistantMessage, setError, clearMessages } from '../store/coachSlice';
import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are an elite AI fitness coach inside the SHRED workout app. You are knowledgeable, motivating, and direct. You give personalized advice on:
- Exercise form and technique
- Workout programming and periodization
- Nutrition and recovery
- Motivation and mindset

Keep responses concise and actionable. Use a coaching tone — encouraging but honest. Use occasional fitness terminology but keep it accessible. Format longer responses with short paragraphs or bullet points. Never give medical advice — recommend seeing a professional for injuries.`;

export default function CoachModal() {
  const dispatch = useDispatch();
  const { open, messages, loading, error } = useSelector(s => s.coach);
  const user = useSelector(s => s.user);
  const active = useSelector(s => s.workout.active);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    dispatch(addUserMessage(text));

    const apiKey = user.anthropicApiKey;

    if (!apiKey) {
      dispatch(addAssistantMessage(
        "I need an Anthropic API key to respond! Go to **Profile → AI Coach Settings** and add your key from console.anthropic.com. It's quick and free to start!"
      ));
      return;
    }

    try {
      const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

      // Build context about current state
      let contextNote = `The user's name is ${user.name}. Their goal is ${user.goal}. Level: ${user.level}. Available equipment: ${(user.equipment || []).join(', ')}.`;
      if (active) {
        contextNote += ` They are currently mid-workout doing "${active.dayName}".`;
      }

      const apiMessages = messages
        .concat([{ role: 'user', content: text }])
        .map(m => ({ role: m.role, content: m.content }));

      const response = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: SYSTEM_PROMPT + '\n\n' + contextNote,
        messages: apiMessages,
      });

      const reply = response.content[0]?.text || 'No response received.';
      dispatch(addAssistantMessage(reply));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(addAssistantMessage(
        `Sorry, I had trouble connecting. Check your API key in Profile settings. Error: ${err.message}`
      ));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedPrompts = [
    'How do I improve my squat form?',
    'What should I eat before a workout?',
    'How long should I rest between sets?',
    'My chest feels tight — is this normal?',
  ];

  if (!open) return null;

  return (
    <div className="coach-modal-overlay">
      <div className="coach-modal">
        {/* Header */}
        <div className="coach-modal__header">
          <div className="coach-modal__title-row">
            <span className="coach-modal__icon">🤖</span>
            <div>
              <h2 className="coach-modal__title">AI Coach</h2>
              <p className="coach-modal__subtitle">Powered by Claude</p>
            </div>
          </div>
          <div className="coach-modal__actions">
            <button className="icon-btn" onClick={() => dispatch(clearMessages())} title="Clear chat">🗑️</button>
            <button className="icon-btn" onClick={() => dispatch(closeCoach())}>✕</button>
          </div>
        </div>

        {/* Messages */}
        <div className="coach-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`coach-message coach-message--${msg.role}`}>
              {msg.role === 'assistant' && (
                <span className="coach-message__avatar">🤖</span>
              )}
              <div className="coach-message__bubble">
                <MessageContent content={msg.content} />
              </div>
            </div>
          ))}

          {loading && (
            <div className="coach-message coach-message--assistant">
              <span className="coach-message__avatar">🤖</span>
              <div className="coach-message__bubble coach-message__bubble--loading">
                <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
              </div>
            </div>
          )}

          {/* Suggested prompts (only show at start) */}
          {messages.length === 1 && !loading && (
            <div className="suggested-prompts">
              {suggestedPrompts.map((p, i) => (
                <button key={i} className="suggested-prompt" onClick={() => { setInput(p); }}>
                  {p}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="coach-input-row">
          <textarea
            ref={inputRef}
            className="coach-input"
            placeholder="Ask your coach anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className={`coach-send-btn ${loading || !input.trim() ? 'coach-send-btn--disabled' : ''}`}
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple markdown-ish renderer for bold and bullets
function MessageContent({ content }) {
  const lines = content.split('\n');
  return (
    <div>
      {lines.map((line, i) => {
        if (line.startsWith('- ') || line.startsWith('• ')) {
          return <p key={i} style={{ margin: '2px 0' }}>• {renderInline(line.slice(2))}</p>;
        }
        if (line.trim() === '') return <br key={i} />;
        return <p key={i} style={{ margin: '2px 0' }}>{renderInline(line)}</p>;
      })}
    </div>
  );
}

function renderInline(text) {
  // Bold: **text**
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}
