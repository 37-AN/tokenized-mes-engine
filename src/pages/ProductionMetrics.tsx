import React from 'react';
import { WalletConnection } from '@/components/wallet/WalletConnection';

const ProductionMetrics = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Production Metrics</h1>
      <div className="mb-8">
        <WalletConnection />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Production Rate</h2>
          <p className="text-3xl font-bold">85%</p>
          <p className="text-gray-600">Current efficiency</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Output Volume</h2>
          <p className="text-3xl font-bold">1,234</p>
          <p className="text-gray-600">Units produced today</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quality Control</h2>
          <p className="text-3xl font-bold">98.5%</p>
          <p className="text-gray-600">Pass rate</p>
        </div>
      </div>
    </div>
  );
};

export default ProductionMetrics;