import { stopMap } from '@/stopMap';
import { DateTime } from 'luxon';

const DEFAULT_TIMEZONE = 'America/Toronto';

export function getTimezoneForStop(stop_id: string): string {
  const zone = stopMap[stop_id];
  if (!zone || !DateTime.local().setZone(zone).isValid) {
    console.warn(`⚠️ stop_id ${stop_id} 的時區無效或缺失，使用預設 ${DEFAULT_TIMEZONE}`);
    return DEFAULT_TIMEZONE;
  }
  return zone;
}

export function verifyStopMap() {
  Object.entries(stopMap).forEach(([stopId, zone]) => {
    const valid = DateTime.local().setZone(zone).isValid;
    if (!valid) {
      console.warn(`❌ stop_id ${stopId} → 無效時區 ${zone}`);
    }
  });
}



