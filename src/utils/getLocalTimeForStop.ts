import { DateTime } from 'luxon';
import { getTimeZone } from './timezones';

export function getLocalTimeForStop(
  baseDate: string,
  timeStr: string,
  stopId: string,
  forceZeroDay?: boolean
) {
  const zone = getTimeZone(stopId);
  const [h, m, s] = timeStr.split(':').map(Number);

  const base = DateTime.fromISO(baseDate, { zone: 'America/Toronto' });

  const adjusted = base.plus({ hours: h, minutes: m, seconds: s || 0 });
  const local = adjusted.setZone(zone);

  return {
    time: local.toFormat('HH:mm'),
    date: local.toFormat('MM/dd'),
    datetime: local.toISO() ?? '',
    zoneLabel: `${local.offsetNameShort} (UTC${local.offset >= 0 ? '+' : ''}${local.offset / 60})`,
  };
}


