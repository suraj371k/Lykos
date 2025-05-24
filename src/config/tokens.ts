import { ERC20Token } from '../types/ethereum';

const DAI_TOKENS: Record<number, ERC20Token> = {
  // Ethereum Mainnet
  1: {
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18
  },
  // Goerli Testnet
  5: {
    name: 'Dai Stablecoin (Goerli)',
    symbol: 'DAI',
    address: '0x73967c6a0904aa032c103b4104747e88c566b1a2',
    decimals: 18
  },
  // Sepolia Testnet
  11155111: {
    name: 'Dai Stablecoin (Sepolia)',
    symbol: 'DAI',
    address: '0x53844F9577C2334e541Aec7Df7174ECe5dF1fCf0',
    decimals: 18
  }
};

export const getDAIToken = (chainId: number): ERC20Token | null => {
  return DAI_TOKENS[chainId] || null;
};

export const NETWORK_NAMES: Record<number, string> = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  11155111: 'Sepolia Testnet',
  137: 'Polygon Mainnet',
  80001: 'Mumbai Testnet',
  42161: 'Arbitrum One',
  10: 'Optimism',
  56: 'BNB Smart Chain',
  43114: 'Avalanche C-Chain',
  42220: 'Celo Mainnet'
};

export const NETWORKS_WITH_ENS = [1, 5, 11155111]; 