import React from 'react';

export function BarChart({ data, title, colors = ['#667eea', '#10b981'] }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
        <p>No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const barHeight = 200;

  return (
    <div>
      <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.1rem', fontWeight: '700' }}>
        {title}
      </h3>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        gap: '1rem',
        height: barHeight + 50,
        padding: '1rem',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
        borderRadius: '12px',
        border: '1px solid rgba(102, 126, 234, 0.1)'
      }}>
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          const height = (percentage / 100) * barHeight;
          
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                gap: '0.5rem'
              }}
            >
              {/* Bar */}
              <div
                style={{
                  width: '100%',
                  height: height,
                  background: `linear-gradient(180deg, ${colors[index % colors.length]}, ${colors[index % colors.length]}dd)`,
                  borderRadius: '8px 8px 0 0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.height = (height * 1.1) + 'px';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.height = height + 'px';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Animated Fill Effect */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: 0,
                  background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)`,
                  animation: 'shimmer 2s infinite'
                }}></div>
              </div>

              {/* Value Label */}
              <div style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                color: colors[index % colors.length],
                textAlign: 'center',
                whiteSpace: 'nowrap'
              }}>
                ₹{item.value.toFixed(0)}
              </div>

              {/* Label */}
              <div style={{
                fontSize: '0.8rem',
                color: '#64748b',
                textAlign: 'center',
                maxWidth: '80px',
                wordWrap: 'break-word'
              }}>
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export function PieChart({ data, title, colors = ['#667eea', '#10b981', '#ef4444', '#f59e0b', '#3b82f6'] }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
        <p>No data available</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const startAngle = (cumulativePercentage / 100) * 360;
    const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
    
    cumulativePercentage += percentage;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const radius = 80;
    const x1 = 100 + radius * Math.cos(startRad);
    const y1 = 100 + radius * Math.sin(startRad);
    const x2 = 100 + radius * Math.cos(endRad);
    const y2 = 100 + radius * Math.sin(endRad);

    const largeArc = percentage > 50 ? 1 : 0;

    const pathData = [
      `M 100 100`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    return {
      path: pathData,
      color: colors[index % colors.length],
      percentage: percentage.toFixed(1),
      label: item.label,
      value: item.value
    };
  });

  return (
    <div>
      <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.1rem', fontWeight: '700' }}>
        {title}
      </h3>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {/* Pie Chart SVG */}
        <svg width="200" height="200" viewBox="0 0 200 200" style={{
          filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))'
        }}>
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.path}
              fill={segment.color}
              stroke="white"
              strokeWidth="2"
              style={{
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                filter: `drop-shadow(0 2px 4px ${segment.color}44)`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = `drop-shadow(0 4px 8px ${segment.color}66)`;
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = `drop-shadow(0 2px 4px ${segment.color}44)`;
                e.currentTarget.style.opacity = '1';
              }}
            />
          ))}
        </svg>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {segments.map((segment, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '3px',
                background: segment.color,
                boxShadow: `0 2px 4px ${segment.color}44`
              }}></div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>
                  {segment.label}
                </p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                  ₹{segment.value.toFixed(0)} ({segment.percentage}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LineChart({ data, title, colors = ['#667eea', '#10b981'] }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
        <p>No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.flatMap(series => series.points.map(p => p.value)));
  const minValue = Math.min(...data.flatMap(series => series.points.map(p => p.value)));
  const range = maxValue - minValue;
  const padding = 40;
  const chartWidth = 500;
  const chartHeight = 250;

  return (
    <div>
      <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.1rem', fontWeight: '700' }}>
        {title}
      </h3>
      <div style={{
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
        borderRadius: '12px',
        border: '1px solid rgba(102, 126, 234, 0.1)',
        padding: '1.5rem'
      }}>
        <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          {/* Grid Lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={`grid-${i}`}
              x1={padding}
              y1={padding + (i * (chartHeight - 2 * padding) / 4)}
              x2={chartWidth - padding}
              y2={padding + (i * (chartHeight - 2 * padding) / 4)}
              stroke="rgba(102, 126, 234, 0.1)"
              strokeWidth="1"
              strokeDasharray="4"
            />
          ))}

          {/* Axes */}
          <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#cbd5e1" strokeWidth="2" />
          <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#cbd5e1" strokeWidth="2" />

          {/* Lines and Points */}
          {data.map((series, seriesIndex) => {
            const points = series.points;
            const color = colors[seriesIndex % colors.length];
            const xStep = (chartWidth - 2 * padding) / (points.length - 1);

            return (
              <g key={`series-${seriesIndex}`}>
                {/* Line */}
                <polyline
                  points={points
                    .map((point, index) => {
                      const x = padding + index * xStep;
                      const y = chartHeight - padding - ((point.value - minValue) / range) * (chartHeight - 2 * padding);
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={`drop-shadow(0 2px 4px ${color}44)`}
                />

                {/* Points */}
                {points.map((point, index) => {
                  const x = padding + index * xStep;
                  const y = chartHeight - padding - ((point.value - minValue) / range) * (chartHeight - 2 * padding);

                  return (
                    <circle
                      key={`point-${seriesIndex}-${index}`}
                      cx={x}
                      cy={y}
                      r="5"
                      fill={color}
                      stroke="white"
                      strokeWidth="2"
                      style={{
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        filter: `drop-shadow(0 2px 4px ${color}44)`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.r.baseVal.value = 7;
                        e.currentTarget.style.filter = `drop-shadow(0 4px 8px ${color}66)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.r.baseVal.value = 5;
                        e.currentTarget.style.filter = `drop-shadow(0 2px 4px ${color}44)`;
                      }}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
