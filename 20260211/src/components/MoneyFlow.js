import React from 'react';

export function MoneyFlow({ totalIncome, totalExpenses }) {
  return (
    <div style={{
      width: '100%',
      height: '300px',
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
      borderRadius: '12px',
      padding: '2rem',
      border: '1px solid rgba(102, 126, 234, 0.1)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* SVG Background */}
      <svg 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 0
        }}
        viewBox="0 0 1000 300"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Grid Background */}
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(102, 126, 234, 0.05)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="1000" height="300" fill="url(#grid)" />
      </svg>

      {/* Income Section - Flowing Down */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        zIndex: 1
      }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>⬇️</div>

        {/* Animated Money Flow Lines */}
        <svg width="80" height="120" style={{ overflow: 'visible' }}>
          {[0, 1, 2, 3].map(i => (
            <circle
              key={`income-${i}`}
              cx="40"
              cy={0}
              r="6"
              fill="#10b981"
              opacity="0.8"
              style={{
                animation: `flowDown 2s ease-in-out ${i * 0.5}s infinite`,
                filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.4))'
              }}
            />
          ))}
          <style>{`
            @keyframes flowDown {
              0% {
                cy: 0;
                opacity: 1;
              }
              100% {
                cy: 120;
                opacity: 0;
              }
            }
          `}</style>
        </svg>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{
            color: '#10b981',
            fontSize: '1.25rem',
            fontWeight: '700',
            margin: '0.5rem 0 0 0'
          }}>Income</h3>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#10b981',
            margin: '0.5rem 0',
            textShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
          }}>₹{totalIncome.toFixed(2)}</p>
          <p style={{
            fontSize: '0.85rem',
            color: '#64748b',
            margin: 0
          }}>Money Coming In</p>
        </div>
      </div>

      {/* Center Divider */}
      <div style={{
        width: '2px',
        height: '150px',
        background: 'linear-gradient(180deg, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))',
        borderRadius: '1px',
        zIndex: 1
      }}></div>

      {/* Expense Section - Flowing Down */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        zIndex: 1
      }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>⬇️</div>

        {/* Animated Money Flow Lines */}
        <svg width="80" height="120" style={{ overflow: 'visible' }}>
          {[0, 1, 2, 3].map(i => (
            <circle
              key={`expense-${i}`}
              cx="40"
              cy={0}
              r="6"
              fill="#ef4444"
              opacity="0.8"
              style={{
                animation: `flowDown 2s ease-in-out ${i * 0.5}s infinite`,
                filter: 'drop-shadow(0 2px 4px rgba(239, 68, 68, 0.4))'
              }}
            />
          ))}
        </svg>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{
            color: '#ef4444',
            fontSize: '1.25rem',
            fontWeight: '700',
            margin: '0.5rem 0 0 0'
          }}>Expenses</h3>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#ef4444',
            margin: '0.5rem 0',
            textShadow: '0 2px 4px rgba(239, 68, 68, 0.2)'
          }}>₹{totalExpenses.toFixed(2)}</p>
          <p style={{
            fontSize: '0.85rem',
            color: '#64748b',
            margin: 0
          }}>Money Going Out</p>
        </div>
      </div>

      {/* Bottom Balance Info */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        right: '2rem',
        textAlign: 'center',
        zIndex: 1,
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '1rem',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)'
      }}>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Balance</p>
        <p style={{
          fontSize: '1.5rem',
          fontWeight: '800',
          color: totalIncome - totalExpenses >= 0 ? '#10b981' : '#ef4444',
          margin: '0.25rem 0 0 0'
        }}>₹{(totalIncome - totalExpenses).toFixed(2)}</p>
      </div>
    </div>
  );
}
