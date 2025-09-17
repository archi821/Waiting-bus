import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { ferryIcons } from './ferryData';

export type FerryMarkerProps = {
  name: string;
  lat: number;
  lng: number;
  type: 'seabus' | 'qtoq' | 'bcferry' | 'aquabus';
  link: string;
};

const FerryMarker = ({ name, lat, lng, type, link }: FerryMarkerProps) => {
  return (
    <Marker position={[lat, lng]} icon={ferryIcons[type]}>
      <Popup>
        <strong>{name}</strong><br />
        類型：{type.toUpperCase()}<br />
        <a href={link} target="_blank" rel="noopener noreferrer">查看班次</a>
      </Popup>
    </Marker>
  );
};

export default FerryMarker;

