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

        // 如果你已經在 MapView 裡畫所有站牌，這段可以省略
        // setStops([...]); ← 這裡可以接真實資料或留空
      },
      () => setError('無法取得你的位置'),
      { enableHighAccuracy: true }
    );
  }, []);

  if (error) return <p style={{ padding: '1rem', color: 'red' }}>{error}</p>;
  if (!userLocation) return <p style={{ padding: '1rem' }}>正在取得你的位置…</p>;

  return <MapView userLocation={userLocation} stops={stops} />;
}






