import React from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { formatAddress } from '../utils/formatters';
import NetworkBadge from './NetworkBadge';

const WalletInfo: React.FC = () => {
  const { address, network, ensName, refreshBalances } = useWallet();
  
  if (!address) return null;
  
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };
  
  const handleRefresh = () => {
    refreshBalances();
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {ensName || formatAddress(address)}
          </h3>
          {ensName && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatAddress(address)}
            </p>
          )}
          <button
            onClick={copyAddress}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="Copy address"
          >
            <Copy size={16} />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <NetworkBadge network={network} />
        </div>
      </div>
      
      <button
        onClick={handleRefresh}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Refresh balances"
      >
        <RefreshCw size={18} />
      </button>
    </div>
  );
};

export default WalletInfo;