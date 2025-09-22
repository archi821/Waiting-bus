import React, { useEffect, useState, useMemo } from 'react';
import TripCard from '@/components/TripCard';
import { convertTimeBetweenZones, getTripDuration, isNextDay } from '@/utils/tripUtils';
import { getTimeZone } from '@/utils/timezones';

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

  const tripRows = useMemo(() => {
    return trips.map((trip, i) => {
      const ticketInfo = ticketingMap.get(trip.trip_id) || {};
      const originId = ticketInfo.origin_stop_id || '344';
      const destId = ticketInfo.destination_stop_id || '344';
      const trainNumber = ticketInfo.trip_short_name || trip.trip_id;

      const originZone = getTimeZone(originId);
      const destZone = getTimeZone(destId);

      const dep = convertTimeBetweenZones(trip.departure_date, trip.departure_time, originZone, originZone);
      const arr = convertTimeBetweenZones(trip.departure_date, trip.arrival_time, originZone, destZone);
      const duration = getTripDuration(trip.departure_date, trip.departure_time, trip.arrival_time);
      const nextDay = isNextDay(dep.date, arr.date);

      return (
        <TripCard
          key={i}
          trip={trip}
          trainNumber={trainNumber}
          dep={dep}
          arr={arr}
          duration={duration}
          isNextDay={nextDay}
        />
      );
    });
  }, [trips, ticketingMap]);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', backgroundColor: '#f5f5f5' }}>
      <h2 style={{ marginBottom: 16 }}>查詢結果</h2>
      {tripRows}
    </div>
  );
}













