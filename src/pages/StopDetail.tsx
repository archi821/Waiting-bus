import React from 'react';
import { useParams } from 'react-router-dom';

const mockStopLookup = (stopId: string): string | null => {
  const mockData: Record<string, string> = {
    '52284': 'Southbound Cariboo Rd @ 16 Ave',
    '52262': 'Cariboo Rd at 7600 Block',
    '58438': 'Lougheed Stn at Bay 4',
  };
  return mockData[stopId] || null;
};

export default function StopDetail(): JSX.Element {
  const { stopId } = useParams<{ stopId: string }>();
  const stopName = stopId ? mockStopLookup(stopId) : null;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🚏 站牌詳細資訊</h2>
      {stopName ? (
        <>
          <div style={styles.name}>{stopName}</div>
          <div style={styles.id}>Stop ID: {stopId}</div>

          {/* 預留地圖區塊 */}
          <div style={styles.mapPlaceholder}>🗺️ 地圖定位（尚未實作）</div>

          {/* 預留路線列表 */}
          <div style={styles.routesPlaceholder}>🚌 經過路線（尚未載入）</div>
        </>
      ) : (
        <div style={styles.notFound}>找不到此站牌</div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  name: { fontSize: 16, marginBottom: 4 },
  id: { fontSize: 14, color: '#666', marginBottom: 12 },
  mapPlaceholder: {
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 6,
    marginBottom: 12,
    textAlign: 'center',
    color: '#999',
  },
  routesPlaceholder: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 6,
    textAlign: 'center',
    color: '#999',
  },
  notFound: { fontSize: 16, color: '#c00' },
};
