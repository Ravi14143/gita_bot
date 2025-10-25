import React from 'react';
import { Crown} from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-amber-600 via-orange-600 to-blue-700 shadow-2xl relative overflow-hidden">
      {/* Divine Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-blue-400/20 animate-pulse"></div>
      
      <div className="px-6 py-6 relative z-10">
        <div className="flex items-center justify-center space-x-4">
          <div className="relative">
            {/* Krishna Crown Icon */}
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl border-2 border-yellow-300">
              <Crown className="w-7 h-7 text-amber-900" />
            </div>
            </div>
          
          <div className="text-center">
           
            <p className="text-amber-100 text-sm font-medium flex items-center justify-center space-x-2">
              
              <span>Divine wisdom from the Supreme Lord</span>
              
            </p>
          </div>
        </div>
        
      
      </div>
    </header>
  );
};

export default Header;