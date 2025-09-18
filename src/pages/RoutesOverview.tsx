import { useEffect, useState } from 'react';
type Route = {
  id: string;
  start: string;
  end: string;
  stops: number;
};

const RouteListPage = () => {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    fetch('/google_transit/Routes.txt')
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split('\n').filter((line) => line.trim() !== '');
        const parsed = lines.map((line) => {
          const [id, start, end, stops] = line.split('|').map((s) => s.trim());
          return {
            id,
            start,
            end,
            stops: Number(stops),
          };
        });
        setRoutes(parsed);
      });
  }, []);

  return (
    <div>
      <h2>所有路線</h2>
      <ul>
        {routes.map((route) => (
          <li key={route.id}>
            <div style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{route.id}</span>{' '}
              {route.start} / {route.end} - 🚌 {route.stops} stops
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RouteListPage;
