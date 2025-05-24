import React from 'react';
import { Wallet } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import WalletInfo from './WalletInfo';
import BalanceDisplay from './BalanceDisplay';
import ConnectButton from './ConnectButton';

const WalletDashboard: React.FC = () => {
  const { isConnected, isConnecting, error } = useWallet();

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      {!isConnected ? (
        <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
            <Wallet size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            Connect your Ethereum wallet to view your balances, transactions, and interact with the blockchain.
          </p>
          
          <ConnectButton />
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <WalletInfo />
          <BalanceDisplay />
        </div>
      )}
    </div>
  );
};

export default WalletDashboard;