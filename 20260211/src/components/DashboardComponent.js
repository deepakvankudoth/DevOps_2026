import React, { useState, useMemo } from 'react';
import { Dashboard as DashboardModule } from '../modules/Dashboard';
import { MoneyFlow } from './MoneyFlow';

export function DashboardComponent({ trackers, onDataChange }) {
  const [incomeAmount, setIncomeAmount] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [incomeDescription, setIncomeDescription] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');

  // Create dashboard module for calculations
  const dashboard = useMemo(() => new DashboardModule(), []);

  // Calculate totals from shared trackers
  const totalIncome = trackers.incomeTracker.getTotalIncome();
  const totalExpenses = trackers.expenseTracker.getTotalExpenses();
  const balance = totalIncome - totalExpenses;

  const summary = {
    income: totalIncome,
    expenses: totalExpenses,
    balance: balance
  };

  const handleAddIncome = () => {
    if (incomeAmount && !isNaN(incomeAmount) && incomeAmount > 0) {
      try {
        const description = incomeDescription || 'Quick Income';
        trackers.incomeTracker.addIncome(description, parseFloat(incomeAmount));
        setIncomeAmount('');
        setIncomeDescription('');
        onDataChange();
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Please enter a valid amount');
    }
  };

  const handleAddExpense = () => {
    if (expenseAmount && !isNaN(expenseAmount) && expenseAmount > 0) {
      try {
        const description = expenseDescription || 'Quick Expense';
        trackers.expenseTracker.addExpense(description, parseFloat(expenseAmount));
        setExpenseAmount('');
        setExpenseDescription('');
        onDataChange();
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Please enter a valid amount');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>💰 Financial Overview</h2>
      </div>

      <div className="grid grid-3">
        <div className="stat-card income">
          <h3>Total Income</h3>
          <div className="amount">₹{summary.income.toFixed(2)}</div>
        </div>

        <div className="stat-card expense">
          <h3>Total Expenses</h3>
          <div className="amount">₹{summary.expenses.toFixed(2)}</div>
        </div>

        <div className="stat-card balance">
          <h3>Balance</h3>
          <div className={`amount ${summary.balance >= 0 ? 'positive' : 'negative'}`}>
            ₹{summary.balance.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Money Flow Visualization */}
      <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.25rem', fontWeight: '700' }}>
          💸 Money Flow
        </h3>
        <MoneyFlow totalIncome={summary.income} totalExpenses={summary.expenses} />
      </div>

      {/* Quick Add Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
        padding: '2rem',
        borderRadius: '12px',
        marginTop: '2.5rem',
        border: '1px solid rgba(102, 126, 234, 0.1)'
      }}>
        <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.25rem' }}>
          ⚡ Quick Add Transaction
        </h3>
        <div className="grid grid-2" style={{ gap: '2rem' }}>
          {/* Income Section */}
          <div style={{ 
            padding: '1.5rem',
            background: 'rgba(16, 185, 129, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.75rem', 
              fontWeight: '700',
              color: '#10b981',
              fontSize: '0.95rem'
            }}>📈 Add Income</label>
            <input
              type="text"
              value={incomeDescription}
              onChange={(e) => setIncomeDescription(e.target.value)}
              placeholder="e.g., Salary, Freelance"
              style={{ marginBottom: '0.75rem' }}
            />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="number"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                placeholder="Enter amount"
                min="0"
                step="0.01"
                style={{ flex: 1 }}
              />
              <button 
                className="btn btn-success" 
                onClick={handleAddIncome} 
                style={{ whiteSpace: 'nowrap', fontWeight: '700' }}
              >
                ➕ Add
              </button>
            </div>
          </div>

          {/* Expense Section */}
          <div style={{ 
            padding: '1.5rem',
            background: 'rgba(239, 68, 68, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.75rem', 
              fontWeight: '700',
              color: '#ef4444',
              fontSize: '0.95rem'
            }}>📉 Add Expense</label>
            <input
              type="text"
              value={expenseDescription}
              onChange={(e) => setExpenseDescription(e.target.value)}
              placeholder="e.g., Groceries, Rent"
              style={{ marginBottom: '0.75rem' }}
            />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="Enter amount"
                min="0"
                step="0.01"
                style={{ flex: 1 }}
              />
              <button 
                className="btn btn-danger" 
                onClick={handleAddExpense} 
                style={{ whiteSpace: 'nowrap', fontWeight: '700' }}
              >
                ➖ Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div style={{
        marginTop: '2.5rem',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(59, 130, 246, 0.05))',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.1)',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
          💡 <strong>Tip:</strong> Navigate to other tabs to add detailed information with categories and dates!
        </p>
      </div>
    </div>
  );
}
