import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

type Stop = { stop_id: string; stop_name: string };
type StopTime = {
  trip_id: string;
  stop_id: string;
  stop_sequence: string;
  departure_time: string;
  arrival_time: string;
};
type Trip = { trip_id: string; route_id: string; service_id: string; trip_headsign: string };

export default function Train() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [stopTimes, setStopTimes] = useState<StopTime[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);

  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [scheduleType, setScheduleType] = useState('departure');
  const [results, setResults] = useState<
    { trip_id: string; departure_time: string; arrival_time: string }[]
  >([]);
  const [history, setHistory] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/viatrain_gtfs/stops.txt').then(res => res.text()),
      fetch('/viatrain_gtfs/stop_times.txt').then(res => res.text()),
      fetch('/viatrain_gtfs/trips.txt').then(res => res.text())
    ]).then(([stopsText, stopTimesText, tripsText]) => {
      const parsedStops = Papa.parse<Stop>(stopsText, { header: true });
      const parsedStopTimes = Papa.parse<StopTime>(stopTimesText, { header: true });
      const parsedTrips = Papa.parse<Trip>(tripsText, { header: true });

      const activeStopIds = new Set(
        parsedStopTimes.data.map(st => st.stop_id).filter(Boolean)
      );

      const activeStops = parsedStops.data.filter(
        s => s.stop_id && s.stop_name && activeStopIds.has(s.stop_id)
      );

      setStops(activeStops);
      setStopTimes(parsedStopTimes.data);
      setTrips(parsedTrips.data);
    });
  }, []);

  const swapStops = () => {
    setDeparture(arrival);
    setArrival(departure);
  };

  const isSearchEnabled = departure !== '' && arrival !== '';

  const handleSearch = () => {
    const departureStopId = stops.find(s => s.stop_name === departure)?.stop_id;
    const arrivalStopId = stops.find(s => s.stop_name === arrival)?.stop_id;

    const filtered = trips
      .map((trip) => {
        const stopsInTrip = stopTimes.filter(st => st.trip_id === trip.trip_id);
        const departureStop = stopsInTrip.find(st => st.stop_id === departureStopId);
        const arrivalStop = stopsInTrip.find(st => st.stop_id === arrivalStopId);

        if (!departureStop || !arrivalStop) return null;
        if (parseInt(departureStop.stop_sequence) >= parseInt(arrivalStop.stop_sequence)) return null;

        return {
          trip_id: trip.trip_id,
          departure_time: departureStop.departure_time,
          arrival_time: arrivalStop.arrival_time,
        };
      })
      .filter(Boolean) as { trip_id: string; departure_time: string; arrival_time: string }[];

    setResults(filtered);
    setHasSearched(true);

    const record = `${departure} → ${arrival}（${filtered.length} 筆結果）`;
    setHistory(prev => [record, ...prev]);
  };

  const clearHistory = () => {
    setHistory([]);
  };
  
  return (
  <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh', position: 'relative' }}>
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

    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '2rem',
    }}>
      {/* 出發欄位 */}
      <div style={{ width: '60%', marginBottom: '1rem' }}>
        <label style={{ marginBottom: '0.5rem', display: 'block' }}>出發</label>
        <select
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          style={{
            width: '100%',
            borderRadius: '999px',
            padding: '0.5rem 1rem',
            border: '1px solid #ccc',
          }}
        >
          <option value="">請選擇出發地</option>
          {stops.map((stop) => (
            <option key={stop.stop_id} value={stop.stop_name}>{stop.stop_name}</option>
          ))}
        </select>
      </div>

      {/* 交換按鈕 */}
      <div
        onClick={swapStops}
        style={{
          backgroundColor: '#eee',
          borderRadius: '50%',
          position: 'absolute',
          right: '205px',
          width: '27px',
          height: '27px',
          top: '38%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          marginTop: '-16px',
          marginBottom: '1rem',
        }}
      >
        🔃
      </div>

      {/* 到達欄位 */}
      <div style={{ width: '60%', marginBottom: '1rem' }}>
        <label style={{ marginBottom: '0.5rem', display: 'block' }}>到達</label>
        <select
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          style={{
            width: '100%',
            borderRadius: '999px',
            padding: '0.5rem 1rem',
            border: '1px solid #ccc',
          }}
        >
          <option value="">請選擇抵達地</option>
          {stops.map((stop) => (
            <option key={stop.stop_id} value={stop.stop_name}>{stop.stop_name}</option>
          ))}
        </select>
      </div>

      {/* 時間欄位 */}
      <div style={{ width: '60%', marginBottom: '1rem' }}>
        <label style={{ marginBottom: '0.5rem', display: 'block' }}>時間</label>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          style={{
            width: '100%',
            borderRadius: '999px',
            padding: '0.5rem 1rem',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
            fontSize: '1rem',
          }}
        />
      </div>

      {/* 設定欄位 */}
      <div style={{ width: '60%', marginBottom: '1rem' }}>
        <label style={{ marginBottom: '0.5rem', display: 'block' }}>設定</label>
        <select
          value={scheduleType}
          onChange={(e) => setScheduleType(e.target.value)}
          style={{
            width: '100%',
            borderRadius: '999px',
            padding: '0.5rem 1rem',
            border: '1px solid #ccc',
          }}
        >
          <option value="departure">出發時間</option>
          <option value="arrival">抵達時間</option>
        </select>
      </div>

      {/* 查詢按鈕 */}
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

      {/* 查詢結果（查詢後才顯示） */}
      {hasSearched && (
        <div style={{ width: '60%', marginTop: '2rem' }}>
          <h3>查詢結果</h3>
          {results.length === 0 ? (
            <p>無符合班次</p>
          ) : (
            <ul>
              {results.map((r, i) => (
                <li key={i}>
                  車次 {r.trip_id}：{r.departure_time} → {r.arrival_time}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>

    {/* 左下：歷史紀錄（永遠顯示） */}
<div style={{
  position: 'fixed',
  bottom: '1rem',
  left: '1rem',
}}>
  <h4 style={{ marginBottom: '0.5rem' }}>歷史紀錄</h4>
  <ul style={{ paddingLeft: '1rem', margin: 0 }}>
    {history.map((h, i) => (
      <li key={i} style={{ marginBottom: '0.25rem' }}>{h}</li>
    ))}
  </ul>
</div>

    {/* 右下：清除歷史紀錄（外觀純文字，功能正常） */}
    <div
      onClick={clearHistory}
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        color: '#888',
        fontSize: '0.9rem',
        userSelect: 'none',
      }}
    >
      🗑 清除歷史紀錄
    </div>
  </div>
);}


