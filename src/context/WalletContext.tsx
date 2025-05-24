import React, { createContext, useContext, useEffect, useState } from 'react';
import { WalletContextType, WalletState } from '../types/ethereum';
import { 
  connectMetaMask, 
  getEthBalance, 
  getNetworkInfo, 
  getProvider, 
  getTokenBalance,
  getEnsName,
  switchNetwork as switchEthereumNetwork
} from '../services/ethereum';
import { getDAIToken } from '../config/tokens';

const initialState: WalletState = {
  address: null,
  network: null,
  ethBalance: null,
  daiBalance: null,
  ensName: null,
  isConnected: false,
  isConnecting: false,
  error: null
};

const WalletContext = createContext<WalletContextType>({
  ...initialState,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  switchNetwork: async () => {},
  refreshBalances: async () => {}
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [walletState, setWalletState] = useState<WalletState>(initialState);

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return;

    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
      } else if (walletState.isConnected && accounts[0] !== walletState.address) {
        // Account changed, update state
        await updateWalletInfo();
      }
    };

    const handleChainChanged = async () => {
      // Chain changed, update wallet info
      if (walletState.isConnected) {
        await updateWalletInfo();
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [walletState.isConnected, walletState.address]);

  // Update wallet information
  const updateWalletInfo = async () => {
    try {
      const provider = getProvider();
      if (!provider) throw new Error('MetaMask is not installed');

      const accounts = await provider.listAccounts();
      if (accounts.length === 0) {
        disconnectWallet();
        return;
      }

      const address = accounts[0].address;
      const network = await getNetworkInfo(provider);
      const ethBalance = await getEthBalance(provider, address);
      
      // Get DAI balance if available on this network
      let daiBalance = null;
      const daiToken = getDAIToken(network.chainId);
      if (daiToken) {
        daiBalance = await getTokenBalance(provider, daiToken.address, address);
      }

      // Get ENS name if available
      let ensName = null;
      if (network.ensSupported) {
        ensName = await getEnsName(provider, address);
      }

      setWalletState({
        address,
        network,
        ethBalance,
        daiBalance,
        ensName,
        isConnected: true,
        isConnecting: false,
        error: null
      });
    } catch (error) {
      console.error('Error updating wallet info:', error);
      setWalletState(prev => ({
        ...prev,
        error: 'Failed to update wallet info',
        isConnecting: false
      }));
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    if (walletState.isConnecting) return;
    
    setWalletState(prev => ({ ...prev, isConnecting: true, error: null }));
    
    try {
      await connectMetaMask();
      await updateWalletInfo();
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      setWalletState({
        ...initialState,
        error: error.message || 'Failed to connect wallet',
        isConnecting: false
      });
    }
  };

  // Disconnect wallet (client-side only)
  const disconnectWallet = () => {
    setWalletState(initialState);
  };

  // Switch network
  const switchNetwork = async (chainId: number) => {
    try {
      await switchEthereumNetwork(chainId);
      // Network info will be updated via chainChanged event
    } catch (error: any) {
      console.error('Error switching network:', error);
      setWalletState(prev => ({
        ...prev,
        error: error.message || 'Failed to switch network'
      }));
    }
  };

  // Refresh balances
  const refreshBalances = async () => {
    if (!walletState.isConnected || !walletState.address) return;
    
    try {
      const provider = getProvider();
      if (!provider) throw new Error('MetaMask is not installed');

      const ethBalance = await getEthBalance(provider, walletState.address);
      
      // Get DAI balance if available on this network
      let daiBalance = null;
      if (walletState.network) {
        const daiToken = getDAIToken(walletState.network.chainId);
        if (daiToken) {
          daiBalance = await getTokenBalance(provider, daiToken.address, walletState.address);
        }
      }

      setWalletState(prev => ({
        ...prev,
        ethBalance,
        daiBalance,
        error: null
      }));
    } catch (error) {
      console.error('Error refreshing balances:', error);
      setWalletState(prev => ({
        ...prev,
        error: 'Failed to refresh balances'
      }));
    }
  };

  const value = {
    ...walletState,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    refreshBalances
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};