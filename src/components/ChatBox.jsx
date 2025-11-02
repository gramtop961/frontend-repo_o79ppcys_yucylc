import React, { useEffect, useRef, useState } from 'react';
import { Bot, User, Send, Headphones } from 'lucide-react';

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: 'Bonjour ! Comment puis-je vous aider aujourd’hui ?' },
  ]);
  const [input, setInput] = useState('');
  const [handoff, setHandoff] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg = { id: Date.now(), role: 'user', text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput('');

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: 'bot',
          text: handoff
            ? 'Merci, un agent humain va rejoindre la conversation sous peu.'
            : `Voici une réponse automatique à votre message : "${trimmed}"`,
        },
      ]);
    }, 600);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section id="chat" className="relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Assistance aidevisuel</p>
            <p className="text-xs text-gray-500">Bot + option opérateur humain</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setHandoff((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm shadow-sm transition ${handoff ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
        >
          <Headphones className="h-4 w-4" />
          {handoff ? 'Transfert activé' : 'Transférer à un humain'}
        </button>
      </div>

      <div className="h-72 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3">
        {messages.map((m) => (
          <div key={m.id} className={`mb-3 flex items-start gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'bot' && (
              <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
                <Bot className="h-4 w-4" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'}`}>
              {m.text}
            </div>
            {m.role === 'user' && (
              <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-white">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={handoff ? 'Décrivez votre demande (un agent va répondre)...' : 'Écrivez votre message...'}
          className="min-h-[44px] w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
          rows={2}
        />
        <button
          type="button"
          onClick={sendMessage}
          className="inline-flex h-[44px] items-center gap-2 rounded-lg bg-blue-600 px-4 text-white shadow hover:bg-blue-700 disabled:opacity-50"
          disabled={!input.trim()}
        >
          <Send className="h-4 w-4" />
          Envoyer
        </button>
      </div>
    </section>
  );
}
