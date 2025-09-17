import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import FerryMarker from '../components/FerryMarker';
import { ferryDocks } from '../components/ferryData';

const SeabusMap = () => {
  return (
    <MapContainer center={[49.2827, -123.1207]} zoom={12} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {ferryDocks.map((dock, idx) => (
        <FerryMarker key={idx} {...dock} />
      ))}
    </MapContainer>
  );
};

export default SeabusMap;
