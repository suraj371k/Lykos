import React from 'react';
import { WalletProvider } from './context/WalletContext';
import Header from './components/Header';
import WalletDashboard from './components/WalletDashboard';

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Header />
        <main className="pt-8 pb-16">
          <WalletDashboard />
        </main>
      </div>
    </WalletProvider>
  );
}

export default App;