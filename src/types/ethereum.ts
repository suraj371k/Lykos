export interface WalletState {
  address: string | null;
  network: NetworkInfo | null;
  ethBalance: string | null;
  daiBalance: string | null;
  ensName: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

export interface NetworkInfo {
  name: string;
  chainId: number;
  ensSupported: boolean;
}

export interface ERC20Token {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
}

export interface TokenBalance {
  token: ERC20Token;
  balance: string;
}

export interface WalletContextType extends WalletState {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
  refreshBalances: () => Promise<void>;
}