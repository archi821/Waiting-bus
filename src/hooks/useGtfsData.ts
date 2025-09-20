import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export type Stop = { stop_id: string; stop_name: string };
export type StopTime = {
  trip_id: string;
  stop_id: string;
  stop_sequence: string;
  departure_time: string;
  arrival_time: string;
};
export type Trip = { trip_id: string; route_id: string; service_id: string; trip_headsign: string };

export function useGtfsData() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [stopTimes, setStopTimes] = useState<StopTime[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);

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

      const activeStops = parsedStops.data
        .filter(s => s.stop_id && s.stop_name && activeStopIds.has(s.stop_id))
        .sort((a, b) => a.stop_name.localeCompare(b.stop_name));

      setStops(activeStops);
      setStopTimes(parsedStopTimes.data);
      setTrips(parsedTrips.data);
    });
  }, []);

  return { stops, stopTimes, trips };
}
