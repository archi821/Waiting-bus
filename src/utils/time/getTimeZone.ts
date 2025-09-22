export function getTimeZone(stopId: string): string {
  const zoneMap: { [key: string]: string } = {
    '344': 'America/Toronto',
    '401': 'America/Vancouver',
    '402': 'America/Winnipeg',
    '403': 'America/Edmonton',
    '404': 'America/Halifax',
    '405': 'America/Montreal',
    '406': 'America/Regina',
    '407': 'America/St_Johns',
  };

  return zoneMap[stopId] || 'America/Toronto';
}

