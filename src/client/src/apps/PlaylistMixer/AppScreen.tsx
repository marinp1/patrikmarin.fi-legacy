import * as React from 'react';
// import glamorous from 'glamorous';
import { getUserId, getUserPlaylists } from './spotify';
const SpotifyWebApi = require('spotify-web-api-node');

interface AppScreenProps {
  accessToken: string;
  errorHandler: (msg: string) => void;
}

interface AppScreenState {
  spotifyApi: any;
  userId: string;
}

class AppScreen extends React.Component<AppScreenProps, AppScreenState> {

  constructor(props: AppScreenProps) {
    super(props);
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(this.props.accessToken);
    this.state = { spotifyApi, userId: '' };
  }

  async fetchData() {
    const id = await getUserId(this.state.spotifyApi, this.props.errorHandler);
    getUserPlaylists(this.state.spotifyApi, id, this.props.errorHandler);
  }

  async componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        sadas
      </div>
    );
  }
}

export default AppScreen;
