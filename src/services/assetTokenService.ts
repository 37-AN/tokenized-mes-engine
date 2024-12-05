import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

const ASSET_TOKEN_ABI = [
  'function mint(address to, uint256 tokenId, string uri) public',
  'function burn(uint256 tokenId) public',
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function tokenURI(uint256 tokenId) public view returns (string)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'event TokenMinted(address indexed to, uint256 indexed tokenId, string uri)',
  'event TokenBurned(uint256 indexed tokenId)'
];

export class AssetTokenService {
  private provider: Web3Provider | null = null;
  private tokenContract: ethers.Contract | null = null;

  constructor(provider?: Web3Provider, contractAddress?: string) {
    if (provider && contractAddress) {
      this.initialize(provider, contractAddress);
    }
  }

  initialize(provider: Web3Provider, contractAddress: string) {
    console.log('Initializing AssetTokenService with address:', contractAddress);
    this.provider = provider;
    this.tokenContract = new ethers.Contract(
      contractAddress,
      ASSET_TOKEN_ABI,
      provider.getSigner()
    );
  }

  async mintAssetToken(to: string, tokenId: string, uri: string) {
    console.log('Minting asset token:', { to, tokenId, uri });
    if (!this.tokenContract) {
      throw new Error('Token contract not initialized');
    }
    try {
      const tx = await this.tokenContract.mint(to, tokenId, uri);
      console.log('Mint transaction initiated:', tx.hash);
      return tx;
    } catch (error) {
      console.error('Error minting token:', error);
      throw error;
    }
  }

  async burnAssetToken(tokenId: string) {
    console.log('Burning asset token:', tokenId);
    if (!this.tokenContract) {
      throw new Error('Token contract not initialized');
    }
    try {
      const tx = await this.tokenContract.burn(tokenId);
      console.log('Burn transaction initiated:', tx.hash);
      return tx;
    } catch (error) {
      console.error('Error burning token:', error);
      throw error;
    }
  }

  async getTokenOwner(tokenId: string): Promise<string> {
    if (!this.tokenContract) {
      throw new Error('Token contract not initialized');
    }
    return await this.tokenContract.ownerOf(tokenId);
  }

  async getTokenURI(tokenId: string): Promise<string> {
    if (!this.tokenContract) {
      throw new Error('Token contract not initialized');
    }
    return await this.tokenContract.tokenURI(tokenId);
  }
}