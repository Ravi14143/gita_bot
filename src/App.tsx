import React from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-blue-100 relative overflow-hidden">
      {/* Divine Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl text-orange-600 animate-pulse">ॐ</div>
        <div className="absolute top-32 right-20 text-4xl text-blue-600 animate-pulse delay-1000">🕉️</div>
        <div className="absolute bottom-20 left-20 text-5xl text-amber-600 animate-pulse delay-2000">🪷</div>
        <div className="absolute bottom-32 right-10 text-4xl text-indigo-600 animate-pulse delay-3000">🦚</div>
        <div className="absolute top-1/2 left-1/4 text-3xl text-orange-500 animate-pulse delay-4000">🌸</div>
        <div className="absolute top-1/3 right-1/3 text-3xl text-blue-500 animate-pulse delay-5000">🔱</div>
      </div>
      
      {/* Subtle Radial Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-200/20 via-transparent to-transparent"></div>
      
      <div className="container mx-auto max-w-4xl h-screen flex flex-col relative z-10">
        <Header />
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;