import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { selectStyle, inputStyle, buttonStyle } from '../styles/styles';
import HistoryList from '../components/HistoryList';
import ClearHistoryButton from '../components/ClearHistoryButton';

type Stop = { stop_id: string; stop_name: string };
type StopTime = {
  trip_id: string;
  stop_id: string;
  stop_sequence: string;
  departure_time: string;
  arrival_time: string;
};
type Trip = { trip_id: string; route_id: string; service_id: string; trip_headsign: string };
type Result = {
  trip_id: string;
  departure_time: string;
  arrival_time: string;
  departure_stop_name: string;
  arrival_stop_name: string;
  economy_price: string;
  sleeper_price: string;
};

export default function Train() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [stopTimes, setStopTimes] = useState<StopTime[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [scheduleType, setScheduleType] = useState<'departure' | 'arrival'>('departure');
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/viatrain_gtfs/stops.txt').then(res => res.text()),
      fetch('/viatrain_gtfs/stop_times.txt').then(res => res.text()),
      fetch('/viatrain_gtfs/trips.txt').then(res => res.text())
    ]).then(([stopsText, stopTimesText, tripsText]) => {
      const parsedStops = Papa.parse<Stop>(stopsText, { header: true });
      const parsedStopTimes = Papa.parse<StopTime>(stopTimesText, { header: true });
      const parsedTrips = Papa.parse<Trip>(tripsText, { header: true });

      const activeStopIds = new Set(parsedStopTimes.data.map(st => st.stop_id).filter(Boolean));
      const activeStops = parsedStops.data
        .filter(s => s.stop_id && s.stop_name && activeStopIds.has(s.stop_id))
        .sort((a, b) => a.stop_name.localeCompare(b.stop_name));

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
    if (!departureStopId || !arrivalStopId) return;

    const selectedMinutes = dateTime
      ? (() => {
          const dt = new Date(dateTime);
          return dt.getHours() * 60 + dt.getMinutes();
        })()
      : null;

    const filtered: Result[] = trips
      .map((trip) => {
        const stopsInTrip = stopTimes.filter(st => st.trip_id === trip.trip_id);
        const departureStop = stopsInTrip.find(st => st.stop_id === departureStopId);
        const arrivalStop = stopsInTrip.find(st => st.stop_id === arrivalStopId);

        if (!departureStop || !arrivalStop) return null;
        if (parseInt(departureStop.stop_sequence) >= parseInt(arrivalStop.stop_sequence)) return null;

        const timeToCompare = scheduleType === 'departure'
          ? departureStop.departure_time
          : arrivalStop.arrival_time;

        const [hh, mm] = timeToCompare.split(':').map(Number);
        let totalMinutes = hh * 60 + mm;
        if (hh >= 24) totalMinutes += 1440;

        if (selectedMinutes !== null && totalMinutes < selectedMinutes) return null;

        return {
          trip_id: trip.trip_id,
          departure_time: departureStop.departure_time,
          arrival_time: arrivalStop.arrival_time,
          departure_stop_name: departure,
          arrival_stop_name: arrival,
          economy_price: '$288 起',
          sleeper_price: '$1315 起'
        };
      })
      .filter((r): r is Result => r !== null);

    const record = `${departure} → ${arrival}（${filtered.length} 筆結果）`;
    setHistory(prev => [record, ...prev]);

    localStorage.setItem('tripResults', JSON.stringify(filtered));
    window.location.href = '/trip-detail';
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh', position: 'relative' }}>
      <header style={{ backgroundColor: '#FFCC00', padding: '1rem', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>VIA Rail Canada 🍁</h1>
      </header>

      <main style={{
        maxWidth: '600px',
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}>
        <div>
          <label style={{ marginBottom: '0.5rem', display: 'block' }}>出發</label>
          <select value={departure} onChange={e => setDeparture(e.target.value)} style={selectStyle}>
            <option value="">請選擇出發地</option>
            {stops.map(s => (
              <option key={s.stop_id} value={s.stop_name}>{s.stop_name}</option>
            ))}
          </select>
        </div>

        <div style={{ position: 'relative' }}>
          <label style={{ marginBottom: '0.5rem', display: 'block' }}>到達</label>
          <select value={arrival} onChange={e => setArrival(e.target.value)} style={selectStyle}>
            <option value="">請選擇抵達地</option>
            {stops.map(s => (
              <option key={s.stop_id} value={s.stop_name}>{s.stop_name}</option>
            ))}
          </select>
          <div
            onClick={swapStops}
            style={{
              position: 'absolute',
              top: '10%',
              right: '0.5rem',
              transform: 'translateY(-50%)',
              backgroundColor: '#eee',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              cursor: 'pointer',
            }}
          >
            🔃
          </div>
        </div>

        <div>
          <label style={{ marginBottom: '0.5rem', display: 'block' }}>時間</label>
          <input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={{ marginBottom: '0.5rem', display: 'block' }}>設定</label>
          <select value={scheduleType} onChange={e => setScheduleType(e.target.value as 'departure' | 'arrival')} style={selectStyle}>
            <option value="departure">出發時間</option>
            <option value="arrival">抵達時間</option>
          </select>
        </div>

        <button onClick={handleSearch} disabled={!isSearchEnabled} style={buttonStyle(isSearchEnabled)}>
          查詢時刻
        </button>
      </main>

      <HistoryList history={history} />
      <ClearHistoryButton onClear={clearHistory} />
    </div>
  );
}
