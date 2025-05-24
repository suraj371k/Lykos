import React from 'react';
import { CircleDollarSign, Coins } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { formatEth, formatTokenAmount } from '../utils/formatters';
import BalanceCard from './BalanceCard';

const BalanceDisplay: React.FC = () => {
  const { ethBalance, daiBalance, network } = useWallet();
  
  if (!ethBalance) return null;
  
  const formattedEthBalance = formatEth(ethBalance);
  
  // Check if DAI is available on this network
  const showDai = daiBalance !== null && network !== null;
  const formattedDaiBalance = showDai ? formatTokenAmount(daiBalance, 18, 2) : '0';
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      <BalanceCard
        label="ETH Balance"
        balance={formattedEthBalance}
        symbol="ETH"
        icon={<Coins size={22} />}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-750 border-blue-100 dark:border-blue-900/20"
      />
      
      {showDai && (
        <BalanceCard
          label="DAI Balance"
          balance={formattedDaiBalance}
          symbol="DAI"
          icon={<CircleDollarSign size={22} />}
          className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-750 border-yellow-100 dark:border-yellow-900/20"
        />
      )}
    </div>
  );
};

export default BalanceDisplay;