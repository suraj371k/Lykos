import { ethers } from 'ethers';

/**
 * Format address to display format (0x1234...5678)
 */
export const formatAddress = (address: string | null): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

/**
 * Format ETH value with specified decimal places
 */
export const formatEth = (wei: string | null, decimals = 4): string => {
  if (!wei) return '0';
  try {
    const formatted = ethers.formatEther(wei);
    const parts = formatted.split('.');
    if (parts.length === 1) return parts[0];
    return `${parts[0]}.${parts[1].substring(0, decimals)}`;
  } catch (error) {
    console.error('Error formatting ETH:', error);
    return '0';
  }
};

/**
 * Format token value based on its decimals
 */
export const formatTokenAmount = (amount: string | null, decimals = 18, displayDecimals = 2): string => {
  if (!amount) return '0';
  try {
    const formatted = ethers.formatUnits(amount, decimals);
    const parsedAmount = parseFloat(formatted);
    return parsedAmount.toFixed(displayDecimals);
  } catch (error) {
    console.error('Error formatting token amount:', error);
    return '0';
  }
};