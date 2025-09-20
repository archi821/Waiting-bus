import React from 'react';

interface Props {
  history: string[];
}

export default function HistoryList({ history }: Props) {
  return (
    <div style={{ position: 'fixed', bottom: '1rem', left: '1rem' }}>
      <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>歷史紀錄</h4>
      <ul style={{ paddingLeft: '1rem', margin: 0 }}>
        {history.map((h, i) => (
          <li
            key={i}
            style={{
              fontSize: '0.9rem',
              color: '#666',
              cursor: 'pointer',
              userSelect: 'none',
              marginBottom: '0.25rem',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#333'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
          >
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}


