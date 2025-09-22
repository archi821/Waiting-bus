import React from 'react';
import { styles } from '@/styles/tripStyles';

type Props = {
  trip: {
    departure_stop_name: string;
    arrival_stop_name: string;
    economy_price: string;
    sleeper_price: string;
  };
  trainNumber: string;
  dep: { time: string; date: string };
  arr: { time: string; date: string };
  duration: { hours: number; minutes: number };
  isNextDay: boolean;
};

export default function TripCard({ trip, trainNumber, dep, arr, duration, isNextDay }: Props) {
  return (
    <div style={styles.tripRow}>
      <div style={styles.leftCard}>
        <div style={styles.topRow}>
          <div style={styles.trainNumber}>#{trainNumber}</div>
          <div style={styles.arrivalDate}>
            <div>抵達</div>
            <div>{arr.date}</div>
          </div>
        </div>
        <div style={styles.leftContent}>
          <div style={styles.columnLeft}>
            <div style={styles.place}>{trip.departure_stop_name}</div>
            <div style={styles.time}>{dep.time}</div>
          </div>
          <div style={styles.columnCenter}>
            <div style={{ fontSize: 24 }}>⟶</div>
            <div style={{ fontSize: 14 }}>
              約 {duration.hours} 小時 {duration.minutes > 0 ? `${duration.minutes} 分` : ''}
            </div>
          </div>
          <div style={styles.columnRight}>
            <div style={styles.place}>{trip.arrival_stop_name}</div>
            <div style={styles.time}>
              {arr.time}
              {isNextDay && <span style={{ fontSize: 12, color: '#888' }}>（+1 日）</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.priceCard}>
        <div style={styles.priceHeader}>經濟艙</div>
        <div style={styles.priceBody}>{trip.economy_price}</div>
      </div>

      <div style={styles.priceCard}>
        <div style={styles.priceHeader}>臥鋪</div>
        <div style={styles.priceBody}>{trip.sleeper_price}</div>
      </div>
    </div>
  );
}












