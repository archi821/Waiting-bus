import { useEffect, useState } from 'react';
import MapView from '../components/MapView';

type Stop = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

export default function NearbyPage() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [stops, setStops] = useState<Stop[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);

        const mockStops: Stop[] = [
          { id: '1', name: 'Kingsway & Edmonds', lat: latitude + 0.001, lng: longitude + 0.001 },
          { id: '2', name: 'Nelson & Imperial', lat: latitude - 0.0015, lng: longitude - 0.001 },
        ];
        setStops(mockStops);
      },
      () => setError('無法取得你的位置'),
      { enableHighAccuracy: true }
    );
  }, []);

  if (error) return <p style={{ padding: '1rem', color: 'red' }}>{error}</p>;
  if (!userLocation) return <p style={{ padding: '1rem' }}>正在取得你的位置…</p>;

  return <MapView userLocation={userLocation} stops={stops} />;
}

