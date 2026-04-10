import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { getAIResponse } from '../services/aiService';
import { useUser } from '../context/UserContext';

const suggestedQuestions = [
  '💪 Best chest exercises?',
  '🍛 Indian protein sources?',
  '🔥 How to lose belly fat?',
  '🏠 Home workout plan?',
  '🧘 Benefits of Surya Namaskar?',
  '💊 Which supplements to take?',
  '😴 How much sleep do I need?',
  '🌱 Vegetarian diet for muscle?',
];

export default function AIChat() {
  const { user } = useUser();
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: `Namaste ${user.name}! 🙏 I'm your **FitBharat AI Coach**.\n\nI can help you with:\n🏋️ Exercise advice\n🍛 Indian diet plans\n🧘 Yoga & flexibility\n💊 Supplement guidance\n🏠 Home workouts\n\nAsk me anything about fitness! 💪`,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || isTyping) return;

    const userMessage = {
      role: 'user',
      content: messageText,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getAIResponse(messageText, user);
      const aiMessage = {
        role: 'ai',
        content: response,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'ai',
        content: "Sorry, I'm having trouble processing that. Try asking about exercises, diet, or fitness tips! 💪",
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text) => {
    // Simple markdown-like formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="page-content" style={{ padding: '0 var(--space-md)', paddingBottom: '80px' }}>
      {/* Header */}
      <div className="page-header" style={{ padding: 'var(--space-md) 0' }}>
        <div className="page-header-title">
          <span className="page-header-greeting">🤖 AI Powered</span>
          <span className="page-header-name">Fitness Coach</span>
        </div>
        <div style={{
          width: '40px', height: '40px', borderRadius: 'var(--radius-full)',
          background: 'var(--gradient-accent)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
        }}>
          🧠
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.role}`}>
              <div className="chat-avatar">
                {msg.role === 'ai' ? '🤖' : user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div
                  className="chat-bubble"
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                />
                <div style={{
                  fontSize: '0.65rem', color: 'var(--text-tertiary)',
                  marginTop: '4px',
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                  padding: '0 8px'
                }}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-message ai">
              <div className="chat-avatar">🤖</div>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions (show only at start) */}
        {messages.length <= 1 && (
          <div style={{ marginBottom: '12px' }}>
            <p style={{
              fontSize: '0.8rem', color: 'var(--text-tertiary)',
              marginBottom: '8px', fontWeight: 500
            }}>
              Try asking:
            </p>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '8px'
            }}>
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  className="btn btn-secondary btn-sm"
                  onClick={() => sendMessage(q)}
                  style={{ fontSize: '0.78rem' }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="chat-input-wrapper">
          <input
            ref={inputRef}
            className="chat-input"
            placeholder="Ask me about fitness, diet, exercises..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
          />
          <button
            className="chat-send"
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
