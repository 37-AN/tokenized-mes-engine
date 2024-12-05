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
  const { active, account, library, activate, deactivate } = useWeb3React<Web3Provider>();
  const [balance, setBalance] = useState<string>('0');
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

  // Effect to fetch balance when account changes
  useEffect(() => {
    const fetchBalance = async () => {
      if (active && account && library) {
        try {
          const balance = await library.getBalance(account);
          const formattedBalance = (parseFloat(balance.toString()) / 1e18).toFixed(4);
          console.log('Updated balance:', formattedBalance, 'ETH');
          setBalance(formattedBalance);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchBalance();
  }, [active, account, library]);

  // Effect to handle wallet events
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

      window.ethereum.on('chainChanged', () => {
        console.log('Chain changed, reloading...');
        window.location.reload();
      });

      // Cleanup listeners
      return () => {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      };
    }
  }, []);

  const connectWallet = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    try {
      await activate(injected);
      console.log('Wallet connection initiated');
      toast({
        title: "Connecting Wallet",
        description: "Please approve the connection in your wallet",
      });
    } catch (error) {
      console.error('Connection error:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    try {
      deactivate();
      console.log('Wallet disconnected');
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      });
    } catch (error) {
      console.error('Disconnect error:', error);
      toast({
        title: "Error",
        description: "Failed to disconnect wallet",
        variant: "destructive",
      });
    }
  };

  console.log('Wallet connection state:', { active, account, balance });

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
              <span className="ml-2 text-gray-600">{balance} ETH</span>
            </div>
          </div>
        )}

        <Button 
          onClick={active ? disconnectWallet : connectWallet}
          variant={active ? "destructive" : "default"}
          className="w-full"
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : active ? 'Disconnect Wallet' : 'Connect Wallet'}
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