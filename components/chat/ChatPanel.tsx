'use client';

import { useState } from 'react';
import ChatMessage from './ChatMessage';

interface Message {
  text: string;
  isUser: boolean;
  timestamp?: string;
}

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export default function ChatPanel({ messages, onSendMessage }: ChatPanelProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-tl-2xl rounded-bl-2xl border-l-2 border-black" style={{ backgroundColor: '#ffffff' }}>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg.text}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
          />
        ))}
      </div>

      {/* Modern Input Bar */}
      <div className="px-4 pb-4">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center gap-2 p-2 rounded-full bg-gray-100 border-2 border-gray-200 hover:border-gray-300 focus-within:border-black focus-within:border-2 transition-all duration-200"
        >
          {/* Attachment Icon */}
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
          </button>

          <textarea
            rows={1}
            value={input}
            placeholder="Ask me anything..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
            className="flex-1 resize-none bg-transparent text-zinc-800 placeholder-zinc-400
            px-2 py-2 text-sm focus:outline-none max-h-32"
          />

          {/* Emoji Icon */}
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </button>

          <button
            type="submit"
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
              input.trim() 
                ? 'bg-black text-white hover:bg-zinc-800 shadow-lg' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!input.trim()}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </form>
      </div>

    </div>
  );
}