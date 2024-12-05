import { WalletConnection } from "@/components/wallet/WalletConnection";
import { TokenInteraction } from "@/components/token/TokenInteraction";
import { Card } from "@/components/ui/card";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tokenized Asset Platform</h1>
          <p className="text-lg text-gray-600">Manage and transfer your digital assets securely</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Wallet Connection</h2>
            <WalletConnection />
          </Card>

          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Token Management</h2>
            <TokenInteraction />
          </Card>
        </div>
      </div>
    </div>
  );
}