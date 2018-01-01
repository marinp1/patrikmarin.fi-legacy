import { Playlist, Track } from './classes';

// Transform time on milliseconds to human-readable format
export function timeToString(time: number): string {
  const inMinutes = time / 60000;
  const inHours = inMinutes / 60;
  const hours = Math.floor(inHours);
  const hourString = (hours === 1) ? 'hour' : 'hours';
  const minutes = Math.floor((inHours - hours) * 60);
  const minuteString = (minutes === 1) ? 'minute' : 'minutes';
  return `${hours} ${hourString}, ${minutes} ${minuteString}`;
}

export interface TrackPair {
  a: Track;
  b: Track;
}

interface UniqueResult {
  uniques: Track[];
  unsures: TrackPair[];
}

export interface ResolveResult {
  saved: Track[];
  discarded: Track[];
}

export function getUniquetracks(playlists: Playlist[]): UniqueResult {

  const unsureIdMap = new Map<string, TrackPair>();
  const hardTrackMap = new Map<string, Track>();

  playlists.map(_ => _.tracks).reduce((a, b) => a.concat(b), []).forEach((_: Track) => {
    const existing = hardTrackMap.get(_.artist + _.name);
    // Add track to tracklist if it doesn't exist already
    if (!existing) {
      hardTrackMap.set(_.artist + _.name, _);
    } else {
      // Add track pair to unsure duplicates if their ids differ and they pair doesn't exist
      if (existing.id !== _.id) {
        const pairIds = [existing.id, _.id].sort().join('-');
        if (!unsureIdMap.get(pairIds)) {
          unsureIdMap.set(pairIds, { a: existing, b: _ });
        }
      }
    }
  });

  return {
    uniques: Array.from(hardTrackMap.values()),
    unsures: Array.from(unsureIdMap.values()),
  };
}
