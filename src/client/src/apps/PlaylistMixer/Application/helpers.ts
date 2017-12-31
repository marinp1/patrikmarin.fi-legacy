import { Playlist, Track } from './classes';

export function timeToString(time: number): string {
  const inMinutes = time / 60000;
  const inHours = inMinutes / 60;
  const hours = Math.floor(inHours);
  const hourString = (hours === 1) ? 'hour' : 'hours';
  const minutes = Math.floor((inHours - hours) * 60);
  const minuteString = (minutes === 1) ? 'minute' : 'minutes';
  return `${hours} ${hourString}, ${minutes} ${minuteString}`;
}

export function getUniquetracks(playlists: Playlist[], aggressive: boolean): Track[] {
  if (aggressive) {
    const trackMap = new Map<string, Track>();
    playlists.map(_ => _.tracks).reduce((a, b) => a.concat(b), []).forEach((_: Track) => {
      if (!trackMap.get(_.artist + _.name)) trackMap.set(_.artist + _.name, _);
    });
    return Array.from(trackMap.values());
  }
  const trackMap = new Map<string, Track>();
  playlists.map(_ => _.tracks).reduce((a, b) => a.concat(b), []).forEach((_: Track) => {
    if (!trackMap.get(_.id)) trackMap.set(_.id, _);
  });
  return Array.from(trackMap.values());
}
