import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { TokenService } from '@/services/tokenService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export function TokenInteraction() {
  const { active, library, account } = useWeb3React<Web3Provider>();
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenService, setTokenService] = useState<TokenService | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [symbol, setSymbol] = useState<string>('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (active && library && tokenAddress) {
      const service = new TokenService(library, tokenAddress);
      setTokenService(service);
      fetchTokenInfo(service);
    }
  }, [active, library, tokenAddress]);

  const fetchTokenInfo = async (service: TokenService) => {
    if (!account) return;
    try {
      const [tokenSymbol, tokenBalance] = await Promise.all([
        service.getSymbol(),
        service.getBalance(account)
      ]);
      setSymbol(tokenSymbol);
      setBalance(tokenBalance);
      console.log('Token info fetched:', { symbol: tokenSymbol, balance: tokenBalance });
    } catch (error) {
      console.error('Error fetching token info:', error);
      toast({
        title: "Error",
        description: "Failed to fetch token information",
        variant: "destructive",
      });
    }
  };

  const handleTransfer = async () => {
    if (!tokenService || !recipientAddress || !transferAmount) return;
    
    try {
      const tx = await tokenService.transfer(recipientAddress, transferAmount);
      console.log('Transfer initiated:', tx.hash);
      
      toast({
        title: "Transfer Initiated",
        description: "Please wait for the transaction to be confirmed",
      });
      
      await tx.wait();
      console.log('Transfer confirmed');
      
      toast({
        title: "Transfer Successful",
        description: `Successfully transferred ${transferAmount} ${symbol} tokens`,
      });
      
      // Refresh balance after transfer
      if (account) {
        const newBalance = await tokenService.getBalance(account);
        setBalance(newBalance);
      }
    } catch (error) {
      console.error('Transfer error:', error);
      toast({
        title: "Transfer Failed",
        description: "Failed to transfer tokens. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!active) {
    return (
      <Card className="p-6">
        <p className="text-center">Please connect your wallet to interact with tokens.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Token Address</label>
          <Input
            type="text"
            placeholder="Enter token contract address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
        </div>

        {tokenService && (
          <>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm">Balance: {balance} {symbol}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Recipient Address</label>
                <Input
                  type="text"
                  placeholder="Enter recipient address"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <Input
                  type="text"
                  placeholder="Enter amount to transfer"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                />
              </div>

              <Button
                onClick={handleTransfer}
                disabled={!recipientAddress || !transferAmount}
                className="w-full"
              >
                Transfer Tokens
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}