import React, { useState, useMemo } from 'react';

export function TransactionHistory({ trackers }) {
  const [filterType, setFilterType] = useState('all'); // all, income, expense
  const [sortBy, setSortBy] = useState('date-desc'); // date-asc, date-desc, amount-asc, amount-desc
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all'); // all, week, month

  // Combine and process transactions
  const allTransactions = useMemo(() => {
    const expenses = trackers.expenseTracker.getExpenses().map(e => ({
      ...e,
      type: 'expense',
      categoryEmoji: '💳'
    }));

    const incomes = trackers.incomeTracker.getIncomes().map(i => ({
      ...i,
      type: 'income',
      description: i.source,
      categoryEmoji: '💵'
    }));

    let combined = [...expenses, ...incomes];

    // Filter by type
    if (filterType !== 'all') {
      combined = combined.filter(t => t.type === filterType);
    }

    // Filter by search term
    if (searchTerm) {
      combined = combined.filter(t =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range
    const now = new Date();
    if (dateRange !== 'all') {
      const filterDate = new Date();
      if (dateRange === 'week') {
        filterDate.setDate(now.getDate() - 7);
      } else if (dateRange === 'month') {
        filterDate.setMonth(now.getMonth() - 1);
      }
      combined = combined.filter(t => new Date(t.date) >= filterDate);
    }

    // Sort
    combined.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'amount-asc':
          return a.amount - b.amount;
        case 'amount-desc':
          return b.amount - a.amount;
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return combined;
  }, [trackers, filterType, sortBy, searchTerm, dateRange]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalIncome = trackers.incomeTracker.getTotalIncome();
    const totalExpense = trackers.expenseTracker.getTotalExpenses();
    const balance = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

    return {
      totalTransactions: allTransactions.length,
      totalIncome,
      totalExpense,
      balance,
      savingsRate
    };
  }, [allTransactions, expenseTracker, incomeTracker]);

  return (
    <div className="card">
      <div className="card-header">
        <h2>📜 Transaction History & Analytics</h2>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
        <div className="stat-card" style={{ borderLeftColor: '#2dce89' }}>
          <h3>Total Income</h3>
          <div className="amount" style={{ color: '#2dce89' }}>₹{stats.totalIncome.toFixed(2)}</div>
        </div>
        <div className="stat-card" style={{ borderLeftColor: '#f5365c' }}>
          <h3>Total Expenses</h3>
          <div className="amount" style={{ color: '#f5365c' }}>₹{stats.totalExpense.toFixed(2)}</div>
        </div>
        <div className="stat-card" style={{ borderLeftColor: '#5e72e4' }}>
          <h3>Savings Rate</h3>
          <div className="amount" style={{ color: '#5e72e4' }}>{stats.savingsRate}%</div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div style={{ 
        background: '#f7f8fc', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>🔍 Filter & Search</h3>

        <div className="grid grid-3" style={{ marginBottom: '1rem' }}>
          {/* Search */}
          <div className="form-group">
            <label>Search Description</label>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Type */}
          <div className="form-group">
            <label>Transaction Type</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Transactions</option>
              <option value="income">Income Only</option>
              <option value="expense">Expenses Only</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="form-group">
            <label>Date Range</label>
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="all">All Time</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Sort Options */}
        <div className="form-group">
          <label>Sort By</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date-desc">📅 Newest First</option>
            <option value="date-asc">📅 Oldest First</option>
            <option value="amount-desc">💰 Highest Amount</option>
            <option value="amount-asc">💰 Lowest Amount</option>
          </select>
        </div>

        {/* Clear Filters */}
        {(searchTerm || filterType !== 'all' || dateRange !== 'all') && (
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSearchTerm('');
              setFilterType('all');
              setDateRange('all');
              setSortBy('date-desc');
            }}
          >
            🔄 Clear All Filters
          </button>
        )}
      </div>

      {/* Transaction List */}
      <div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #e2e8f0'
        }}>
          <h3 style={{ margin: 0, color: '#2d3748' }}>
            📋 Transactions ({allTransactions.length})
          </h3>
          <div style={{ fontSize: '0.9rem', color: '#718096' }}>
            Total: <strong style={{ color: '#2d3748' }}>₹{allTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}</strong>
          </div>
        </div>

        {allTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p>No transactions found. Try adjusting your filters!</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.95rem'
            }}>
              <thead>
                <tr style={{ 
                  background: '#f7f8fc', 
                  borderBottom: '2px solid #e2e8f0'
                }}>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#2d3748'
                  }}>Type</th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#2d3748'
                  }}>Description</th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#2d3748'
                  }}>Date</th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'right',
                    fontWeight: '600',
                    color: '#2d3748'
                  }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {allTransactions.map((transaction, index) => (
                  <tr 
                    key={`${transaction.type}-${transaction.id}-${index}`}
                    style={{
                      borderBottom: '1px solid #e2e8f0',
                      transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f7f8fc'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '1rem' }}>
                      <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>
                        {transaction.type === 'income' ? '📈' : '📉'}
                      </span>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        background: transaction.type === 'income' ? 'rgba(45, 206, 137, 0.2)' : 'rgba(245, 54, 92, 0.2)',
                        color: transaction.type === 'income' ? '#2dce89' : '#f5365c'
                      }}>
                        {transaction.type === 'income' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: '#2d3748', fontWeight: '500' }}>
                      {transaction.description}
                    </td>
                    <td style={{ padding: '1rem', color: '#718096' }}>
                      {new Date(transaction.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td style={{ 
                      padding: '1rem', 
                      textAlign: 'right',
                      fontWeight: '700',
                      fontSize: '1.05rem',
                      color: transaction.type === 'income' ? '#2dce89' : '#f5365c'
                    }}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      {allTransactions.length > 0 && (
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '2px solid #e2e8f0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Total Transactions
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2d3748' }}>
              {allTransactions.length}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Avg. Transaction
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2d3748' }}>
              ₹{(allTransactions.reduce((sum, t) => sum + t.amount, 0) / allTransactions.length).toFixed(2)}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Highest Transaction
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2d3748' }}>
              ₹{Math.max(...allTransactions.map(t => t.amount)).toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
