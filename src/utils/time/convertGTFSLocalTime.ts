import { DateTime } from 'luxon';

export function convertGTFSLocalTime(
  baseDate: string,
  timeStr: string,
  toZone: string
): {
  date: string;
  time: string;
  datetime: string;
  timezoneLabel: string;
} {
  const [h, m, s] = timeStr.split(':').map(Number);
  if ([h, m].some(n => isNaN(n))) {
    throw new Error(`Invalid time string: ${timeStr}`);
  }

  const torontoTime = DateTime.fromObject(
    {
      year: Number(baseDate.slice(0, 4)),
      month: Number(baseDate.slice(5, 7)),
      day: Number(baseDate.slice(8, 10)),
      hour: h,
      minute: m,
      second: s || 0,
    },
    { zone: 'America/Toronto' }
  );

  const target = torontoTime.setZone(toZone);
  if (!target.isValid) {
    throw new Error(`Invalid DateTime: ${target.invalidReason}`);
  }

  return {
    date: target.toFormat('MM/dd'),
    time: target.toFormat('HH:mm'),
    datetime: target.toISO(),
    timezoneLabel: `${target.offsetNameShort} (UTC${target.offset >= 0 ? '+' : ''}${target.offset / 60})`,
  };
}



