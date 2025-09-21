import React, { useEffect, useState } from 'react';

type Result = {
  trip_id: string;
  departure_time: string;
  arrival_time: string;
  departure_stop_name: string;
  arrival_stop_name: string;
  economy_price: string;
  sleeper_price: string;
  departure_date: string;
};

export default function TripDetail() {
  const [trips, setTrips] = useState<Result[]>([]);
  const [ticketingMap, setTicketingMap] = useState<Map<string, any>>(new Map());

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

    fetch('/viatrain_gtfs/ticketing_identifiers.txt')
      .then(res => res.text())
      .then(text => {
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',');
        const map = new Map<string, any>();
        lines.slice(1).forEach(line => {
          const values = line.split(',');
          const row: any = {};
          headers.forEach((h, i) => row[h] = values[i]);
          if (row.trip_id) map.set(row.trip_id, row);
        });
        setTicketingMap(map);
      });
  }, []);

  const formatTime24 = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    const hour = h % 24;
    return `${hour.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const formatArrivalDate = (depDate: string, arrTime: string) => {
    const [ah] = arrTime.split(':').map(Number);
    const base = new Date(depDate);
    const extraDays = Math.floor(ah / 24);
    base.setDate(base.getDate() + extraDays);
    return `${base.getMonth() + 1}/${base.getDate()}`;
  };

  const computeDuration = (dep: string, arr: string) => {
    const [dh, dm] = dep.split(':').map(Number);
    const [ah, am] = arr.split(':').map(Number);
    let depMin = dh * 60 + dm;
    let arrMin = ah * 60 + am;
    if (arrMin < depMin) arrMin += 1440;
    const dur = arrMin - depMin;
    const h = Math.floor(dur / 60);
    const m = dur % 60;
    return `${h} 小時 ${m} 分`;
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', backgroundColor: '#f5f5f5' }}>
      <h2 style={{ marginBottom: 16 }}>查詢結果</h2>

      {trips.map((trip, i) => {
        const duration = computeDuration(trip.departure_time, trip.arrival_time);
        const ticketInfo = ticketingMap.get(trip.trip_id);
        const trainNumber = ticketInfo?.trip_short_name || trip.trip_id;
        const [ah] = trip.arrival_time.split(':').map(Number);
        const arrivesNextDay = ah >= 24;
        const arrivalDate = formatArrivalDate(trip.departure_date, trip.arrival_time);

        return (
          <div key={i} style={styles.tripRow}>
            {/* 左卡片 */}
            <div style={styles.leftCard}>
              <div style={styles.topRow}>
                <div style={styles.trainNumber}>#{trainNumber}</div>
                {arrivesNextDay && (
                  <div style={styles.arrivalDate}>
                    <div>抵達</div> 
                    <div>{arrivalDate}</div>
                 </div>       
                )}
              </div>
              <div style={styles.leftContent}>
                {/* 出發地 + 時間 */}
                <div style={styles.columnLeft}>
                  <div style={styles.place}>{trip.departure_stop_name}</div>
                  <div style={styles.time}>{formatTime24(trip.departure_time)}</div>
                </div>

                {/* 箭頭 + 行車時間 */}
                <div style={styles.columnCenter}>
                  <div style={{ fontSize: 24 }}>⟶</div>
                  <div style={{ fontSize: 14 }}>{duration}</div>
                </div>

                {/* 抵達地 + 時間 */}
                <div style={styles.columnRight}>
                  <div style={styles.place}>{trip.arrival_stop_name}</div>
                  <div style={styles.time}>{formatTime24(trip.arrival_time)}</div>
                </div>
              </div>
            </div>

            {/* 中卡片 */}
            <div style={styles.priceCard}>
              <div style={styles.priceHeader}>經濟艙</div>
              <div style={styles.priceBody}>{trip.economy_price}</div>
            </div>

            {/* 右卡片 */}
            <div style={styles.priceCard}>
              <div style={styles.priceHeader}>臥鋪</div>
              <div style={styles.priceBody}>{trip.sleeper_price}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  tripRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    alignItems: 'stretch',
  },
  leftCard: {
    flex: '1 1 60%',
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  trainNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  arrivalDate: {
    fontSize: 13,
    color: '#444',
    fontWeight: 'bold',
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    lineHeight: 1.4,
  },
  leftContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  columnLeft: {
    textAlign: 'right',
    flex: '0 0 33%',
  },
  columnCenter: {
    textAlign: 'center',
    flex: '0 0 34%',
  },
  columnRight: {
    textAlign: 'left',
    flex: '0 0 33%',
  },
  place: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 4,
  },
  priceCard: {
    flex: '0 0 120px',
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  priceHeader: {
    backgroundColor: '#000',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    padding: '12px 8px',
    textAlign: 'center',
  },
  priceBody: {
    backgroundColor: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    padding: '16px 8px',
    textAlign: 'center',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};





