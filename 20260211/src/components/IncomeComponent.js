import React, { useState, useMemo } from 'react';

export function IncomeComponent({ trackers, onDataChange }) {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');

  // Calculate incomes from shared tracker
  const incomes = useMemo(() => {
    return trackers.incomeTracker.getIncomes();
  }, [trackers]);

  const totalIncome = useMemo(() => {
    return trackers.incomeTracker.getTotalIncome();
  }, [trackers]);

  const handleAddIncome = () => {
    if (source.trim() && amount && !isNaN(amount) && amount > 0) {
      try {
        trackers.incomeTracker.addIncome(source, parseFloat(amount));
        setSource('');
        setAmount('');
        onDataChange();
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Please fill in all fields with valid values');
    }
  };

  const handleRemove = (id) => {
    try {
      trackers.incomeTracker.removeIncome(id);
      onDataChange();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>💵 Income Tracker</h2>
        <span className="badge badge-success">{incomes.length} Sources</span>
      </div>

      <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <h3 style={{ marginBottom: '1rem', color: '#10b981', marginTop: 0 }}>Add New Income</h3>
        <div className="grid grid-3">
          <div className="form-group">
            <label>📊 Income Source</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g., Salary, Freelance, etc."
              onKeyPress={(e) => e.key === 'Enter' && handleAddIncome()}
            />
          </div>
          <div className="form-group">
            <label>💰 Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="0"
              step="0.01"
              onKeyPress={(e) => e.key === 'Enter' && handleAddIncome()}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-success" onClick={handleAddIncome} style={{ width: '100%', fontWeight: '700' }}>
              ➕ Add Income
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>
          Total Income: <span style={{ color: '#10b981' }}>₹{totalIncome.toFixed(2)}</span>
        </h3>

        {incomes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p>No income sources yet. Add one to get started!</p>
          </div>
        ) : (
          <ul className="list">
            {incomes.map((income) => (
              <li key={income.id} className="list-item income fade-in">
                <div className="list-item-content">
                  <div className="list-item-description">{income.source}</div>
                  <div className="list-item-date">{new Date(income.date).toLocaleDateString()}</div>
                </div>
                <div className="list-item-amount">₹{income.amount.toFixed(2)}</div>
                <div className="list-item-actions">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(income.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
