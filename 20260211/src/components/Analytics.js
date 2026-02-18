import React, { useState, useMemo } from 'react';
import { BarChart, PieChart, LineChart } from './Charts';

export function Analytics({ trackers }) {
  const analytics = useMemo(() => {
    const totalIncome = trackers.incomeTracker.getTotalIncome();
    const totalExpense = trackers.expenseTracker.getTotalExpenses();
    const balance = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

    // Get all transactions
    const allExpenses = trackers.expenseTracker.getExpenses();
    const allIncomes = trackers.incomeTracker.getIncomes();

    // Calculate category-wise breakdown
    const expensesByCategory = {};
    allExpenses.forEach(exp => {
      const category = exp.description.split('-')[0].trim();
      expensesByCategory[category] = (expensesByCategory[category] || 0) + exp.amount;
    });

    const incomeBySource = {};
    allIncomes.forEach(inc => {
      const source = inc.source;
      incomeBySource[source] = (incomeBySource[source] || 0) + inc.amount;
    });

    // Calculate monthly trend
    const monthlyData = {};
    const now = new Date();
    
    [...allExpenses, ...allIncomes].forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0 };
      }
      if (transaction.source || transaction.description.includes('source')) {
        monthlyData[monthKey].income += transaction.amount;
      } else {
        monthlyData[monthKey].expense += transaction.amount;
      }
    });

    // Prepare chart data
    const expenseChartData = Object.entries(expensesByCategory).map(([label, value]) => ({
      label,
      value
    }));

    const incomeChartData = Object.entries(incomeBySource).map(([label, value]) => ({
      label,
      value
    }));

    const sortedMonths = Object.keys(monthlyData).sort();
    const lineChartData = [
      {
        label: 'Income',
        points: sortedMonths.map(month => ({
          label: month,
          value: monthlyData[month].income
        }))
      },
      {
        label: 'Expenses',
        points: sortedMonths.map(month => ({
          label: month,
          value: monthlyData[month].expense
        }))
      }
    ];

    return {
      totalIncome,
      totalExpense,
      balance,
      savingsRate,
      expensesByCategory,
      incomeBySource,
      transactionCount: allExpenses.length + allIncomes.length,
      avgExpense: allExpenses.length > 0 ? (totalExpense / allExpenses.length).toFixed(2) : 0,
      avgIncome: allIncomes.length > 0 ? (totalIncome / allIncomes.length).toFixed(2) : 0,
      expenseChartData,
      incomeChartData,
      lineChartData
    };
  }, [trackers]);

  return (
    <div className="card">
      <div className="card-header">
        <h2>📊 Financial Analytics & Insights</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
        <div className="stat-card" style={{ borderLeftColor: '#10b981' }}>
          <h3>Total Income</h3>
          <div className="amount" style={{ color: '#10b981' }}>₹{analytics.totalIncome.toFixed(2)}</div>
          <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
            Avg: ₹{analytics.avgIncome}
          </div>
        </div>

        <div className="stat-card" style={{ borderLeftColor: '#ef4444' }}>
          <h3>Total Expenses</h3>
          <div className="amount" style={{ color: '#ef4444' }}>₹{analytics.totalExpense.toFixed(2)}</div>
          <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
            Avg: ₹{analytics.avgExpense}
          </div>
        </div>

        <div className="stat-card" style={{ borderLeftColor: '#667eea' }}>
          <h3>Net Balance</h3>
          <div className="amount" style={{ 
            color: analytics.balance >= 0 ? '#10b981' : '#ef4444'
          }}>₹{analytics.balance.toFixed(2)}</div>
          <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
            Savings: {analytics.savingsRate}%
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="grid grid-2" style={{ gap: '2rem' }}>
          {/* Income vs Expenses Comparison */}
          <div style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <BarChart
              data={[
                { label: 'Income', value: analytics.totalIncome },
                { label: 'Expenses', value: analytics.totalExpense }
              ]}
              title="📊 Income vs Expenses"
              colors={['#10b981', '#ef4444']}
            />
          </div>

          {/* Monthly Trend */}
          <div style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            {analytics.lineChartData[0].points.length > 0 ? (
              <LineChart
                data={analytics.lineChartData}
                title="📈 Monthly Trend"
                colors={['#10b981', '#ef4444']}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                <p>No monthly data available yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-2" style={{ marginBottom: '2rem', gap: '2rem' }}>
        {/* Expenses Breakdown */}
        <div style={{
          background: '#fff',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          {analytics.expenseChartData.length > 0 ? (
            <PieChart
              data={analytics.expenseChartData}
              title="💳 Expenses Breakdown"
              colors={['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16']}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
              <p>No expense data available yet</p>
            </div>
          )}
        </div>

        {/* Income Breakdown */}
        <div style={{
          background: '#fff',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          {analytics.incomeChartData.length > 0 ? (
            <PieChart
              data={analytics.incomeChartData}
              title="💵 Income Sources"
              colors={['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899']}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
              <p>No income data available yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Statistics Summary */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '8px',
        marginTop: '2rem'
      }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>📈 Financial Health Summary</h3>
        <div className="grid grid-3">
          <div>
            <div style={{ opacity: 0.9, marginBottom: '0.5rem' }}>Total Transactions</div>
            <div style={{ fontSize: '2rem', fontWeight: '700' }}>{analytics.transactionCount}</div>
          </div>
          <div>
            <div style={{ opacity: 0.9, marginBottom: '0.5rem' }}>Expense to Income Ratio</div>
            <div style={{ fontSize: '2rem', fontWeight: '700' }}>
              {analytics.totalIncome > 0 ? ((analytics.totalExpense / analytics.totalIncome) * 100).toFixed(1) : 0}%
            </div>
          </div>
          <div>
            <div style={{ opacity: 0.9, marginBottom: '0.5rem' }}>Monthly Savings Rate</div>
            <div style={{ fontSize: '2rem', fontWeight: '700' }}>{analytics.savingsRate}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
