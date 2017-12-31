import * as React from 'react';
import glamorous from 'glamorous';
import { getUserId, getUserPlaylists } from './spotify';
import { Playlist, User } from './classes';
import PlaylistComponent from './PlaylistComponent';

const PlaylistContainer = glamorous.div({
  display: 'flex',
  flexFlow: 'row wrap',
});

interface AppScreenProps {
  accessToken: string;
  errorHandler: (msg: string) => void;
}

interface AppScreenState {
  user: User | undefined;
  playlists: Playlist[] | undefined;
}

class AppScreen extends React.Component<AppScreenProps, AppScreenState> {

  constructor(props: AppScreenProps) {
    super(props);
    this.state = { user: undefined, playlists: [] };
  }

  async fetchData() {
    const user = await getUserId(this.props.accessToken, this.props.errorHandler);
    if (user !== undefined) {
      const playlists = await getUserPlaylists(
        this.props.accessToken, user.id, this.props.errorHandler);
      this.setState({ user, playlists });
    }
  }

  async componentDidMount() {
    this.fetchData();
  }

  render() {

    if (this.state.playlists === undefined) {
      return null;
    }

    return (
      <div className="container">
        <PlaylistContainer>
          {this.state.playlists.map((list) => {
            return (
                <PlaylistComponent key={list.id} data={list}/>
            );
          })}
        </PlaylistContainer>
      </div>
    );
  }
}

export default AppScreen;
