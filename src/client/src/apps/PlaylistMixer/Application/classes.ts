/// <reference path="../../../../node_modules/spotify-web-api-js/src/typings/spotify-api.d.ts" />

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
    this.runtime = -1;
  }

  setTracks(tracks: Track[]) {
    this.tracks = tracks;
    this.runtime = tracks.map(_ => _.duration).reduce((a, b) => a + b);
  }
}

export class Track {
  id: string;
  duration: number;
  name: string;
  artist: string;

  constructor(data: SpotifyApi.PlaylistTrackObject) {
    this.id = data.track.id;
    this.duration = data.track.duration_ms;
    this.name = data.track.name;
    this.artist = data.track.artists.map(_ => _.name).join(' & ');
  }
}
