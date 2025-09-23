import { stopMap } from '@/stopMap';
const DEFAULT_TIMEZONE = 'America/Toronto'; // ✅ 可改成 UTC-4 或其他 fallback

export function getEffectiveTimezone(stop_id: string): string {
  const zone = stopMap[stop_id];
  if (!zone) {
    console.warn(`⚠️ stop_id ${stop_id} 沒有對應時區，使用預設 ${DEFAULT_TIMEZONE}`);
  }
  return zone ?? DEFAULT_TIMEZONE;
}
