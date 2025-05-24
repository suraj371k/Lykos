import { ethers } from 'ethers';
import { ERC20Token, NetworkInfo } from '../types/ethereum';
import { NETWORK_NAMES, NETWORKS_WITH_ENS } from '../config/tokens';

// ABI for ERC20 tokens (minimal interface for balanceOf)
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)'
];

/**
 * Check if MetaMask is installed
 */
export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== 'undefined' && 
         typeof window.ethereum !== 'undefined' && 
         window.ethereum.isMetaMask;
};

/**
 * Get Ethereum provider
 */
export const getProvider = (): ethers.BrowserProvider | null => {
  if (!isMetaMaskInstalled()) return null;
  return new ethers.BrowserProvider(window.ethereum);
};

/**
 * Connect to MetaMask
 */
export const connectMetaMask = async (): Promise<ethers.Signer> => {
  const provider = getProvider();
  if (!provider) throw new Error('MetaMask is not installed');
  
  await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();
  return signer;
};

/**
 * Get current network information
 */
export const getNetworkInfo = async (provider: ethers.BrowserProvider): Promise<NetworkInfo> => {
  const network = await provider.getNetwork();
  const chainId = Number(network.chainId);
  
  return {
    name: NETWORK_NAMES[chainId] || `Network ${chainId}`,
    chainId,
    ensSupported: NETWORKS_WITH_ENS.includes(chainId)
  };
};

/**
 * Get ETH balance for an address
 */
export const getEthBalance = async (provider: ethers.BrowserProvider, address: string): Promise<string> => {
  const balance = await provider.getBalance(address);
  return balance.toString();
};

/**
 * Get token balance for an address
 */
export const getTokenBalance = async (
  provider: ethers.BrowserProvider, 
  tokenAddress: string, 
  ownerAddress: string
): Promise<string> => {
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const balance = await tokenContract.balanceOf(ownerAddress);
  return balance.toString();
};

/**
 * Get ENS name for an address (reverse lookup)
 */
export const getEnsName = async (provider: ethers.BrowserProvider, address: string): Promise<string | null> => {
  try {
    const ensName = await provider.lookupAddress(address);
    return ensName;
  } catch (error) {
    console.error('Error getting ENS name:', error);
    return null;
  }
};

/**
 * Switch to a specific network
 */
export const switchNetwork = async (chainId: number): Promise<void> => {
  if (!window.ethereum) throw new Error('MetaMask is not installed');
  
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  } catch (error: any) {
    // If the requested chain is not added, show error
    if (error.code === 4902) {
      throw new Error('This network needs to be added to MetaMask');
    }
    throw error;
  }
};