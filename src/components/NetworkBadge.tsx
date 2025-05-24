import React from 'react';
import { NetworkInfo } from '../types/ethereum';

interface NetworkBadgeProps {
  network: NetworkInfo | null;
}

const getNetworkColor = (chainId: number | null): string => {
  if (!chainId) return 'bg-gray-100 text-gray-800';
  
  const colors: Record<number, string> = {
    1: 'bg-blue-100 text-blue-800', // Ethereum Mainnet
    5: 'bg-yellow-100 text-yellow-800', // Goerli
    11155111: 'bg-yellow-100 text-yellow-800', // Sepolia
    137: 'bg-purple-100 text-purple-800', // Polygon
    80001: 'bg-purple-100 text-purple-800', // Mumbai
    42161: 'bg-blue-100 text-blue-800', // Arbitrum
    10: 'bg-red-100 text-red-800', // Optimism
    56: 'bg-yellow-100 text-yellow-800', // BSC
    43114: 'bg-red-100 text-red-800', // Avalanche
    42220: 'bg-green-100 text-green-800', // Celo
  };
  
  return colors[chainId] || 'bg-gray-100 text-gray-800';
};

const NetworkBadge: React.FC<NetworkBadgeProps> = ({ network }) => {
  if (!network) return null;
  
  const colorClass = getNetworkColor(network.chainId);
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {network.name}
    </span>
  );
};

export default NetworkBadge;