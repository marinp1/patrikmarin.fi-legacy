import * as React from 'react';
import glamorous from 'glamorous';
import { getUserId, getUserPlaylists, getPlaylistTracks } from './spotify';
import { Playlist, User, Track } from './classes';
import { getUniquetracks, TrackPair, generatePlaylist, ResolveResult } from './helpers';
import Loader from './Loader';
import PlaylistComponent from './PlaylistComponent';
import StatusTextComponent from './StatusTextComponent';
import UnsureResolver from './UnsureResolver';
import CreatePlaylistButton from './CreatePlaylistButton';

const Title = glamorous.h5({
  letterSpacing: '0.2rem',
  marginTop: '3rem',
  marginBottom: '1rem',
  color: '#f8f8f8',
  fontWeight: 'bold',
});

const Subtitle = glamorous.h6({
  marginBottom: '2rem',
  color: '#c8c8c8',
});

const PlaylistContainer = glamorous.div({
  display: 'flex',
  flexFlow: 'row wrap',
});

interface ApplicationProps {
  accessToken: string;
  errorHandler: (msg: string) => void;
}

interface ApplicationState {
  user: User | undefined;
  playlists: Playlist[] | undefined;
  selectedPlaylists: Playlist[];
  selectedTracks: Track[];
  unsureDuplicates: TrackPair[];
  modalOpen: boolean;
}

class Application extends React.Component<ApplicationProps, ApplicationState> {

  constructor(props: ApplicationProps) {
    super(props);
    this.state = {
      user: undefined,
      modalOpen: false,
      playlists: [],
      selectedPlaylists: [],
      selectedTracks: [],
      unsureDuplicates: [],
    };
    this.handleSelection = this.handleSelection.bind(this);
    this.createNewPlaylist = this.createNewPlaylist.bind(this);
    this.handleUnsures = this.handleUnsures.bind(this);
  }

  handleSelection(playlist: Playlist) {
    if (this.state.selectedPlaylists.indexOf(playlist) !== -1) {
      const filteredList = this.state.selectedPlaylists.filter(_ => _.id !== playlist.id);
      const uniqueTracks = getUniquetracks(filteredList);
      this.setState({
        selectedPlaylists: filteredList,
        selectedTracks: uniqueTracks.uniques,
        unsureDuplicates: uniqueTracks.unsures,
      });
    } else {
      const newList = this.state.selectedPlaylists.concat(playlist);
      const uniqueTracks = getUniquetracks(newList);
      this.setState({
        selectedPlaylists: newList,
        selectedTracks: uniqueTracks.uniques,
        unsureDuplicates: uniqueTracks.unsures,
      });
    }
  }

  createNewPlaylist(name: string) {
    if (this.state.unsureDuplicates.length > 0) {
      this.setState({ modalOpen: true });
    } else {
      generatePlaylist();
    }
  }

  handleUnsures(result?: ResolveResult) {
    this.setState({ modalOpen: false });
    if (!!result) {
      console.log(result.discarded.length);
      console.log(result.saved.length);
    }
  }

  async fetchData() {
    const user = await getUserId(this.props.accessToken, this.props.errorHandler);
    if (user !== undefined) {
      this.setState({ user });
      const playlists = await getUserPlaylists(
        this.props.accessToken, user.id, this.props.errorHandler);
      this.setState({ playlists });
      if (!!playlists) {
        for (const playlist of playlists) {
          const tracks = await getPlaylistTracks(this.props.accessToken, playlist.owner.id,
                                                 playlist.id, this.props.errorHandler);
          if (!!tracks) playlist.setTracks(tracks);
          this.setState({ playlists });
        }
      }
    }
  }

  async componentDidMount() {
    this.fetchData();
  }

  render() {

    if (this.state.user === undefined) {
      return <Loader/>;
    }

    if (this.state.playlists === undefined) {
      return (
        <div className="container" style={{ maxWidth: '1024px' }}>
          <Title>PLAYLISTMIXER</Title>
          <Subtitle>Hello {this.state.user.name}! Playlists are being loaded...</Subtitle>
        </div>
      );
    }

    return (
      <div
        className="container"
        style={{ maxWidth: '1024px' }}
        >
        {this.state.modalOpen && <UnsureResolver
          unsures={this.state.unsureDuplicates}
          onClose={this.handleUnsures}/>}
        <Title>PLAYLISTMIXER</Title>
        <Subtitle>Hello {this.state.user.name}! Select playlists you want to combine</Subtitle>
        <PlaylistContainer>
          {this.state.playlists.map((list) => {
            return (
                <PlaylistComponent key={list.id}
                  data={list}
                  handleSelection={this.handleSelection}/>
            );
          })}
        </PlaylistContainer>
        <StatusTextComponent
          playlists={this.state.selectedPlaylists} tracks={this.state.selectedTracks}/>
        <CreatePlaylistButton
          onClick={this.createNewPlaylist}>
            Create new playlist
          </CreatePlaylistButton>
      </div>
    );
  }
}

export default Application;
