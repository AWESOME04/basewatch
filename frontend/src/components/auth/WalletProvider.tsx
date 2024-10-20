import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers, BrowserProvider, JsonRpcSigner } from 'ethers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type EthereumProvider = ethers.Eip1193Provider & {
  on(event: string, listener: (...args: any[]) => void): void;
  removeListener(event: string, listener: (...args: any[]) => void): void;
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

interface WalletContextType {
  isConnected: boolean;
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const BASE_CHAIN_ID = '0x2105'; // Chain ID for Base mainnet
const BASE_RPC_URL = 'https://mainnet.base.org'; // RPC URL for Base mainnet

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
    const ethereum = window.ethereum;
    if (ethereum) {
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

      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  const checkConnection = async () => {
    const ethereum = window.ethereum;
    if (ethereum) {
      try {
        const provider = new BrowserProvider(ethereum);
        const network = await provider.getNetwork();
        if (network.chainId.toString(16) !== BASE_CHAIN_ID.slice(2)) {
          throw new Error('Please switch to the Base network');
        }
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
    const ethereum = window.ethereum;
    if (ethereum) {
      try {
        const provider = new BrowserProvider(ethereum);
        
        // Request account access
        await provider.send("eth_requestAccounts", []);
        
        // Check if we're on the Base network
        const network = await provider.getNetwork();
        if (network.chainId.toString(16) !== BASE_CHAIN_ID.slice(2)) {
          // If not on Base, request to switch to Base
          try {
            await ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: BASE_CHAIN_ID }],
            });
          } catch (switchError: any) {
            if (switchError.code === 4902) {
              try {
                await ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: BASE_CHAIN_ID,
                      chainName: 'Base',
                      nativeCurrency: {
                        name: 'Ether',
                        symbol: 'ETH',
                        decimals: 18
                      },
                      rpcUrls: [BASE_RPC_URL],
                      blockExplorerUrls: ['https://basescan.org/'],
                    },
                  ],
                });
              } catch (addError) {
                throw new Error('Failed to add the Base network');
              }
            } else {
              throw switchError;
            }
          }
        }
        
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setIsConnected(true);
        setAccount(address);
        toast.success('Wallet connected successfully to Base!');
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