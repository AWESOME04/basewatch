import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          toast.success('Wallet connected successfully!');
        } else {
          setIsConnected(false);
          setAccount(null);
          toast.info('Wallet disconnected');
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
        toast.error('Failed to check wallet connection');
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
        toast.success('Wallet connected successfully!');
      } catch (error) {
        console.error("An error occurred while connecting the wallet:", error);
        toast.error('Failed to connect wallet. Please try again.');
      }
    } else {
      toast.error('MetaMask is not installed. Please install it to use this feature.', {
        autoClose: 1500,
      });
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount(null);
    toast.success('Wallet disconnected successfully.');
  };

  return (
    <WalletContext.Provider value={{ isConnected, account, connectWallet, disconnectWallet }}>
      {children}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
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