export function getTripDuration(
  baseDate: string,
  departureTime: string,
  arrivalTime: string
): { hours: number; minutes: number } {
  const [dh, dm] = departureTime.split(':').map(Number);
  const [ah, am] = arrivalTime.split(':').map(Number);

  if ([dh, dm, ah, am].some(n => isNaN(n))) {
    return { hours: 0, minutes: 0 };
  }

  const dep = new Date(`${baseDate}T${departureTime}`);
  const arr = new Date(`${baseDate}T${arrivalTime}`);

  let diffMs = arr.getTime() - dep.getTime();
  if (diffMs < 0) diffMs += 24 * 3600 * 1000;

  const totalMinutes = Math.floor(diffMs / 60000);
  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };
}

