interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

export default function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  // Parse markdown-style bold text (**text**)
  const parseMessage = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={`flex items-end gap-1 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Profile circle */}
      <div 
        className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold`}
        style={isUser 
          ? { background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #e8e8e8 100%)', color: '#1a1a1a', border: '1px solid #e0e0e0' }
          : { background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 50%, #0d0d0d 100%)', color: '#ffffff' }
        }
      >
        {isUser ? 'U' : 'AI'}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[75%] px-4 py-2 text-sm`}
        style={isUser 
          ? {
              background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #e8e8e8 100%)',
              color: '#1a1a1a',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              borderBottomLeftRadius: '12px'
            }
          : {
              background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 50%, #0d0d0d 100%)',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              borderTopRightRadius: '12px',
              borderBottomRightRadius: '12px',
              borderTopLeftRadius: '12px'
            }
        }
      >
        <p>{parseMessage(message)}</p>
        {timestamp && <span className="text-xs opacity-50 mt-1 block">{timestamp}</span>}
      </div>
    </div>
  );
}
