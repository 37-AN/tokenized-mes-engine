import React, { useEffect, useState } from 'react';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3Provider } from '@ethersproject/providers';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function WalletStatus() {
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React<Web3Provider>();
  const [balance, setBalance] = useState<string>('0');
  const { toast } = useToast();

  // Effect to handle initial connection status
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (window.ethereum) {
        try {
          await activate(injected);
          console.log('Wallet auto-connected successfully');
        } catch (error) {
          console.error('Failed to auto-connect wallet:', error);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  // Effect to update balance when account changes
  useEffect(() => {
    console.log('Wallet status changed:', { active, account, chainId });
    
    const getBalance = async () => {
      if (active && account && window.ethereum) {
        try {
          const provider = new Web3Provider(window.ethereum);
          const balance = await provider.getBalance(account);
          const formattedBalance = (parseFloat(balance.toString()) / 1e18).toFixed(4) + ' ETH';
          console.log('Updated balance:', formattedBalance);
          setBalance(formattedBalance);
        } catch (error) {
          console.error('Error fetching balance:', error);
          toast({
            title: "Error",
            description: "Failed to fetch balance",
            variant: "destructive",
          });
        }
      }
    };
    
    getBalance();
  }, [active, account, chainId]);

  // Effect to handle account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        console.log('Account changed:', accounts[0]);
        if (accounts.length > 0) {
          activate(injected);
        } else {
          deactivate();
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        console.log('Chain changed:', chainId);
        window.location.reload();
      });

      return () => {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      };
    }
  }, []);

  const connectWallet = async () => {
    try {
      await activate(injected);
      console.log('Wallet connected successfully');
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected!",
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    try {
      deactivate();
      console.log('Wallet disconnected successfully');
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      });
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast({
        title: "Error",
        description: "Failed to disconnect wallet",
        variant: "destructive",
      });
    }
  };

  if (!window.ethereum) {
    return (
      <Card className="p-6 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Wallet Status</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">No Wallet</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Please install MetaMask or another Web3 wallet to continue.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Wallet Status</h2>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${active ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm">{active ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>
        
        {active && account && (
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-semibold">Address:</span>
              <span className="ml-2 text-gray-600">
                {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
              </span>
            </div>
            <div className="text-sm">
              <span className="font-semibold">Balance:</span>
              <span className="ml-2 text-gray-600">{balance}</span>
            </div>
          </div>
        )}

        <Button 
          onClick={active ? disconnectWallet : connectWallet}
          variant={active ? "destructive" : "default"}
          className="w-full"
        >
          {active ? 'Disconnect Wallet' : 'Connect Wallet'}
        </Button>
      </div>
    </Card>
  );
}

export function WalletConnection() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletStatus />
    </Web3ReactProvider>
  );
}