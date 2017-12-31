import * as url from 'url';
import { ParsedUrlQuery } from 'querystring';
import * as Spotify from 'spotify-web-api-js';
import { Playlist, Track, User } from './classes';

export async function getUserId(accessToken: string,
                                errorHandler: (e: any) => void) {

  const spotifyApi = new Spotify();
  spotifyApi.setAccessToken(accessToken);
  const user = spotifyApi.getMe()
    .then((user) => {
      return new User(user);
    }).catch((err) => {
      const error = JSON.parse(err.response).error;
      errorHandler(`${err.status} ${err.statusText}: ${error.message}`);
      return undefined;
    });
  return user;
}

export async function getPlaylistTracks(accessToken: string, ownerId: string,
                                        playlistId: string, errorHandler: (e: any) => void) {

  const spotifyApi = new Spotify();
  spotifyApi.setAccessToken(accessToken);

  async function getNext(tracks: Track[], offset: number): Promise<Track[] | undefined> {
    return spotifyApi.getPlaylistTracks(ownerId, playlistId, { offset, limit: 100 })
    .then(
      (response) => {
        // Merge fetched data to existing tracklist information
        const merged = tracks.concat(response.items.map(_ => new Track(_)));
        // Proceed to next page if all tracks haven't been found
        if (response.next) {
          const nextUrl = url.parse(response.next, true);
          if (nextUrl.query !== undefined) {
            const nextOffset = Number((nextUrl.query as ParsedUrlQuery).offset);
            return getNext(merged, nextOffset);
          }
        }
        // Return data
        return merged;
      }).catch((err) => {
        const error = JSON.parse(err.response).error;
        errorHandler(`${err.status} ${err.statusText}: ${error.message}`);
        return undefined;
      });
  }

  const allTracks = await getNext([], 0);
  return allTracks;
}

export async function getUserPlaylists(accessToken: string, id: string,
                                       errorHandler: (e: any) => void) {

  const spotifyApi = new Spotify();
  spotifyApi.setAccessToken(accessToken);

  async function getNext(playlists: Playlist[], offset: number): Promise<Playlist[] | undefined> {
    return spotifyApi.getUserPlaylists(id, { offset, limit: 10 })
      .then((lists) => {
        const merged = playlists.concat(lists.items.map(_ => new Playlist(_)));
        if (lists.next) {
          const nextUrl = url.parse(lists.next, true);
          if (nextUrl.query !== undefined) {
            const nextOffset = Number((nextUrl.query as ParsedUrlQuery).offset);
            return getNext(merged, nextOffset);
          }
        }
        return merged;
      }).catch((err) => {
        const error = JSON.parse(err.response).error;
        errorHandler(`${err.status} ${err.statusText}: ${error.message}`);
        return undefined;
      });
  }

  const allPlaylists = await getNext([], 0);
  return allPlaylists;
}
