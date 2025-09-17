import L from 'leaflet';
import type { FerryMarkerProps } from './FerryMarker';

export const ferryIcons = {
  aquabus: new L.Icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAgCAMAAAA7dZg3AAAAJ1BMVEWYW6NHcEyYW6OYW6OYW6OYW6OYW6OYW6OYW6OYW6OYW6OYW6OYW6Nva9TfAAAADXRSTlP/ACVg2ksSe+qVrTXHDJsjjAAAAPFJREFUKJGNk1uSxCAIRQEBUdz/egfR9NN0DT+JdRDvRQREVIpQfIRqLgCxDgPj0VsRKaW23sfoVQM1OEZX8DOBAPUOCfQ7VGH8D5kd0aiUdsr4QFaQOnOdhvuF1k9BlJQVjHijdDxmY9pKQdzZy1cieUcScEYjnXVYru2zG7J18xJ5QLnDj7vY43b2WYmMNur6IuNCKYN1C3tDKX52YdabZT9QJmspvhWORJnS97xwy++0GGhZb64kMyusUWF4QWGZ12Uxr+4+0Xf4L3Qzhs/OH9GPEcWbw1gB6TFuZsa2By7mKF6KxvsQd6cd7lKEEP8AF8YGbzPI9HgAAAAASUVORK5CYII=',
    iconSize: [20, 20],
  }),
  seabus: new L.Icon({
    iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQngkj18C6GY03lUDHxPw1IxGp338yAP_J8BLJYg3eP2Pb8bzSQ-QJj&usqp=CAE&s',
    iconSize: [20, 20],
  }),
  qtoq: new L.Icon({
    iconUrl: 'https://png.pngtree.com/png-clipart/20210307/ourmid/pngtree-alphabet-3d-letter-q-isolated-on-transparent-background-glossy-yellow-color-png-image_3015373.jpg',
    iconSize: [20, 20],
  }),
  bcferry: new L.Icon({
    iconUrl: 'data:image/png;base64,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',
    iconSize: [20, 20],
  }),
};

export const ferryDocks: FerryMarkerProps[] = [
  // SeaBus
  {
    name: 'Waterfront Station SeaBus',
    lat: 49.2871,
    lng: -123.1089,
    type: 'seabus',
    busRoutes: ['2', '3', '4', '7', '8', '10', '44', '50', 'N8', 'R5'],
    link: 'https://www.translink.ca/schedules-and-maps/seabus',
  },
  {
    name: 'Lonsdale Quay SeaBus',
    lat: 49.3102,
    lng: -123.0814,
    type: 'seabus',
    busRoutes: ['228', '229', '230', '231', '236', '249', 'R2'],
    link: 'https://www.translink.ca/schedules-and-maps/seabus',
  },

  // Q to Q Ferry
  {
    name: 'Quayside',
    lat: 49.1995,
    lng: -122.9116,
    type: 'qtoq',
    busRoutes: ['103'],
    link: 'https://www.newwestcity.ca/qtoqferry/articles/7243.php',
  },
  {
    name: 'Queensborough',
    lat: 49.1937,
    lng: -122.9230,
    type: 'qtoq',
    busRoutes: ['104'],
    link: 'https://www.newwestcity.ca/qtoqferry/articles/7243.php',
  },

  // BC Ferries
  {
    name: 'Tsawwassen Terminal',
    lat: 49.0164,
    lng: -123.1156,
    type: 'bcferry',
    busRoutes: ['620'],
    link: 'https://www.bcferries.com/current-conditions/departures',
  },
  {
    name: 'Horseshoe Bay Terminal',
    lat: 49.3750,
    lng: -123.2713,
    type: 'bcferry',
    busRoutes: ['250', '257', '262'],
    link: 'https://www.bcferries.com/current-conditions/departures',
  },

  // Aquabus
  {
    name: 'Granville Island',
    lat: 49.2725,
    lng: -123.1340,
    type: 'aquabus',
    busRoutes: ['23', '50'],
    link: 'https://theaquabus.com/',
  },
  {
    name: 'Science World',
    lat: 49.2734,
    lng: -123.1034,
    type: 'aquabus',
    busRoutes: ['3', '8', '19', '22', 'N8', 'N19'],
    link: 'https://theaquabus.com/',
  },
  {
    name: 'Yaletown',
    lat: 49.2716,
    lng: -123.1189,
    type: 'aquabus',
    busRoutes: ['23'],
    link: 'https://theaquabus.com/',
  },
  {
    name: 'Hornby',
    lat: 49.2745,
    lng: -123.1345,
    type: 'aquabus',
    busRoutes: ['23'],
    link: 'https://theaquabus.com/',
  },
  {
    name: 'David Lam Park',
    lat: 49.2707,
    lng: -123.1259,
    type: 'aquabus',
    busRoutes: ['23'],
    link: 'https://theaquabus.com/',
  },
  {
    name: 'Stamps Landing',
    lat: 49.2694,
    lng: -123.1192,
    type: 'aquabus',
    busRoutes: ['15', '50', '84'],
    link: 'https://theaquabus.com/',
  },
  {
    name: 'Spyglass Place',
    lat: 49.2710,
    lng: -123.1153,
    type: 'aquabus',
    busRoutes: ['15', '50', '84'],
    link: 'https://theaquabus.com/',
  },
  {
    name: 'Plaza of Nations',
    lat: 49.2743,
    lng: -123.1100,
    type: 'aquabus',
    busRoutes: ['23'],
    link: 'https://theaquabus.com/',
  },
  {
    name: 'The Village',
    lat: 49.2725,
    lng: -123.1058,
    type: 'aquabus',
    busRoutes: ['84'],
    link: 'https://theaquabus.com/',
  },
  {
    name: 'Aquatic Centre',
    lat: 49.2768,
    lng: -123.1365,
    type: 'aquabus',
    busRoutes: ['23'],
    link: 'https://granvilleislandferries.bc.ca/',
  },
 {
    name: 'Maritime Museum',
    lat: 49.2785,
    lng: -123.1470,
    type: 'aquabus',
    busRoutes: ['2', 'N22'],
    link: 'https://granvilleislandferries.bc.ca/',
  },
];

