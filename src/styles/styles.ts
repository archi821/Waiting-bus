import { CSSProperties } from 'react';

export const selectStyle: CSSProperties = {
  width: '100%',
  borderRadius: '999px',
  padding: '0.5rem 1rem',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

export const inputStyle: CSSProperties = {
  width: '100%',
  borderRadius: '999px',
  padding: '0.5rem 1rem',
  border: '1px solid #ccc',
  fontSize: '1rem',
  boxSizing: 'border-box',
};

export const buttonStyle: (enabled: boolean) => CSSProperties = (enabled) => ({
  padding: '0.75rem 1.5rem',
  backgroundColor: enabled ? '#FFCC00' : '#ccc',
  color: 'white',
  border: 'none',
  borderRadius: '999px',
  fontSize: '1rem',
  cursor: enabled ? 'pointer' : 'not-allowed',
});

export const cornerBoxStyle: CSSProperties = {
  backgroundColor: 'white',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  fontSize: '0.9rem',
};
