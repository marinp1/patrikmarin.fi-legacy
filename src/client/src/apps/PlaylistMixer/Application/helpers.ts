export function timeToString(time: number): string {
  const inMinutes = time / 60000;
  const inHours = inMinutes / 60;
  const hours = Math.floor(inHours);
  const hourString = (hours === 1) ? 'hour' : 'hours';
  const minutes = Math.floor((inHours - hours) * 60);
  const minuteString = (minutes === 1) ? 'minute' : 'minutes';
  return `${hours} ${hourString}, ${minutes} ${minuteString}`;
}
