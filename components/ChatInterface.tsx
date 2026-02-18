
import React, { useState, useRef, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { Message } from '../types';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const gemini = GeminiService.getInstance();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await gemini.queryHealth(input, messages);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
        groundingUrls: response.urls
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    'Wie kann ich Zuhause CO₂ sparen?',
    'Welche Förderungen gibt es für Solaranlagen?',
    'Wie funktioniert Geothermie?',
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 page-enter">
      <div className="flex flex-col h-[75vh] bg-white border border-[#e5e5e0] rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-8 py-5 border-b border-[#f0f0ed] bg-[#fcfcf9] flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative pulse-ring"></div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Klima-Assistent Heinsberg</span>
          </div>
          <button
            onClick={() => setMessages([])}
            className="text-[10px] uppercase font-bold text-slate-400 hover:text-[#1a1a1a] transition-colors duration-300 px-3 py-1.5 rounded-lg hover:bg-slate-100"
          >
            Neue Beratung
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
              <div className="space-y-3">
                <div className="text-5xl mb-4">🌍</div>
                <p className="serif text-3xl text-slate-800">Wie können wir Ihnen helfen?</p>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  Fragen Sie nach Klimaschutzmaßnahmen, Energiespartipps oder lokalen Umweltrichtlinien.
                </p>
              </div>

              {/* Quick questions */}
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(q)}
                    className="text-xs font-medium px-4 py-2 rounded-full border border-[#e5e5e0] text-slate-500 hover:border-[#2d6a4f] hover:text-[#2d6a4f] hover:bg-[#dcfce7]/30 transition-all duration-300"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, idx) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{
                animation: `pageEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                animationDelay: `${idx * 0.05}s`,
              }}
            >
              <div className={`max-w-[80%] rounded-2xl px-6 py-4 transition-all duration-300 ${
                m.role === 'user'
                  ? 'bg-[#1a1a1a] text-white'
                  : 'bg-[#fcfcf9] text-[#1a1a1a] border border-[#e5e5e0]'
              }`}>
                <p className={`text-base leading-relaxed whitespace-pre-wrap ${m.role === 'assistant' ? 'serif' : ''}`}>{m.content}</p>
                {m.groundingUrls && m.groundingUrls.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-[#e5e5e0] space-y-1.5">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Offizielle Quellen</p>
                    {m.groundingUrls.map((link, i) => (
                      <a
                        key={i}
                        href={link.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-[11px] text-[#2d6a4f] hover:underline transition-all truncate link-underline"
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#fcfcf9] border border-[#e5e5e0] rounded-2xl px-6 py-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-[#2d6a4f] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#52b788] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-2 h-2 bg-[#a3b18a] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-6 bg-[#fcfcf9] border-t border-[#f0f0ed]">
          <div className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Stellen Sie Ihre Frage zum Klimaschutz..."
              className="w-full bg-white border border-[#e5e5e0] rounded-2xl pl-6 pr-16 py-5 text-base focus:outline-none focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#dcfce7] transition-all duration-300 shadow-sm"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-[#2d6a4f] text-white rounded-xl hover:bg-[#52b788] hover:scale-105 transition-all duration-300 disabled:opacity-20 disabled:scale-100 disabled:hover:bg-[#2d6a4f]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
