import { useParams, Link } from 'react-router-dom';
// @ts-ignore
import stopsRaw from '../data/stops.json';

export default function StopDetail() {
  const { stopId } = useParams();
  const normalizedCode = String(stopId).trim();

  const stops = Array.isArray(stopsRaw)
    ? stopsRaw.map((s: any) => ({
        stop_code: String(s.stop_code).trim(),
        stop_name: String(s.stop_name || '').trim(),
        stop_lat: String(s.stop_lat || '').trim(),
        stop_lon: String(s.stop_lon || '').trim(),
      }))
    : [];

  const stop = stops.find((s) => s.stop_code === normalizedCode);

  if (!stop) {
    return (
      <div style={{ padding: 32 }}>
        <div style={{ color: '#c00', marginBottom: 16 }}>
          ❌ 找不到此站牌（代碼: {normalizedCode}）
        </div>
        <div>
          🔍 以下是所有站牌，你可以點選測試：
          <ul style={{ marginTop: 12 }}>
            {stops.map((s) => (
              <li key={s.stop_code}>
                <Link to={`/stop/${s.stop_code}`} style={{ color: '#2D0AFF' }}>
                  {s.stop_name || '（無名稱）'} — {s.stop_code}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>🚏 站牌詳細資訊</h2>
      <div>名稱：{stop.stop_name}</div>
      <div>代碼：{stop.stop_code}</div>
      <div>座標：{stop.stop_lat}, {stop.stop_lon}</div>
    </div>
  );
}


