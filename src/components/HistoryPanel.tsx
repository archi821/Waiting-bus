import React from 'react';

interface Props {
  history: string[];
  onClear: () => void;
}

export default function HistoryPanel({ history, onClear }: Props) {
  return (
    <div style={{ position: 'fixed', bottom: '1rem', left: '1rem' }}>
      <h4>歷史紀錄</h4>
      <ul>
        {history.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
      <div
        onClick={onClear}
        style={{ color: '#888', cursor: 'pointer', marginTop: '0.5rem' }}
      >
        🗑 清除
      </div>
    </div>
  );
}


