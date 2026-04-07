'use client';
import { useState } from 'react';
import { askQuestion } from '@/utils/api';
import DashboardLayout from '@/components/layout/DashboardLayout';
import type { ComponentData } from '@/utils/types';

interface ApiResponse {
  response?: ApiResponse;
  card?: Record<string, unknown> | Record<string, unknown>[];
  piechart?: Record<string, unknown> | Record<string, unknown>[];
  barchart?: Record<string, unknown> | Record<string, unknown>[];
  linegraph?: Record<string, unknown> | Record<string, unknown>[];
  table?: Record<string, unknown> | Record<string, unknown>[];
  responseText?: string;
}

export default function InitialScreen() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [input, setInput] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);

  const parseResponse = (apiResponse: ApiResponse) => {
    const response = apiResponse.response || apiResponse;
    const componentsList: ComponentData[] = [];

    if (response.card) {
      const cards = Array.isArray(response.card) ? response.card : [response.card];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cards.forEach((card) => componentsList.push({ type: 'card', props: card as any }));
    }
    if (response.piechart) {
      const piecharts = Array.isArray(response.piechart) ? response.piechart : [response.piechart];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      piecharts.forEach((piechart) => componentsList.push({ type: 'piechart', props: piechart as any }));
    }
    if (response.barchart) {
      const barcharts = Array.isArray(response.barchart) ? response.barchart : [response.barchart];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      barcharts.forEach((barchart) => componentsList.push({ type: 'barchart', props: barchart as any }));
    }
    if (response.linegraph) {
      const linegraphs = Array.isArray(response.linegraph) ? response.linegraph : [response.linegraph];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      linegraphs.forEach((linegraph) => componentsList.push({ type: 'linegraph', props: linegraph as any }));
    }
    if (response.table) {
      const tables = Array.isArray(response.table) ? response.table : [response.table];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tables.forEach((table) => componentsList.push({ type: 'table', props: table as any }));
    }

    return { components: componentsList, responseText: response.responseText };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    const apiResponse = await askQuestion(input);
    const { components: parsedComponents, responseText } = parseResponse(apiResponse);
    
    if (parsedComponents.length > 0) {
      setComponents(parsedComponents);
      setShowDashboard(true);
    }
    
    if (responseText) {
      setMessages(prev => [...prev, { text: responseText, isUser: false }]);
    }
    
    setInput('');
  };

  const handleSendMessage = async (message: string) => {
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    const apiResponse = await askQuestion(message);
    const { components: parsedComponents, responseText } = parseResponse(apiResponse);
    
    if (parsedComponents.length > 0) {
      setComponents(parsedComponents);
    }
    
    if (responseText) {
      setMessages(prev => [...prev, { text: responseText, isUser: false }]);
    }
  };

  if (showDashboard) {
    return <DashboardLayout components={components} messages={messages} onSendMessage={handleSendMessage} />;
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden" 
      style={{backgroundImage: 'url(/grid_bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      <div className="absolute inset-0 bg-white/80" style={{
        maskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)`,
        WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)`
      }} />
      <div className="text-center max-w-2xl px-6 relative z-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Personal Finance Assistant</h1>
        <p className="text-xl text-gray-600 mb-8">Get smart insights and advice for your financial goals</p>
        <form onSubmit={handleSubmit} className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your finances..." 
            className="w-full px-6 py-4 pr-14 rounded-full text-lg text-black border border-gray-700 bg-white focus:outline-none placeholder:text-gray-300"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-black">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
