import * as React from 'react';
import glamorous from 'glamorous';
import { getUserId, getUserPlaylists, getPlaylistTracks, createPlaylist } from './spotify';
import { Playlist, User, Track } from './classes';
import { getUniquetracks, TrackPair, ResolveResult } from './helpers';
import Loader from './Loader';
import PlaylistComponent from './PlaylistComponent';
import StatusTextComponent from './StatusTextComponent';
import UnsureResolver from './UnsureResolver';
import CreatePlaylistButton from './CreatePlaylistButton';
import ResolveDuplicatesButton from './ResolveDuplicatesButton';

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
  resolveResult: ResolveResult | undefined;
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
      resolveResult: undefined,
    };
    this.handleSelection = this.handleSelection.bind(this);
    this.createNewPlaylist = this.createNewPlaylist.bind(this);
    this.handleUnsures = this.handleUnsures.bind(this);
    this.handleUnsureResult = this.handleUnsureResult.bind(this);
  }

  handleSelection(playlist: Playlist) {
    if (this.state.selectedPlaylists.indexOf(playlist) !== -1) {
      const filteredList = this.state.selectedPlaylists.filter(_ => _.id !== playlist.id);
      const uniqueTracks = getUniquetracks(filteredList);
      this.setState({
        selectedPlaylists: filteredList,
        selectedTracks: uniqueTracks.uniques,
        unsureDuplicates: uniqueTracks.unsures,
        resolveResult: undefined,
      });
    } else {
      const newList = this.state.selectedPlaylists.concat(playlist);
      const uniqueTracks = getUniquetracks(newList);
      this.setState({
        selectedPlaylists: newList,
        selectedTracks: uniqueTracks.uniques,
        unsureDuplicates: uniqueTracks.unsures,
        resolveResult: undefined,
      });
    }
  }

  async createNewPlaylist(name: string) {
    const listName = name.trim();
    if (listName.length === 0) {
      console.log('List name cannot be empty');
      return;
    }
    if (this.state.selectedTracks.length === 0) {
      console.log('Cannot create empty list');
      return;
    }
    if (this.state.user === undefined) {
      this.props.errorHandler('Authorization error');
      return;
    }
    const createdList = await createPlaylist(this.props.accessToken, this.state.user.id, listName,
                                             this.state.selectedTracks, this.props.errorHandler);
    if (createdList !== undefined) {
      console.log('Playlist ', createdList.name, 'created!');
    } else {
      console.log('Error with creating playlist');
    }
  }

  handleUnsures() {
    this.setState({ modalOpen: true });
  }

  handleUnsureResult(result?: ResolveResult) {
    this.setState({ modalOpen: false });
    if (!!result) {
      const finalTracks = this.state.selectedTracks.filter((_) => {
        return (result.discarded.indexOf(_) === -1);
      });
      result.saved.forEach((_) => {
        if (finalTracks.indexOf(_) === -1) finalTracks.push(_);
      });
      this.setState({ selectedTracks: finalTracks, resolveResult: result });
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
        style={{ maxWidth: '1024px', marginBottom: '3rem' }}
        >
        {this.state.modalOpen && <UnsureResolver
          existingResult={this.state.resolveResult}
          unsures={this.state.unsureDuplicates}
          onClose={this.handleUnsureResult}/>}
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
        {this.state.unsureDuplicates.length > 0 &&
          <ResolveDuplicatesButton onClick={this.handleUnsures}
            duplicateCount={this.state.unsureDuplicates.length}/>}
        <CreatePlaylistButton
          onClick={this.createNewPlaylist}>
            Create new playlist
          </CreatePlaylistButton>
      </div>
    );
  }
}

export default Application;