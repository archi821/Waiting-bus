import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Planner: React.FC = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const GOOGLE_MAPS_EMBED_KEY = 'AIzaSyA38eMOv3VuSRdD92BQjjY6JEBnvR1OH0g';

  useEffect(() => {
    const fetchDirections = async () => {
      if (!start || !end) return;
      try {
        const response = await axios.get('/api/directions', {
          params: { start, end },
        });
        const data = response.data;
        const hasDirections = Array.isArray(data?.directions_routes) && data.directions_routes.length > 0;
        const hasFallback = typeof data?.search_metadata?.google_maps_directions_url === 'string';

        if (data.error) {
          setError(data.error);
          setResult(null);
        } else if (hasDirections || hasFallback) {
          setResult(data);
          setError('');
        } else {
          setResult(null);
          setError('');
        }
      } catch (err) {
        setError('無法連線到後端 API，請稍後再試');
        setResult(null);
      }
    };

    fetchDirections();
  }, [start, end]);

  const swapDirection = () => {
    setStart(end);
    setEnd(start);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        🧍‍♂️ 路線規劃
      </h2>

      {/* 搜尋區塊 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="起點（例如：UBC）"
            style={{
              flex: 1,
              padding: '0.5rem',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="終點（例如：Waterfront）"
            style={{
              flex: 1,
              padding: '0.5rem',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
          <button
            onClick={swapDirection}
            title="交換方向"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              position: 'absolute',
              right: '190px',
              top: '23%',
              color: 'white',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            🔄
          </button>
        </div>
      </div>

      {/* 錯誤訊息（僅限 API 錯誤） */}
      {error && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>
      )}

      {/* 路線細節（僅在 directions_routes 有資料時顯示） */}
      {result?.directions_routes?.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          {result.directions_routes.map((route: any, i: number) => (
            <div
              key={i}
              style={{
                marginBottom: '2rem',
                padding: '1rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
            >
              <h3>🕒 預計時間：{route.summary}</h3>
              {route.legs?.[0]?.steps?.map((step: any, j: number) => (
                <div key={j} style={{ marginBottom: '1rem' }}>
                  <p dangerouslySetInnerHTML={{ __html: step.html_instructions }} />
                  {step.transit_details && (
                    <p>
                      🚇 搭乘：<strong>{step.transit_details.line.name}</strong><br />
                      上車站：{step.transit_details.departure_stop.name}<br />
                      下車站：{step.transit_details.arrival_stop.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* 地圖預覽（只要 start 和 end 有值就顯示） */}
      {start && end && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ textAlign: 'center' }}>🗺️ 大眾運輸地圖預覽</h3>
          <iframe
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_EMBED_KEY}&origin=${encodeURIComponent(
              start
            )}&destination=${encodeURIComponent(end)}&mode=transit`}
          />
          {result?.search_metadata?.google_maps_directions_url && (
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              👉 若嵌入地圖無法互動，請點此開啟 Google Maps 完整大眾運輸路線：
              <a
                href={result.search_metadata.google_maps_directions_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007bff', fontWeight: 'bold', marginLeft: '0.5rem' }}
              >
                查看路線
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Planner;
