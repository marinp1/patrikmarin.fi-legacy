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
import { toast, ToastContainer, ToastOptions } from 'react-toastify';

const Title = glamorous.h5({
  letterSpacing: '0.2rem',
  marginTop: '3rem',
  marginBottom: '1rem',
  color: '#f8f8f8',
  fontWeight: 'bold',
});

const Subtitle = glamorous.h6({
  marginBottom: '1.5rem',
  color: '#c8c8c8',
});

const Label = glamorous.p({
  color: '#c8c8c8',
  marginBottom: '1rem',
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
  resolveResult: ResolveResult | undefined; // Keep state of duplicate resolution
  searchValue: string;
}

class Application extends React.Component<ApplicationProps, ApplicationState> {

  initialStateValue: ApplicationState = {
    user: undefined,
    modalOpen: false,
    playlists: [],
    selectedPlaylists: [],
    selectedTracks: [],
    unsureDuplicates: [],
    resolveResult: undefined,
    searchValue: '',
  };

  constructor(props: ApplicationProps) {
    super(props);
    this.state = { ...this.initialStateValue };
    this.handleSelection = this.handleSelection.bind(this);
    this.createNewPlaylist = this.createNewPlaylist.bind(this);
    this.handleUnsures = this.handleUnsures.bind(this);
    this.handleUnsureResult = this.handleUnsureResult.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(value: string) {
    this.setState({ searchValue: value });
  }

  // Handle playlist selection, either add or remove the playlist from selected
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
      toast.warn('List name cannot be empty!');
      return;
    }
    if (this.state.selectedTracks.length === 0) {
      toast.warn('Cannot create empty list!');
      return;
    }
    if (this.state.user === undefined) {
      this.props.errorHandler('Authorization error');
      return;
    }

    const toastOptions: ToastOptions = {};
    toastOptions.autoClose = false;
    toast.info(`Creating playlist ${name}...`, toastOptions);

    const createdList = await createPlaylist(this.props.accessToken, this.state.user.id, listName,
                                             this.state.selectedTracks, this.props.errorHandler);
    if (createdList !== undefined) {
      toast.dismiss();
      this.refreshPage(createdList.name);
    } else {
      toast.error(`Error with creating playlist!`);
    }
  }

  // Simulate refresing the page
  refreshPage(listName: string) {
    toast.success(`Playlist! ${listName} created!`);
    // Reset relevant information
    this.setState({
      playlists: [],
      selectedPlaylists: [],
      selectedTracks: [],
      unsureDuplicates: [],
      resolveResult: undefined,
      searchValue: '',
    });
    this.fetchData();
  }

  // Open duplicate resolution modal
  handleUnsures() {
    this.setState({ modalOpen: true });
  }

  // Remove discarded tracks from selected tracks and add saved ones if they do not exist
  handleUnsureResult(result?: ResolveResult) {
    this.setState({ modalOpen: false });
    if (!!result) {
      const finalTracks = this.state.selectedTracks.filter((_) => {
        return (result.discarded.indexOf(_) === -1);
      });
      result.saved.forEach((_) => {
        if (finalTracks.indexOf(_) === -1) finalTracks.push(_);
      });
      toast.info(`Duplicate resolution saved.`);
      this.setState({ selectedTracks: finalTracks, resolveResult: result });
    }
  }

  // Get user and playlist data
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
        <ToastContainer />
        <Title>PLAYLISTMIXER</Title>
        <Subtitle>Hello {this.state.user.name}! Select playlists you want to combine</Subtitle>
        <Label>Filter playlists:</Label>
        <input className="u-full-width" type="text" value={this.state.searchValue}
          onChange={e => this.handleSearchChange(e.currentTarget.value)}/>
        <PlaylistContainer>
          {this.state.playlists.map((list) => {
            const isSelected = this.state.selectedPlaylists.indexOf(list) !== -1;
            const compVal = this.state.searchValue.toLowerCase().trim();
            if (isSelected || compVal.length === 0 ||
              list.name.toLowerCase().indexOf(compVal) !== -1) {
              return (
                <PlaylistComponent key={list.id}
                  data={list}
                  handleSelection={this.handleSelection}/>
              );
            }
            return null;
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
