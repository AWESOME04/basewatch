import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers, BrowserProvider } from 'ethers';

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider & {
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}

interface WalletContextType {
  isConnected: boolean;
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setIsConnected(true);
          setAccount(accounts[0]);
        } else {
          setIsConnected(false);
          setAccount(null);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (window.ethereum && window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setIsConnected(true);
          setAccount(accounts[0].address);
        }
      } catch (error) {
        console.error("An error occurred while checking the connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setIsConnected(true);
        setAccount(address);
      } catch (error) {
        console.error("An error occurred while connecting the wallet:", error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount(null);
  };

  return (
    <WalletContext.Provider value={{ isConnected, account, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};