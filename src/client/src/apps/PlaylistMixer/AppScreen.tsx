import * as React from 'react';
// import glamorous from 'glamorous';
import { getUserId, getUserPlaylists } from './spotify';
import { Playlist } from './classes';
const SpotifyWebApi = require('spotify-web-api-node');

interface AppScreenProps {
  accessToken: string;
  errorHandler: (msg: string) => void;
}

interface AppScreenState {
  spotifyApi: any;
  userId: string;
  playlists: Playlist[];
}

class AppScreen extends React.Component<AppScreenProps, AppScreenState> {

  constructor(props: AppScreenProps) {
    super(props);
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(this.props.accessToken);
    this.state = { spotifyApi, userId: '', playlists: [] };
  }

  async fetchData() {
    const userId = await getUserId(this.state.spotifyApi, this.props.errorHandler);
    const playlists = await getUserPlaylists(
      this.state.spotifyApi, userId, this.props.errorHandler);
    this.setState({ userId, playlists });
  }

  async componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        {this.state.playlists.map((list) => {
          return (
            <div key={list.id}>
              {list.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default AppScreen;
