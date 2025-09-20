import React from 'react';

interface Props {
  onClear: () => void;
}

export default function ClearHistoryButton({ onClear }: Props) {
  return (
    <div
      onClick={onClear}
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        fontSize: '0.9rem',
        color: '#666',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
    >
      🗑 清除歷史紀錄
    </div>
  );
}


