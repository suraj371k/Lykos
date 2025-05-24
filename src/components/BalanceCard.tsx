import React from 'react';

interface BalanceCardProps {
  label: string;
  balance: string;
  symbol: string;
  icon?: React.ReactNode;
  className?: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ 
  label, 
  balance, 
  symbol, 
  icon, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col p-5 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        {icon && <div className="text-blue-500 dark:text-blue-400">{icon}</div>}
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h3>
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{balance}</span>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{symbol}</span>
      </div>
    </div>
  );
};

export default BalanceCard;