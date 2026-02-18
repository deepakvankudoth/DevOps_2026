import React, { useState, useRef } from 'react';
import { DashboardComponent } from './components/DashboardComponent';
import { ExpenseComponent } from './components/ExpenseComponent';
import { IncomeComponent } from './components/IncomeComponent';
import { TransactionHistory } from './components/TransactionHistory';
import { Analytics } from './components/Analytics';
import { ExpenseTracker } from './modules/ExpenseTracker';
import { IncomeTracker } from './modules/IncomeTracker';
import './styles/global.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Shared state across all components - initialized once
  const trackersRef = useRef({
    expenseTracker: new ExpenseTracker(),
    incomeTracker: new IncomeTracker()
  });

  const handleDataChange = () => {
    // Force all components to re-render with fresh data
    setRefreshKey(prev => prev + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardComponent trackers={trackersRef.current} onDataChange={handleDataChange} key={`dashboard-${refreshKey}`} />;
      case 'expenses':
        return <ExpenseComponent trackers={trackersRef.current} onDataChange={handleDataChange} key={`expenses-${refreshKey}`} />;
      case 'income':
        return <IncomeComponent trackers={trackersRef.current} onDataChange={handleDataChange} key={`income-${refreshKey}`} />;
      case 'history':
        return <TransactionHistory trackers={trackersRef.current} key={`history-${refreshKey}`} />;
      case 'analytics':
        return <Analytics trackers={trackersRef.current} key={`analytics-${refreshKey}`} />;
      default:
        return <DashboardComponent trackers={trackersRef.current} onDataChange={handleDataChange} key={`dashboard-${refreshKey}`} />;
    }
  };

  return (
    <div className="app">
      <header>
        <h1>💎 Personal Finance Tracker</h1>
        <p>Manage your money with ease and confidence</p>
      </header>

      <main>
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`tab ${activeTab === 'expenses' ? 'active' : ''}`}
            onClick={() => setActiveTab('expenses')}
          >
            💳 Expenses
          </button>
          <button
            className={`tab ${activeTab === 'income' ? 'active' : ''}`}
            onClick={() => setActiveTab('income')}
          >
            💵 Income
          </button>
          <button
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            📜 History
          </button>
          <button
            className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
        </div>

        {renderContent()}
      </main>

      <footer>
        <p>
          © 2026 Personal Finance Tracker - DevOps Lab Assignment | Made with ❤️
        </p>
      </footer>
    </div>
  );
}

export default App;
