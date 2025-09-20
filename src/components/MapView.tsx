import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Stop = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

export interface MapViewProps {
  userLocation: [number, number];
  stops: Stop[];
}

export default function MapView({ userLocation, stops }: MapViewProps) {
  const stopIcon = L.icon({
    iconUrl: '/marker-icon.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const [lat, lng] = userLocation;

  return (
    <MapContainer center={[lat, lng]} zoom={15} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {/* 使用者定位：紅色小圓點 */}
      <Circle
        center={{ lat, lng }}
        radius={5}
        pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 1 }}
      />

      {/* 顯示站牌 */}
      {stops.map((stop) => (
        <Marker
          key={stop.id}
          position={[stop.lat, stop.lng]}
          icon={stopIcon}
        >
          <Popup>{stop.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}



