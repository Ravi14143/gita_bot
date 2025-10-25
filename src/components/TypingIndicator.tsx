import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="max-w-xs lg:max-w-md xl:max-w-2xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="relative">
            {/* Krishna Divine Avatar */}
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl border-2 border-yellow-300 relative overflow-hidden">
              <span className="text-amber-900 text-lg font-bold">🕉️</span>
              {/* Divine Glow */}
              <div className="absolute inset-0 bg-gradient-radial from-yellow-200/50 via-transparent to-transparent animate-pulse"></div>
            </div>
            {/* Sacred Symbols */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-xs">🪷</span>
            </div>
          </div>
          <div>
            
            <div className="text-xs text-amber-600 font-medium">Lord Krishna</div>
          </div>
        </div>
        
        <div className="px-5 py-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl shadow-lg border-2 border-amber-200 ml-2 relative overflow-hidden">
          {/* Divine Glow */}
          <div className="absolute inset-0 bg-gradient-radial from-yellow-200/20 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="flex items-center space-x-3 relative z-10">
            <span className="text-sm text-amber-800 font-medium">Krishna is contemplating divine wisdom</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-amber-600 animate-pulse">🪷</span>
          </div>
          
          {/* Sacred Border Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 opacity-50 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;