import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Favorites(): JSX.Element {
  const [inputId, setInputId] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedStopName, setSelectedStopName] = useState<string | null>(null);
  const navigate = useNavigate();

  const mockStopLookup = (stopId: string): string | null => {
    const mockData: Record<string, string> = {
      '52284': 'Southbound Cariboo Rd @ 16 Ave',
      '52262': 'Cariboo Rd at 7600 Block',
      '58438': 'Lougheed Stn at Bay 4',
    };
    return mockData[stopId] || null;
  };

  const handleLookup = () => {
    const name = mockStopLookup(inputId.trim());
    setSelectedStopName(name);
  };

  const handleAddFavorite = () => {
    if (inputId && !favorites.includes(inputId)) {
      setFavorites([...favorites, inputId]);
    }
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter((stopId) => stopId !== id));
  };

  const renderStopCard = (stopId: string) => {
    const name = mockStopLookup(stopId);
    return (
      <div key={stopId} style={styles.card}>
        <div onClick={() => navigate(`/stop/${stopId}`)} style={{ cursor: 'pointer' }}>
          <div style={styles.stopName}>{name || '未知站牌'}</div>
          <div style={styles.stopId}>Stop #{stopId}</div>
        </div>
        <button style={styles.removeBtn} onClick={() => handleRemoveFavorite(stopId)}>
          🗑️
        </button>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⭐ 我的收藏站牌</h2>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          placeholder="輸入站牌號碼"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <button style={styles.lookupBtn} onClick={handleLookup}>
          查詢
        </button>
      </div>

      {selectedStopName && (
        <div style={styles.resultBox}>
          <div style={styles.resultName}>{selectedStopName}</div>
          <div style={styles.resultId}>Stop #{inputId}</div>
          {favorites.includes(inputId) ? (
            <button style={styles.removeBtn} onClick={() => handleRemoveFavorite(inputId)}>
              🗑️ 移除
            </button>
          ) : (
            <button style={styles.favoriteBtn} onClick={handleAddFavorite}>
              ⭐ 收藏
            </button>
          )}
        </div>
      )}

      {favorites.length === 0 ? (
        <div style={styles.empty}>尚未收藏任何站牌</div>
      ) : (
        favorites.map(renderStopCard)
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: 16, backgroundColor: '#fff', minHeight: '100vh' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  inputRow: { display: 'flex', gap: 8, marginBottom: 12 },
  input: {
    flex: 1,
    border: '1px solid #ccc',
    padding: '6px 8px',
    borderRadius: 4,
    fontSize: 14,
  },
  lookupBtn: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
  },
  resultBox: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    marginBottom: 12,
  },
  resultName: { fontSize: 15, fontWeight: 600 },
  resultId: { fontSize: 13, color: '#666', marginBottom: 6 },
  favoriteBtn: {
    backgroundColor: '#FFD700',
    padding: '4px 10px',
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
  },
  removeBtn: {
    backgroundColor: '#E53935',
    color: '#fff',
    padding: '4px 10px',
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    marginTop: 4,
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    border: '1px solid #ddd',
  },
  stopName: { fontSize: 14, fontWeight: 500 },
  stopId: { fontSize: 12, color: '#666' },
  empty: { textAlign: 'center', marginTop: 20, color: '#999' },
};
