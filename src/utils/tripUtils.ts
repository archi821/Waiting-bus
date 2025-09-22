import { DateTime } from 'luxon';

function safeParseTime(time: string) {
  const [h, m, s] = time.split(':').map((v) => Number(v));
  const hour = isNaN(h) ? 0 : h;
  const minute = isNaN(m) ? 0 : m;
  const second = isNaN(s) ? 0 : s;
  return { hour, minute, second };
}

function safeParseDate(date: string) {
  const iso = DateTime.fromISO(date);
  return iso.isValid ? iso : DateTime.now();
}

export function convertTimeBetweenZones(date: string, time: string, fromZone: string, toZone: string) {
  try {
    const base = safeParseDate(date);
    const { hour, minute, second } = safeParseTime(time);
    const dt = base.set({ hour, minute, second }).setZone(fromZone);
    if (!dt.isValid) throw new Error(dt.invalidExplanation || 'Invalid DateTime');
    const converted = dt.setZone(toZone);
    return {
      time: converted.toFormat('HH:mm'),
      date: converted.toFormat('yyyy-MM-dd'),
      datetime: converted,
    };
  } catch (err) {
    console.warn('❌ 時間轉換失敗:', { date, time, fromZone, toZone, err });
    return { time: '--:--', date: '未知', datetime: DateTime.now() };
  }
}

export function getTripDuration(date: string, depTime: string, arrTime: string) {
  try {
    const base = safeParseDate(date);
    const dep = base.plus(safeParseTime(depTime));
    let arr = base.plus(safeParseTime(arrTime));
    if (arr < dep) arr = arr.plus({ days: 1 });
    const diff = arr.diff(dep, ['hours', 'minutes']).toObject();
    return {
      hours: Math.floor(diff.hours ?? 0),
      minutes: Math.floor(diff.minutes ?? 0),
    };
  } catch (err) {
    console.warn('❌ 行程長度計算失敗:', { date, depTime, arrTime, err });
    return { hours: 0, minutes: 0 };
  }
}

export function isNextDay(depDate: string, arrDate: string) {
  return depDate !== arrDate;
}







