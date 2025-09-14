import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import stopsRaw from '../data/stops.json';

type Stop = {
  stop_id: string | number;
  stop_name: string;
};

const stops: Stop[] = Array.isArray(stopsRaw)
  ? stopsRaw.map((s: any) => ({
      stop_id: String(s.stop_id).trim(),
      stop_name: String(s.stop_name || '').trim(),
    }))
  : [];

export default function StopsPage() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🚏 所有站牌列表</h2>
      <ul style={styles.list}>
        {stops.map((stop) => (
          <li key={stop.stop_id} style={styles.item}>
            <Link to={`/stop/${stop.stop_id}`} style={styles.link}>
              {stop.stop_name}（ID: {stop.stop_id}）
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { padding: 24, maxWidth: 800, margin: '0 auto' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  list: { listStyle: 'none', padding: 0 },
  item: { marginBottom: 12 },
  link: {
    textDecoration: 'none',
    color: '#2D0AFF',
    fontSize: 16,
    fontWeight: 500,
  },
};
