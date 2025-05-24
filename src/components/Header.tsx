import React from 'react';
import { Wallet } from 'lucide-react';
import ConnectButton from './ConnectButton';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Wallet size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Wallet Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;