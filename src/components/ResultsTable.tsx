import React from 'react';
import { Result } from '../types/types';

interface Props {
  results: Result[];
}

export default function ResultsTable({ results }: Props) {
  if (results.length === 0) return <p>沒有找到符合條件的列車。</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>車次</th>
          <th>出發時間</th>
          <th>抵達時間</th>
          <th>總時長</th>
          <th>票價</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r, i) => {
          const [depHour, depMin] = r.departure_time.split(':').map(Number);
          const [arrHour, arrMin] = r.arrival_time.split(':').map(Number);
          let durationHour = arrHour - depHour;
          let durationMin = arrMin - depMin;
          if (durationMin < 0) {
            durationMin += 60;
            durationHour -= 1;
          }
          if (durationHour < 0) durationHour += 24;

          return (
            <tr key={i}>
              <td>{r.trip_id}</td>
              <td>{r.departure_time}</td>
              <td>{r.arrival_time}</td>
              <td>{`${durationHour} 小時 ${durationMin} 分`}</td>
              <td>$288（經濟） / $1315（臥鋪）</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}


