/// <reference path="../../../../node_modules/spotify-web-api-js/src/typings/spotify-api.d.ts" />

const playlistPlaceholderImg = require('../images/playlist.png');

export class User {
  id: string;
  name: string;
  imageUrl: string;

  constructor(data: SpotifyApi.UserProfileResponse) {
    this.id = data.id;
    this.name = data.display_name ? data.display_name : data.id;
    this.imageUrl = data.images ? data.images[0].url : '';
  }
}

export class Playlist {
  owner: User;
  id: string;
  name: string;
  public: boolean;
  imageUrl: string;
  length: number;
  tracks: Track[];
  runtime: number;

  constructor(data: SpotifyApi.PlaylistObjectSimplified) {
    this.id = data.id;
    this.owner = new User(data.owner);
    this.name = data.name;
    this.public = data.public;
    this.imageUrl = data.images[0].url;
    this.length = data.tracks.total;
    this.runtime = -1; // Use -1 to inform that tracks are being loaded
  }

  setTracks(tracks: Track[]) {
    this.tracks = tracks;
    this.runtime = tracks.map(_ => _.duration).reduce((a, b) => a + b);
  }
}

export class Track {
  id: string;
  uri: string;
  duration: number;
  name: string;
  album: Album;
  artist: string;

  constructor(data: SpotifyApi.PlaylistTrackObject) {
    this.id = data.track.id;
    this.uri = data.track.uri;
    this.duration = data.track.duration_ms;
    this.album = new Album(data.track.album);
    this.name = data.track.name;
    this.artist = data.track.artists.map(_ => _.name).join(' & ');
  }
}

export class Album {
  name: string;
  imageUrl: string;
  constructor(data: SpotifyApi.AlbumObjectSimplified) {
    this.name = data.name;
    this.imageUrl = (data.images.length > 0) ? data.images[0].url : playlistPlaceholderImg;
  }
}
