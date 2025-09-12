import React, { useState, useEffect } from 'react';
const Train: React.FC = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [scheduleType, setScheduleType] = useState<'departure' | 'arrival'>('departure');
  const [results, setResults] = useState<string[]>([]);

  const stops = ['Vancouver', '八堵', '七堵', '松山', '台北', '板橋'];

  const isSearchEnabled = departure !== '' && arrival !== '' && dateTime !== '';

  const handleSearch = () => {
    if (!isSearchEnabled) return;
    setResults([
      `車次 2025：${departure} → ${arrival}｜出發 14:37｜抵達 15:20`,
      `車次 2033：${departure} → ${arrival}｜出發 15:10｜抵達 15:55`,
    ]);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* 橫幅置中 */}
      <header style={{
        backgroundColor: '#FFCC00',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>VIA Rail Canada🍁</h1>
      </header>

      {/* 主體內容 */}
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2rem',
      }}>
        <label style={{ marginBottom: '0.5rem' }}>出發</label>
        <select value={departure} onChange={(e) => setDeparture(e.target.value)} style={{ width: '60%', marginBottom: '1rem' }}>
          <option value="">請選擇出發地</option>
          {stops.map((stop, i) => (
            <option key={i} value={stop}>{stop}</option>
          ))}
        </select>

        <label style={{ marginBottom: '0.5rem' }}>到達</label>
        <select value={arrival} onChange={(e) => setArrival(e.target.value)} style={{ width: '60%', marginBottom: '1rem' }}>
          <option value="">請選擇抵達地</option>
          {stops.map((stop, i) => (
            <option key={i} value={stop}>{stop}</option>
          ))}
        </select>

        <label style={{ marginBottom: '0.5rem' }}>時間</label>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          style={{ width: '60%', marginBottom: '1rem' }}
        />

        <label style={{ marginBottom: '0.5rem' }}>設定</label>
        <select value={scheduleType} onChange={(e) => setScheduleType(e.target.value as any)} style={{ width: '60%', marginBottom: '1rem' }}>
          <option value="departure">出發時間</option>
          <option value="arrival">抵達時間</option>
        </select>

        <button
          onClick={handleSearch}
          disabled={!isSearchEnabled}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: isSearchEnabled ? '#FFCC00' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isSearchEnabled ? 'pointer' : 'not-allowed',
          }}
        >
          查詢時刻
        </button>

        {/* 查詢結果 */}
        <div style={{ marginTop: '2rem', width: '80%', textAlign: 'center' }}>
          {results.length > 0 ? (
            <ul>
              {results.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#666' }}>尚未查詢或無符合班次。</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Train;
