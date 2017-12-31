export class Playlist {
  id: string;
  name: string;
  public: boolean;
  imageUrl: string;
  length: number;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.public = !!data.public;
    this.imageUrl = data.images[0].url;
  }
}

export class Track {
  id: string;
  duration: number;
  name: string;
  artist: string;

  constructor(data: any) {
    this.id = data.track.id;
    this.duration = data.track.duration_ms;
    this.name = data.track.name;
    this.artist = data.track.artists.map((_:any) => _.name).join(' & ');
  }
}
