import React, { useEffect, useState } from 'react';

type Trip = {
  trip_id: string;
  departure_time: string;
  arrival_time: string;
  departure_stop_name: string;
  arrival_stop_name: string;
  economy_price: string;
  sleeper_price: string;
};

export default function TripDetail() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('tripResults');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTrips(Array.isArray(parsed) ? parsed : []);
      } catch {
        setTrips([]);
      }
    }
  }, []);

  if (!trips.length) {
    return <p style={{ padding: '2rem' }}>⚠️ 沒有查詢結果。</p>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>查詢結果</h2>
      {trips.map((trip, i) => {
        const duration = computeDuration(trip.departure_time, trip.arrival_time);
        const arrivesNextDay = isNextDay(trip.departure_time, trip.arrival_time);

        return (
          <div key={i} style={styles.card}>
            <div><strong>車次：</strong>#{trip.trip_id}</div>
            <div><strong>出發：</strong>{trip.departure_stop_name}（{formatTime(trip.departure_time)}）</div>
            <div><strong>抵達：</strong>{trip.arrival_stop_name}（{formatTime(trip.arrival_time)}）{arrivesNextDay && '（隔日）'}</div>
            <div><strong>行程時間：</strong>{duration}</div>
            <div><strong>票價：</strong>經濟艙 {trip.economy_price}，臥鋪艙 {trip.sleeper_price}</div>
          </div>
        );
      })}
      <button onClick={() => window.history.back()} style={styles.backButton}>
        ← 返回查詢
      </button>
    </div>
  );
}

function computeDuration(start: string, end: string): string {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let totalStart = sh * 60 + sm;
  let totalEnd = eh * 60 + em;
  if (totalEnd < totalStart) totalEnd += 1440;
  const diff = totalEnd - totalStart;
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  return `${hours} 小時 ${minutes} 分`;
}

function isNextDay(start: string, end: string): boolean {
  const [sh] = start.split(':').map(Number);
  const [eh] = end.split(':').map(Number);
  return eh < sh;
}

function formatTime(raw: string): string {
  const [h, m] = raw.split(':').map(Number);
  const day = Math.floor(h / 24);
  const hour = h % 24;
  return `${day > 0 ? `第 ${day} 天 ` : ''}${String(hour).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

const styles = {
  card: {
    marginBottom: '1rem',
    padding: '1rem',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  backButton: {
    marginTop: '2rem',
    padding: '0.5rem 1rem',
    background: '#FFCC00',
    border: 'none',
    borderRadius: '999px',
    color: 'white',
    cursor: 'pointer',
  },
};




