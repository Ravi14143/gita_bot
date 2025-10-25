import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Heart } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickQuestions = [
    "What is my dharma?",
    "How to find inner peace?",
    "Guide me through difficult times",
    "What is the meaning of karma?"
  ];

  const handleQuickQuestion = (question: string) => {
    if (!disabled) {
      onSendMessage(question);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-amber-50/95 via-orange-50/95 to-yellow-50/95 backdrop-blur-sm border-t-2 border-amber-200/50 rounded-b-3xl relative overflow-hidden">
      {/* Divine Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-200/20 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Quick Questions */}
      <div className="mb-4 relative z-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              disabled={disabled}
              className="
                px-3 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 hover:from-amber-200 hover:to-yellow-200
                text-amber-800 text-xs font-medium rounded-full border border-amber-300
                transition-all duration-200 shadow-sm hover:shadow-md
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center space-x-1
              "
            >
             
              <span>{question}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex items-end space-x-4 relative z-10">
        <div className="flex-1 relative">
          <textarea
            ref={textAreaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share your heart with Krishna... Ask about dharma, life's purpose, or seek divine guidance 🙏"
            disabled={disabled}
            className="
              w-full px-5 py-4 bg-white/80 backdrop-blur-sm border-2 border-amber-200 rounded-2xl
              focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400
              resize-none max-h-32 min-h-[56px] text-sm font-medium
              placeholder-amber-600/70 disabled:opacity-50
              shadow-lg transition-all duration-200
            "
            rows={1}
          />
          {/* Sacred Border Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 via-yellow-400/20 to-orange-400/20 -z-10 blur-sm"></div>
        </div>
        
        <div className="flex space-x-3">
          <button
            type="button"
            className="
              p-4 bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200
              text-pink-600 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl
              disabled:opacity-50 border-2 border-pink-200
            "
            disabled={disabled}
            title="Voice input - Speak to Krishna (coming soon)"
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="
              p-4 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-600 
              hover:from-amber-600 hover:via-orange-600 hover:to-yellow-700
              text-white rounded-full transition-all duration-200 shadow-xl hover:shadow-2xl
              disabled:opacity-50 disabled:cursor-not-allowed
              border-2 border-amber-400 relative overflow-hidden
            "
          >
            {/* Divine Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-yellow-200/30 via-transparent to-transparent animate-pulse"></div>
            <Send className="w-5 h-5 relative z-10" />
          </button>
        </div>
      </form>
      
      
    </div>
  );
};

export default ChatInput;