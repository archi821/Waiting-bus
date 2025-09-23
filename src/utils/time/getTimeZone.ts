type Stop = {
  stop_id: string;
  stop_name: string;
  stop_timezone?: string;
  // 其他欄位略
};

// ✅ 這是你從 stops.txt 轉出來的資料
import { stopMap } from './gtfsData'; // 假設你在轉檔階段建立了 stopMap

export function getTimeZone(stopId: string): string {
  const stop = stopMap[stopId];

  if (!stop) {
    console.warn('⚠️ 找不到 stopId:', stopId);
    return 'America/Toronto'; // fallback 保守用 Toronto
  }

  if (!stop.stop_timezone) {
    console.warn('⚠️ stop_timezone 缺失:', stopId, stop.stop_name);
    return 'America/Toronto';
  }

  return stop.stop_timezone;
}
