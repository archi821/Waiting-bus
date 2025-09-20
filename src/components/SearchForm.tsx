import React from 'react';
import { Stop } from '../types/types';

interface Props {
  stops: Stop[];
  departure: string;
  arrival: string;
  dateTime: string;
  scheduleType: string;
  setDeparture: (value: string) => void;
  setArrival: (value: string) => void;
  setDateTime: (value: string) => void;
  setScheduleType: (value: string) => void;
  onSearch: () => void;
  swapStops: () => void;
}

export default function SearchForm({
  stops,
  departure,
  arrival,
  dateTime,
  scheduleType,
  setDeparture,
  setArrival,
  setDateTime,
  setScheduleType,
  onSearch,
  swapStops
}: Props) {
  const isSearchEnabled = departure !== '' && arrival !== '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <select value={departure} onChange={e => setDeparture(e.target.value)}>
        <option value="">請選擇出發地</option>
        {stops.map(s => (
          <option key={s.stop_id} value={s.stop_name}>{s.stop_name}</option>
        ))}
      </select>

      <button onClick={swapStops}>🔃 交換</button>

      <select value={arrival} onChange={e => setArrival(e.target.value)}>
        <option value="">請選擇抵達地</option>
        {stops.map(s => (
          <option key={s.stop_id} value={s.stop_name}>{s.stop_name}</option>
        ))}
      </select>

      <input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} />

      <select value={scheduleType} onChange={e => setScheduleType(e.target.value)}>
        <option value="departure">出發時間</option>
        <option value="arrival">抵達時間</option>
      </select>

      <button onClick={onSearch} disabled={!isSearchEnabled}>查詢</button>
    </div>
  );
}

