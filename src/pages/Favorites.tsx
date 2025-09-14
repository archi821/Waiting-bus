import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import stopsRaw from '../data/stops.json';

type Stop = {
  stop_code: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
};

const stops: Stop[] = Array.isArray(stopsRaw)
  ? stopsRaw.map((s: any) => ({
      stop_code: String(s.stop_code).trim(),
      stop_name: String(s.stop_name || '').trim(),
      stop_lat: String(s.stop_lat || '').trim(),
      stop_lon: String(s.stop_lon || '').trim(),
    }))
  : [];

export default function Favorites(): JSX.Element {
  const [inputCode, setInputCode] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();

  const findStopByCode = (code: string): Stop | undefined =>
    stops.find((s) => s.stop_code === code.trim());

  const selectedStop = inputCode.trim() ? findStopByCode(inputCode) : undefined;

  const handleAddFavorite = () => {
    if (inputCode && !favorites.includes(inputCode)) {
      const updated = [...favorites, inputCode];
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
    }
  };

  const handleRemoveFavorite = (code: string) => {
    const updated = favorites.filter((c) => c !== code);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const renderStopCard = (code: string) => {
    const stop = findStopByCode(code);
    return (
      <div key={code} style={styles.card}>
        <div onClick={() => navigate(`/stop/${code}`)} style={{ cursor: 'pointer' }}>
          <div style={styles.stopName}>{stop?.stop_name || '未知站牌'}</div>
          <div style={styles.stopId}>代碼 #{code}</div>
        </div>
        <button style={styles.removeBtn} onClick={() => handleRemoveFavorite(code)}>
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
          placeholder="輸入站牌代碼"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button style={styles.lookupBtn} onClick={() => {}}>
          查詢
        </button>
      </div>

      {selectedStop && (
        <div style={styles.resultBox}>
          <div style={styles.resultName}>{selectedStop.stop_name}</div>
          <div style={styles.resultId}>代碼 #{selectedStop.stop_code}</div>
          {favorites.includes(selectedStop.stop_code) ? (
            <button style={styles.removeBtn} onClick={() => handleRemoveFavorite(selectedStop.stop_code)}>
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
