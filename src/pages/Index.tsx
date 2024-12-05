import { WalletConnection } from "@/components/wallet/WalletConnection";
import { TokenInteraction } from "@/components/token/TokenInteraction";

export default function Index() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Blockchain Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <WalletConnection />
        <TokenInteraction />
      </div>
    </div>
  );
}