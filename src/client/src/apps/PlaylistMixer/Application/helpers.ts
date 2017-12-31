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

interface TrackPair {
  _1: Track;
  _2: Track;
}

interface UniqueResult {
  uniques: Track[];
  unsures: TrackPair[];
}

export function getUniquetracks(playlists: Playlist[], aggressive: boolean): UniqueResult {

  const unsureDuplicates: TrackPair[] = [];

  const hardTrackMap = new Map<string, Track>();
  playlists.map(_ => _.tracks).reduce((a, b) => a.concat(b), []).forEach((_: Track) => {
    const existing = hardTrackMap.get(_.artist + _.name);
    if (!existing) {
      hardTrackMap.set(_.artist + _.name, _);
    } else {
      if (existing.id !== _.id) {
        unsureDuplicates.push({ _1: existing, _2: _ });
      }
    }
  });

  return {
    uniques: Array.from(hardTrackMap.values()),
    unsures: unsureDuplicates,
  };
}
