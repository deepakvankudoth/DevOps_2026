import React, { useState, useMemo } from 'react';

export function ExpenseComponent({ trackers, onDataChange }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // Calculate expenses from shared tracker
  const expenses = useMemo(() => {
    return trackers.expenseTracker.getExpenses();
  }, [trackers]);

  const totalExpenses = useMemo(() => {
    return trackers.expenseTracker.getTotalExpenses();
  }, [trackers]);

  const handleAddExpense = () => {
    if (description.trim() && amount && !isNaN(amount) && amount > 0) {
      try {
        trackers.expenseTracker.addExpense(description, parseFloat(amount));
        setDescription('');
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
      trackers.expenseTracker.removeExpense(id);
      onDataChange();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>💳 Expense Tracker</h2>
        <span className="badge badge-danger">{expenses.length} Expenses</span>
      </div>

      <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
        <h3 style={{ marginBottom: '1rem', color: '#ef4444', marginTop: 0 }}>Add New Expense</h3>
        <div className="grid grid-3">
          <div className="form-group">
            <label>📝 Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Groceries, Gas, etc."
              onKeyPress={(e) => e.key === 'Enter' && handleAddExpense()}
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
              onKeyPress={(e) => e.key === 'Enter' && handleAddExpense()}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-primary" onClick={handleAddExpense} style={{ width: '100%', fontWeight: '700' }}>
              ➕ Add Expense
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>
          Total Expenses: <span style={{ color: '#ef4444' }}>₹{totalExpenses.toFixed(2)}</span>
        </h3>

        {expenses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p>No expenses yet. Add one to get started!</p>
          </div>
        ) : (
          <ul className="list">
            {expenses.map((expense) => (
              <li key={expense.id} className="list-item expense fade-in">
                <div className="list-item-content">
                  <div className="list-item-description">{expense.description}</div>
                  <div className="list-item-date">{new Date(expense.date).toLocaleDateString()}</div>
                </div>
                <div className="list-item-amount">₹{expense.amount.toFixed(2)}</div>
                <div className="list-item-actions">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(expense.id)}
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
