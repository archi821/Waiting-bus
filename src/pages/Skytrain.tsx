import React from 'react';

const skytrainLines = {
  Expo: [
    'Waterfront', 'Burrard', 'Granville', 'Stadium–Chinatown', 'Main Street–Science World',
    'Commercial–Broadway', 'Nanaimo', '29th Avenue', 'Joyce–Collingwood', 'Patterson',
    'Metrotown', 'Royal Oak', 'Edmonds', '22nd Street', 'New Westminster', 'Columbia',
    'Sapperton', 'Braid', 'Lougheed Town Centre', 'Production Way–University', 'Scott Road',
    'Gateway', 'Surrey Central', 'King George'
  ],
  Millennium: [
    'VCC–Clark', 'Commercial–Broadway', 'Renfrew', 'Rupert', 'Gilmore', 'Brentwood Town Centre',
    'Holdom', 'Sperling–Burnaby Lake', 'Lake City Way', 'Production Way–University',
    'Lougheed Town Centre', 'Burquitlam', 'Moody Centre', 'Inlet Centre', 'Coquitlam Central',
    'Lincoln', 'Lafarge Lake–Douglas'
  ],
  Canada: [
    'Waterfront', 'Vancouver City Centre', 'Yaletown–Roundhouse', 'Olympic Village',
    'Broadway–City Hall', 'King Edward', 'Oakridge–41st Avenue', 'Langara–49th Avenue',
    'Marine Drive', 'Bridgeport', 'Aberdeen', 'Lansdowne', 'Richmond–Brighouse',
    'Templeton', 'Sea Island Centre', 'YVR–Airport'
  ],
  WestCoastExpress: [
    'Waterfront', 'Moody Centre', 'Coquitlam Central', 'Port Coquitlam',
    'Pitt Meadows', 'Maple Meadows', 'Port Haney', 'Mission City'
  ]
};

const Skytrain: React.FC = () => {
  return (
    <div>
      <h1>Metro Vancouver Transit Map</h1>
      {Object.entries(skytrainLines).map(([line, stations]) => (
        <div key={line}>
          <h2>{line} Line</h2>
          <ul>
            {stations.map(station => (
              <li key={station}>{station}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Skytrain;
