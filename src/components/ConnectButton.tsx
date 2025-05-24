import React from 'react';
import { Wallet } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const ConnectButton: React.FC = () => {
  const { isConnected, isConnecting, connectWallet, disconnectWallet } = useWallet();

  return (
    <button
      onClick={isConnected ? disconnectWallet : connectWallet}
      disabled={isConnecting}
      className={`
        flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isConnected 
          ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 focus:ring-purple-500' 
          : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'}
        ${isConnecting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <Wallet size={20} />
      <span>
        {isConnecting 
          ? 'Connecting...' 
          : isConnected 
            ? 'Disconnect Wallet' 
            : 'Connect Wallet'}
      </span>
    </button>
  );
};

export default ConnectButton;