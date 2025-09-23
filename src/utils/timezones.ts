export function getTimeZone(stopId: string): string {
  switch (stopId) {
    case 'abbotsford':
    case '344':
    case 'vancouver':
    case 'van':
      return 'America/Vancouver'; // PDT

    case 'toronto':
    case 'montreal':
    case 'ottawa':
      return 'America/Toronto'; // EDT

    case 'winnipeg':
      return 'America/Winnipeg'; // CDT

    case 'calgary':
    case 'edmonton':
      return 'America/Edmonton'; // MDT

    case 'regina':
      return 'America/Regina'; // CST

    case 'halifax':
      return 'America/Halifax'; // ADT

    case 'jasper':
      return 'America/Edmonton'; // MDT

    default:
      return 'America/Toronto'; // fallback
  }
}

