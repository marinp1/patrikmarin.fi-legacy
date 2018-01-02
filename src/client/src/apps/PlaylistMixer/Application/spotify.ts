import * as url from 'url';
import { ParsedUrlQuery } from 'querystring';
import * as Spotify from 'spotify-web-api-js';
import { Playlist, Track, User } from './classes';

function handleError(err: any, errorHandler: (e: any) => void): undefined {
  // Display error screen with appropriate information
  try {
    const error = JSON.parse(err.response).error;
    errorHandler(`${err.status} ${err.statusText}: ${error.message}`);
  } catch (e)  {
    console.error(err);
  }
  return undefined;
}

export async function getUserId(accessToken: string,
                                errorHandler: (e: any) => void) {

  const spotifyApi = new Spotify();
  spotifyApi.setAccessToken(accessToken);
  const user = spotifyApi.getMe()
    .then((user) => {
      return new User(user);
    }).catch((err) => {
      return handleError(err, errorHandler);
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
        return handleError(err, errorHandler);
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
        return handleError(err, errorHandler);
      });
  }

  const allPlaylists = await getNext([], 0);
  return allPlaylists;
}

export async function createPlaylist(accessToken: string, userId: string, playlistName: string,
                                     tracks: Track[], errorHandler: (e: any) => void) {

  const spotifyApi = new Spotify();
  spotifyApi.setAccessToken(accessToken);

  const trackUris = tracks.map(_ => _.uri);

  const newPlaylist = spotifyApi.createPlaylist(userId, { name: playlistName })
    .then((playlist) => {
      return playlist;
    }).catch((err) => {
      return handleError(err, errorHandler);
    });

  async function addTracksToPlaylist(playlistId: string, uris: string[]):
   Promise<SpotifyApi.CreatePlaylistResponse | undefined> {
    const limitedUris = uris.length > 100 ? uris.slice(0, 100) : uris;
    await spotifyApi.addTracksToPlaylist(userId, playlistId, limitedUris)
      .then((playlist) => {
        return playlist;
      }).catch((err) => {
        return handleError(err, errorHandler);
      });
    if (uris.length > 100) {
      return addTracksToPlaylist(playlistId, uris.splice(100));
    }
    return newPlaylist;
  }

  return newPlaylist.then((response) => {
    if (response === undefined) {
      return undefined;
    }
    return addTracksToPlaylist(response.id, trackUris);
  });
}                                      
