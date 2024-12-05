import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { AssetTokenService } from '@/services/assetTokenService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const CONTRACT_ADDRESS = "0xfb936A16263868c41c1Abe5F584c7efda3F6013F";

export function AssetTokenization() {
  const { active, library, account } = useWeb3React<Web3Provider>();
  const [assetService, setAssetService] = useState<AssetTokenService | null>(null);
  const [tokenId, setTokenId] = useState('');
  const [tokenURI, setTokenURI] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (active && library) {
      const service = new AssetTokenService(library, CONTRACT_ADDRESS);
      setAssetService(service);
      console.log('Asset token service initialized with contract:', CONTRACT_ADDRESS);
    }
  }, [active, library]);

  const handleMint = async () => {
    if (!assetService || !recipientAddress || !tokenId || !tokenURI) return;
    
    try {
      const tx = await assetService.mintAssetToken(recipientAddress, tokenId, tokenURI);
      console.log('Mint initiated:', tx.hash);
      
      toast({
        title: "Minting Initiated",
        description: "Please wait for the transaction to be confirmed",
      });
      
      await tx.wait();
      console.log('Mint confirmed');
      
      toast({
        title: "Minting Successful",
        description: `Successfully minted token ID ${tokenId}`,
      });
    } catch (error) {
      console.error('Minting error:', error);
      toast({
        title: "Minting Failed",
        description: "Failed to mint token. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBurn = async () => {
    if (!assetService || !tokenId) return;
    
    try {
      const tx = await assetService.burnAssetToken(tokenId);
      console.log('Burn initiated:', tx.hash);
      
      toast({
        title: "Burn Initiated",
        description: "Please wait for the transaction to be confirmed",
      });
      
      await tx.wait();
      console.log('Burn confirmed');
      
      toast({
        title: "Burn Successful",
        description: `Successfully burned token ID ${tokenId}`,
      });
    } catch (error) {
      console.error('Burn error:', error);
      toast({
        title: "Burn Failed",
        description: "Failed to burn token. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!active) {
    return (
      <Card className="p-6">
        <p className="text-center">Please connect your wallet to manage asset tokens.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Token ID</label>
            <Input
              type="text"
              placeholder="Enter token ID"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Token URI</label>
            <Input
              type="text"
              placeholder="Enter token URI"
              value={tokenURI}
              onChange={(e) => setTokenURI(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Recipient Address</label>
            <Input
              type="text"
              placeholder="Enter recipient address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={handleMint}
              disabled={!recipientAddress || !tokenId || !tokenURI}
              className="flex-1"
            >
              Mint Token
            </Button>
            <Button
              onClick={handleBurn}
              disabled={!tokenId}
              variant="destructive"
              className="flex-1"
            >
              Burn Token
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}