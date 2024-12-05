import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

// Basic ERC20 ABI for token interactions
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'event Transfer(address indexed from, address indexed to, uint256 amount)'
];

export class TokenService {
  private provider: Web3Provider | null = null;
  private tokenContract: ethers.Contract | null = null;

  constructor(provider?: Web3Provider, tokenAddress?: string) {
    if (provider && tokenAddress) {
      this.initialize(provider, tokenAddress);
    }
  }

  initialize(provider: Web3Provider, tokenAddress: string) {
    console.log('Initializing TokenService with address:', tokenAddress);
    this.provider = provider;
    this.tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      provider.getSigner()
    );
  }

  async getBalance(address: string): Promise<string> {
    console.log('Fetching balance for address:', address);
    if (!this.tokenContract) {
      throw new Error('Token contract not initialized');
    }
    try {
      const balance = await this.tokenContract.balanceOf(address);
      const decimals = await this.tokenContract.decimals();
      return ethers.utils.formatUnits(balance, decimals);
    } catch (error) {
      console.error('Error fetching token balance:', error);
      throw error;
    }
  }

  async transfer(to: string, amount: string): Promise<ethers.providers.TransactionResponse> {
    console.log('Initiating transfer to:', to, 'amount:', amount);
    if (!this.tokenContract) {
      throw new Error('Token contract not initialized');
    }
    try {
      const decimals = await this.tokenContract.decimals();
      const parsedAmount = ethers.utils.parseUnits(amount, decimals);
      const tx = await this.tokenContract.transfer(to, parsedAmount);
      return tx;
    } catch (error) {
      console.error('Error transferring tokens:', error);
      throw error;
    }
  }

  async getSymbol(): Promise<string> {
    if (!this.tokenContract) {
      throw new Error('Token contract not initialized');
    }
    return await this.tokenContract.symbol();
  }
}