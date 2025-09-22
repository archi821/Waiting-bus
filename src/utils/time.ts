const stopTimezones: Record<string, string> = {
  '344': 'America/Toronto',
  '601': 'America/Edmonton',
  '618': 'America/Vancouver',
  '119': 'America/Vancouver',
  '603': 'America/Edmonton',
  '602': 'America/Regina',
  '600': 'America/Winnipeg',
  '345': 'America/Toronto',
  '346': 'America/Toronto',
  '347': 'America/Toronto',
  '348': 'America/Toronto',
  '349': 'America/Toronto',
  '350': 'America/Toronto',
  '351': 'America/Toronto',
  '352': 'America/Toronto',
  '353': 'America/Toronto',
  '354': 'America/Toronto',
  '355': 'America/Toronto',
  '356': 'America/Toronto',
  '357': 'America/Toronto',
  '358': 'America/Toronto',
  '359': 'America/Toronto',
  '360': 'America/Toronto',
  '361': 'America/Moncton',
  '362': 'America/Halifax',
  '363': 'America/Halifax',
};

export function getTimeZone(stopId: string): string {
  return stopTimezones[stopId] || 'America/Toronto';
}

export function convertTimeBetweenZones(
  baseDate: string,
  timeStr: string,
  fromZone: string,
  toZone: string
) {
  if (!baseDate || !timeStr || !fromZone || !toZone) {
    throw new Error(`Missing required parameters`);
  }

  const [h, m, s] = timeStr.split(':').map(Number);
  if ([h, m].some(n => isNaN(n))) {
    throw new Error(`Invalid time string: ${timeStr}`);
  }

  const base = new Date(baseDate);
  if (isNaN(base.getTime())) {
    throw new Error(`Invalid base date: ${baseDate}`);
  }

  const utc = Date.UTC(
    base.getFullYear(),
    base.getMonth(),
    base.getDate(),
    h,
    m,
    s || 0
  );

  const utcDate = new Date(utc);

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: toZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(utcDate);
  const dateStr = `${parts.find(p => p.type === 'month')?.value}/${parts.find(p => p.type === 'day')?.value}`;
  const timeStr24 = `${parts.find(p => p.type === 'hour')?.value}:${parts.find(p => p.type === 'minute')?.value}`;

  return { date: dateStr, time: timeStr24 };
}

export function getTripDuration(
  departureDate: string,
  departureTime: string,
  arrivalTime: string
) {
  const [dh, dm, ds] = departureTime.split(':').map(Number);
  const [ah, am, as] = arrivalTime.split(':').map(Number);

  const dep = new Date(departureDate);
  dep.setHours(dh, dm, ds || 0);

  const arr = new Date(departureDate);
  arr.setHours(ah, am, as || 0);

  if (arr < dep) arr.setDate(arr.getDate() + 1);

  const diffMs = arr.getTime() - dep.getTime();
  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);

  return { hours, minutes };
}

















