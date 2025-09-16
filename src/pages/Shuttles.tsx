import React, { useState } from 'react';
import './Shuttles.css';

type Season = 'SeasonA' | 'SeasonB' | 'SeasonC' | 'SeasonD';
type Direction = 'Northbound' | 'Southbound';
type ServiceType = 'Standard' | 'Express';

interface ShuttleStop {
  location: string;
  time?: string;
  isReservationOnly?: boolean;
}

interface ShuttleTrip {
  direction: Direction;
  serviceType: ServiceType;
  frequency: 'Daily';
  stops: ShuttleStop[];
  season?: Season;
}

interface ShuttleRoute {
  title: string;
  emoji: string;
  stops: string[];
  trips: ShuttleTrip[];
}

interface ShuttleTableProps {
  route: ShuttleRoute;
  direction: Direction;
  season: Season;
}

const ShuttleTable: React.FC<ShuttleTableProps> = ({ route, direction, season }) => {
  const stopOrder =
    direction === 'Northbound' ? route.stops : [...route.stops].reverse();

  const filteredTrips =
    route.title === 'YVR to Whistler'
      ? route.trips.filter((trip) => trip.direction === direction)
      : route.trips.filter(
          (trip) => trip.direction === direction && trip.season === season
        );

  return (
    <div className="direction-block">
      <h3 className="direction-title">{direction}</h3>
      <table className="shuttle-table">
        <thead>
          <tr>
            <th>Service Type</th>
            <th>Frequency</th>
            {stopOrder.map((stop) => (
              <th key={stop}>{stop}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredTrips.map((trip, index) => (
            <tr
              key={index}
              className={trip.serviceType === 'Express' ? 'express-row' : ''}
            >
              <td>{trip.serviceType}</td>
              <td>{trip.frequency}</td>
              {stopOrder.map((stop) => {
                const match = trip.stops.find((s) => s.location === stop);
                return (
                  <td key={stop}>
                    {match?.time || '—'}
                    {match?.isReservationOnly ? ' 🔒' : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ShuttleSection: React.FC<{
  route: ShuttleRoute;
  season: Season;
  onSeasonChange: (s: Season) => void;
}> = ({ route, season, onSeasonChange }) => {
  return (
    <div className="shuttle-section">
      <h2>
        {route.emoji} <span className="chinese-title">機場接駁</span> {route.title}
      </h2>

      {route.title === 'YVR to Victoria' && (
        <div className="season-selector">
          <label htmlFor="season">季節：</label>
          <select
            id="season"
            value={season}
            onChange={(e) => onSeasonChange(e.target.value as Season)}
          >
            <option value="SeasonA">Jan 01 – Apr 24</option>
            <option value="SeasonB">Apr 25 – May 15</option>
            <option value="SeasonC">May 16 – Oct 05</option>
            <option value="SeasonD">Oct 06 – Mar 31</option>
          </select>
        </div>
      )}

      <div className="direction-container">
        <ShuttleTable route={route} direction="Northbound" season={season} />
        <ShuttleTable route={route} direction="Southbound" season={season} />
      </div>

      {route.title === 'YVR to Whistler' && (
        <div className="station-notes">
          <h4>📍 各站集合地點</h4>
          <ul>
            <li>
              <strong>YVR Vancouver Airport：</strong> 國際抵達區旁的 Skylynx 櫃台，搭車地點在 Bus Bay 9
            </li>
            <li>
              <strong>Vancouver Downtown：</strong> Hyatt Regency 酒店外的 Melville Street，近 Burrard 地鐵站
            </li>
            <li>
              <strong>Squamish：</strong> Squamish Adventure Centre（38551 Loggers Lane），<em>需預約上下車</em>
            </li>
            <li>
              <strong>Whistler：</strong> Whistler Gateway Loop，近旅客服務中心
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

// yvrToWhistler

const yvrToWhistler: ShuttleRoute = {
  title: 'YVR to Whistler',
  emoji: '🚌',
  stops: ['YVR Airport', 'Vancouver Downtown', 'Squamish', 'Whistler'],
  trips: [
    // Northbound (to Whistler)
    {
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '07:00 AM' },
        { location: 'Vancouver Downtown', time: '08:00 AM' },
        { location: 'Squamish', time: '09:00 AM' },
        { location: 'Whistler', time: '10:00 AM' },
      ],
    },
    {
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '08:30 AM' },
        { location: 'Vancouver Downtown', time: '09:30 AM' },
        { location: 'Squamish', time: '10:30 AM' },
        { location: 'Whistler', time: '11:30 AM' },
      ],
    },
    {
      direction: 'Northbound',
      serviceType: 'Express',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '10:00 AM' },
        { location: 'Whistler', time: '12:15 PM' },
      ],
    },
    {
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '11:30 AM' },
        { location: 'Vancouver Downtown', time: '12:30 PM' },
        { location: 'Squamish', time: '01:30 PM' },
        { location: 'Whistler', time: '02:30 PM' },
      ],
    },
    {
      direction: 'Northbound',
      serviceType: 'Express',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '01:30 PM' },
        { location: 'Whistler', time: '03:45 PM' },
      ],
    },
    {
      direction: 'Northbound',
      serviceType: 'Express',
      frequency: 'Daily',
      stops: [
        { location: 'Vancouver Downtown', time: '02:30 PM' },
        { location: 'Whistler', time: '04:15 PM' },
      ],
    },
    {
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '03:00 PM' },
        { location: 'Vancouver Downtown', time: '04:00 PM' },
        { location: 'Squamish', time: '05:00 PM' },
        { location: 'Whistler', time: '06:00 PM' },
      ],
    },
    {
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '07:30 PM' },
        { location: 'Vancouver Downtown', time: '08:30 PM' },
        { location: 'Squamish', time: '09:30 PM' },
        { location: 'Whistler', time: '10:30 PM' },
      ],
    },

    // Southbound
    {
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Whistler', time: '07:30 AM' },
        { location: 'Squamish', time: '08:30 AM' },
        { location: 'Vancouver Downtown', time: '09:30 AM' },
        { location: 'YVR Airport', time: '10:30 AM' },
      ],
    },
    {
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Whistler', time: '11:00 AM' },
        { location: 'Squamish', time: '12:00 PM' },
        { location: 'Vancouver Downtown', time: '01:00 PM' },
        { location: 'YVR Airport', time: '02:00 PM' },
      ],
    },
    {
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Whistler', time: '12:30 PM' },
        { location: 'Squamish', time: '01:30 PM' },
        { location: 'Vancouver Downtown', time: '02:30 PM' },
        { location: 'YVR Airport', time: '03:30 PM' },
      ],
    },
    {
      direction: 'Southbound',
      serviceType: 'Express',
      frequency: 'Daily',
      stops: [
        { location: 'Whistler', time: '01:30 PM' },
        { location: 'YVR Airport', time: '03:45 PM' },
      ],
    },
    {
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Whistler', time: '03:30 PM' },
        { location: 'Squamish', time: '04:30 PM' },
        { location: 'Vancouver Downtown', time: '05:30 PM' },
        { location: 'YVR Airport', time: '06:30 PM' },
      ],
    },
    {
      direction: 'Southbound',
      serviceType: 'Express',
      frequency: 'Daily',
      stops: [
        { location: 'Whistler', time: '05:00 PM' },
        { location: 'YVR Airport', time: '07:15 PM' },
      ],
    },
    {
      direction: 'Southbound',
      serviceType: 'Express',
      frequency: 'Daily',
      stops: [
        { location: 'Whistler', time: '06:00 PM' },
        { location: 'Squamish', time: '07:45 PM' },
      ],
    },
    {
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Whistler', time: '07:00 PM' },
        { location: 'Squamish', time: '08:00 PM' },
        { location: 'Vancouver Downtown', time: '09:00 PM' },
        { location: 'YVR Airport', time: '10:00 PM' },
      ],
    },
  ],
};

// yvrToVictoria

const yvrToVictoria: ShuttleRoute = {
  title: 'YVR to Victoria',
  emoji: '🚢',
  stops: ['YVR Airport', 'Tsawwassen', 'Swartz Bay', 'Victoria'],
  trips: [
    // SeasonA: Jan 01 – Apr 24 (2班)
    {
      season: 'SeasonA',
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '09:40 AM' },
        { location: 'Tsawwassen', time: '11:00 AM' },
        { location: 'Swartz Bay', time: '12:35 PM' },
        { location: 'Victoria', time: '13:20 PM' },
      ],
    },
   {
      season: 'SeasonA',
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '15:40 PM' },
        { location: 'Tsawwassen', time: '17:00 PM' },
        { location: 'Swartz Bay', time: '18:35 PM' },
        { location: 'Victoria', time: '19:20 PM' },
      ],
    },
    {
      season: 'SeasonA',
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Victoria', time: '09:45 AM' },
        { location: 'Swartz Bay', time: '11:00 AM' },
        { location: 'Tsawwassen', time: '12:35 PM' },
        { location: 'YVR Airport', time: '13:25 PM' },
      ],
    },
    {
      season: 'SeasonA',
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Victoria', time: '15:45 PM' },
        { location: 'Swartz Bay', time: '17:00 PM' },
        { location: 'Tsawwassen', time: '18:35 PM' },
        { location: 'YVR Airport', time: '19:25 PM' },
      ],
    },
    // SeasonB: Apr 25 – May 15 (3班)
    {
      season: 'SeasonB',
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '09:40 AM' },
        { location: 'Tsawwassen', time: '11:00 AM' },
        { location: 'Swartz Bay', time: '12:35 PM' },
        { location: 'Victoria', time: '13:20 PM' },
      ],
    },
    {
      season: 'SeasonB',
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '13:40 AM' },
        { location: 'Tsawwassen', time: '15:00 PM' },
        { location: 'Swartz Bay', time: '16:35 PM' },
        { location: 'Victoria', time: '17:20 PM' },
      ],
    },
    {
      season: 'SeasonB',
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '15:40 PM' },
        { location: 'Tsawwassen', time: '17:00 PM' },
        { location: 'Swartz Bay', time: '18:35 PM' },
        { location: 'Victoria', time: '19:20 PM' },
      ],
    },
    {
      season: 'SeasonB',
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Victoria', time: '07:35 AM' },
        { location: 'Swartz Bay', time: '9:00 AM' },
        { location: 'Tsawwassen', time: '10:35 AM' },
        { location: 'YVR Airport', time: '11:25 AM' },
      ],
    },
{
      season: 'SeasonB',
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Victoria', time: '09:45 AM' },
        { location: 'Swartz Bay', time: '11:00 AM' },
        { location: 'Tsawwassen', time: '12:35 PM' },
        { location: 'YVR Airport', time: '13:25 PM' },
      ],
    },
{
      season: 'SeasonB',
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Victoria', time: '15:45 PM' },
        { location: 'Swartz Bay', time: '17:00 PM' },
        { location: 'Tsawwassen', time: '18:35 PM' },
        { location: 'YVR Airport', time: '19:25 PM' },
      ],
    },
    // SeasonC: May 16 – Oct 05 (4班)
    {
      season: 'SeasonC',
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '09:40 AM' },
        { location: 'Tsawwassen', time: '11:00 AM' },
        { location: 'Swartz Bay', time: '12:35 PM' },
        { location: 'Victoria', time: '13:20 PM' },
      ],
    },
    {
      season: 'SeasonC',
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '11:40 AM' },
        { location: 'Tsawwassen', time: '13:00 PM' },
        { location: 'Swartz Bay', time: '14:35 PM' },
        { location: 'Victoria', time: '15:20 PM' },
      ],
    },
    {
      season: 'SeasonC',
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '13:40 AM' },
        { location: 'Tsawwassen', time: '15:00 PM' },
        { location: 'Swartz Bay', time: '16:35 PM' },
        { location: 'Victoria', time: '17:20 PM' },
      ],
    },
    {
      season: 'SeasonC',
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '15:40 PM' },
        { location: 'Tsawwassen', time: '17:00 PM' },
        { location: 'Swartz Bay', time: '18:35 PM' },
        { location: 'Victoria', time: '19:20 PM' },
      ],
    },
    {
      season: 'SeasonC',
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Victoria', time: '07:35 AM' },
        { location: 'Swartz Bay', time: '9:00 AM' },
        { location: 'Tsawwassen', time: '10:35 AM' },
        { location: 'YVR Airport', time: '11:25 AM' },
      ],
    },
{
      season: 'SeasonC',
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Victoria', time: '09:45 AM' },
        { location: 'Swartz Bay', time: '11:00 AM' },
        { location: 'Tsawwassen', time: '12:35 PM' },
        { location: 'YVR Airport', time: '13:25 PM' },
      ],
    },
{
      season: 'SeasonC',
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Victoria', time: '15:45 PM' },
        { location: 'Swartz Bay', time: '17:00 PM' },
        { location: 'Tsawwassen', time: '18:35 PM' },
        { location: 'YVR Airport', time: '19:25 PM' },
      ],
    },
{
      season: 'SeasonC',
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Victoria', time: '17:45 PM' },
        { location: 'Swartz Bay', time: '19:00 PM' },
        { location: 'Tsawwassen', time: '20:35 PM' },
        { location: 'YVR Airport', time: '21:25 PM' },
      ],
    },
    // SeasonD: Oct 06 – Mar 31 (2班)
     {
      season: 'SeasonD',
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '09:40 AM' },
        { location: 'Tsawwassen', time: '11:00 AM' },
        { location: 'Swartz Bay', time: '12:35 PM' },
        { location: 'Victoria', time: '13:20 PM' },
      ],
    },
   {
      season: 'SeasonD',
      direction: 'Northbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'YVR Airport', time: '15:40 PM' },
        { location: 'Tsawwassen', time: '17:00 PM' },
        { location: 'Swartz Bay', time: '18:35 PM' },
        { location: 'Victoria', time: '19:20 PM' },
      ],
    },
    {
      season: 'SeasonD',
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Victoria', time: '09:45 AM' },
        { location: 'Swartz Bay', time: '11:00 AM' },
        { location: 'Tsawwassen', time: '12:35 PM' },
        { location: 'YVR Airport', time: '13:25 PM' },
      ],
    },
    {
      season: 'SeasonD',
      direction: 'Southbound',
      serviceType: 'Standard',
      frequency: 'Daily',
      stops: [
        { location: 'Victoria', time: '15:45 PM' },
        { location: 'Swartz Bay', time: '17:00 PM' },
        { location: 'Tsawwassen', time: '18:35 PM' },
        { location: 'YVR Airport', time: '19:25 PM' },
      ],
    },
      ],
    };

// 主元件

const Shuttles: React.FC = () => {
  const [season, setSeason] = useState<Season>('SeasonC'); // 可根據日期預設

  const handleSeasonChange = (newSeason: Season) => {
    setSeason(newSeason);
  };

  return (
    <div className="shuttles-wrapper">
      <ShuttleSection
        route={yvrToWhistler}
        season={season}
        onSeasonChange={handleSeasonChange}
      />
      <ShuttleSection
        route={yvrToVictoria}
        season={season}
        onSeasonChange={handleSeasonChange}
      />
    </div>
  );
};

export default Shuttles;
