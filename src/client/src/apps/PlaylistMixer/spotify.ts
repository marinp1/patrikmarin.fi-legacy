import * as url from 'url';
import { ParsedUrlQuery } from 'querystring';
import { Playlist, Track } from './classes';

export function getUserId(api: any, errorHandler: (e: any) => void): string {
  return api.getMe()
    .then(
      (data: any) => {
        return data.body.id;
      }, 
      (error: any) => {
        errorHandler(`${error.name}: ${error.message}`);
      });
}

export async function getPlaylistTracks(api: any, userId: string,
                                        playlistId: string, errorHandler: (e: any) => void) {
  
  function getNext(tracks: Track[], offset: number) {
    return api.getPlaylistTracks(userId, playlistId, { offset, limit: 100 })
    .then(
      (data: any) => {
        // Merge fetched data to existing tracklist information
        const merged = tracks.concat(data.body.items.map((_: any) => new Track(_)));
        // Proceed to next page if all tracks haven't been found
        if (data.body.next) {
          const nextUrl = url.parse(data.body.next, true);
          if (nextUrl.query !== undefined) {
            const nextOffset = Number((nextUrl.query as ParsedUrlQuery).offset);
            return getNext(merged, nextOffset);
          }
        }
        // Return data
        return merged;
      },
      (error: any) => {
        console.error(error);
        return [];
      });
  }

  const allTracks = await getNext([], 0);
  return allTracks;
}

export async function getUserPlaylists(api: any, id: string, errorHandler: (e: any) => void) {

  function getNext(playlists: Playlist[], offset: number) {
    return api.getUserPlaylists(id, { offset, limit: 20 })
    .then(
      (data: any) => {
        // Merge fetched data to existing playlist information
        const merged = playlists.concat(data.body.items.map((_: any) => new Playlist(_)));
        // Proceed to next page if all playlists haven't been found
        if (data.body.next) {
          const nextUrl = url.parse(data.body.next, true);
          if (nextUrl.query !== undefined) {
            const nextOffset = Number((nextUrl.query as ParsedUrlQuery).offset);
            return getNext(merged, nextOffset);
          }
        }
        // Return data
        return merged;
      }, 
      (error: any) => {
        errorHandler(`${error.name}: ${error.message}`);
      });
  }

  const allPlaylists: Playlist[] = await getNext([], 0);
  console.log(allPlaylists);
  return allPlaylists;
}
