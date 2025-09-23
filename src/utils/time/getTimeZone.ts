export function getTimeZone(stopId: string): string {
  const zoneMap: { [key: string]: string } = {
    // 西岸：British Columbia
    '119': 'America/Vancouver', // Abbotsford
    '341': 'America/Vancouver', // Vancouver

    // 山區：Alberta
    '618': 'America/Edmonton',
    '601': 'America/Edmonton',
    '78': 'America/Edmonton',
    '93': 'America/Edmonton',
    '323': 'America/Edmonton',
    '282': 'America/Edmonton',
    '162': 'America/Edmonton',
    '600': 'America/Edmonton',
    '436': 'America/Edmonton',

    // 其他可擴充：Toronto, Montreal, Halifax, etc.
    '344': 'America/Toronto',
    '405': 'America/Montreal',
    '404': 'America/Halifax',
    '407': 'America/St_Johns',
  };

  return zoneMap[stopId] || 'America/Toronto'; // fallback 成東部時間
}

