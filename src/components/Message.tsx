import React from 'react';
import { ChatMessage } from '../types/chat';

interface MessageProps {
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const timeString = message.timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}>
      <div className={`max-w-xs lg:max-w-md xl:max-w-2xl ${isBot ? 'order-2' : 'order-1'}`}>
        {isBot && (
          <div className="flex items-center space-x-3 mb-2">
            <div className="relative">
              {/* Krishna Divine Avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl border-2 border-yellow-300 relative overflow-hidden">
                <span className="text-amber-900 text-lg font-bold">🕉️</span>
                {/* Divine Glow */}
                <div className="absolute inset-0 bg-gradient-radial from-yellow-200/50 via-transparent to-transparent animate-pulse"></div>
              </div>
             
            </div>
            <div>
        
              <div className="text-xs text-amber-600 font-medium">Lord Krishna</div>
            </div>
          </div>
        )}
        
        <div
          className={`
            px-5 py-4 rounded-2xl shadow-lg relative overflow-hidden
            ${isBot
              ? 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-amber-900 border-2 border-amber-200 ml-2'
              : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white mr-2'
            }
          `}
        >
          {/* Divine Glow for Krishna's messages */}
          {isBot && (
            <div className="absolute inset-0 bg-gradient-radial from-yellow-200/20 via-transparent to-transparent pointer-events-none"></div>
          )}
          
          <div className="relative z-10">
            <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
              {message.text}
            </p>
          </div>
          
          {/* Sacred Border Effect for Krishna */}
          {isBot && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 opacity-50"></div>
          )}
        </div>
        
        <div className={`text-xs text-gray-500 mt-2 ${isBot ? 'text-left ml-2' : 'text-right mr-2'} font-medium`}>
          {timeString}
        </div>
      </div>
    </div>
  );
};

export default Message;