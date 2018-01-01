import * as React from 'react';
import glamorous from 'glamorous';
import { Track } from './classes';
import { TrackPair, ResolveResult } from './helpers';

const TrackPairContainer = glamorous.div({
  paddingTop: '1rem',
  borderTop: '0.1rem solid #e1e1e1',
  ':last-child': {
    paddingBottom: '1rem',
    borderBottom: '0.1rem solid #e1e1e1',
  },
});

const TrackContainer = glamorous.div({
  padding: '1rem',
  background: '#ececec',
  border: '0.1rem solid #ccc',
  borderRadius: '0.2rem',
  marginBottom: '1rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.8,
  },
});

const TrackText = glamorous.p({
  margin: 0,
  padding: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

const TrackImageContainer = glamorous.div({
  height: '5rem',
  width: '5rem',
  marginRight: '1rem',
  '& img': {
    width: 'inherit',
    height: 'inherit',
    border: '0.1rem solid #656565',
    borderRadius: '0.2rem',
  },
});

class TrackComponent extends React.Component<
{track: Track, selected: boolean, onClick: (track: Track) => void}> {
  render() {
    const styles: React.CSSProperties = {};
    if (this.props.selected) {
      styles.background = '#abdc6e';
    } else {
      styles.background = 'rgb(236, 115, 115)';
    }

    return (
      <TrackContainer style={styles} onClick={e => this.props.onClick(this.props.track)}>
        <TrackImageContainer>
          <img src={this.props.track.album.imageUrl}/>
        </TrackImageContainer>
        <div style={{ overflow: 'hidden' }}>
          <TrackText>
            {this.props.track.artist} - <i>{this.props.track.album.name}</i>
          </TrackText>
          <TrackText><b>{this.props.track.name}</b></TrackText>
        </div>
      </TrackContainer>
    );
  }
}

const TrackPairComponent: React.SFC<{
  pair: TrackPair, trackStatuses: Map<Track, boolean>, onClick: (track: Track) => void}>
 = ({ pair, trackStatuses, onClick }) => {
   return (
    <TrackPairContainer className="row">
      <div className="six columns">
        <TrackComponent
          track={pair.a} selected={!!trackStatuses.get(pair.a)} onClick={onClick}/>
      </div>
      <div className="six columns">
        <TrackComponent
          track={pair.b} selected={!!trackStatuses.get(pair.b)} onClick={onClick}/>
      </div>
    </TrackPairContainer>
   );
 };

const Container = glamorous.div({
  zIndex: 99,
  position: 'fixed',
  display: 'flex',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,0.8)',
  paddingTop: '2rem',
  paddingBottom: '2rem',
});

const ResolverContainer = glamorous.div({
  padding: '2rem !important',
  background: '#FFF',
  borderRadius: '0.3rem',
  overflow: 'auto',
  maxHeight: '100%',
});

const Title = glamorous.h5({
  color: '#333',
});

const Subtitle = glamorous.p({
  color: '#666',
});

interface UnsureResolverProps {
  unsures: TrackPair[];
  onClose: (e: ResolveResult | undefined) => void;
  existingResult: ResolveResult | undefined;
}

interface UnsureResolverState {
  trackStatus: Map<Track, boolean>;
}

const CloseButton = glamorous.div({
  position: 'absolute',
  top: '2rem',
  right: '2rem',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.85,
  },
});

class UnsureResolver extends React.Component<UnsureResolverProps, UnsureResolverState> {

  constructor(props: UnsureResolverProps) {
    super(props);
    this.state = { trackStatus: new Map() };
    this.handleTrackSelection = this.handleTrackSelection.bind(this);
  }

  // Select or unselect track 
  handleTrackSelection(track: Track): void {
    const value = this.state.trackStatus.get(track);
    if (value !== undefined) {
      this.state.trackStatus.set(track, !value);
      this.setState({ trackStatus: this.state.trackStatus });
    }
  }

  generateResolveResult(): ResolveResult {
    const saved: Track[] = [];
    const discarded: Track[] = [];

    // Transform trackstatus map data into two arrays
    const iter = this.state.trackStatus.entries();
    let entry = iter.next();
    while (!!entry && !entry.done) {
      const track = entry.value[0];
      if (entry.value[1]) {
        saved.push(track);
      } else {
        discarded.push(track);
      }
      entry = iter.next();
    }

    return {
      saved,
      discarded,
    };
  }

  componentDidMount() {
    const map: Map<Track, boolean> = new Map();
    // If saved result exists, use that; otherwise initate that
    // 'left' side is saved and right side is discarded
    if (!!this.props.existingResult) {
      this.props.existingResult.saved.forEach(_ => map.set(_, true));
      this.props.existingResult.discarded.forEach(_ => map.set(_, false));
    } else {
      this.props.unsures.forEach((_) => {
        map.set(_.a, true);
        map.set(_.b, false);
      });
    }
    this.setState({ trackStatus: map });
  }

  render() {
    return (
      <Container className="u-full-width">
        <ResolverContainer className="container">
          <CloseButton onClick={e => this.props.onClose(undefined)}>
            <i className="fa fa-times-circle fa-2x" aria-hidden="true"></i>
          </CloseButton>
          <Title>{this.props.unsures.length} unsure duplicates</Title>
          <Subtitle>Select which songs of the duplicates to save to the new playlist</Subtitle>
          {this.props.unsures.map((_) => {
            return (
              <TrackPairComponent key={_.a.id + _.b.id} pair={_}
                trackStatuses={this.state.trackStatus} onClick={this.handleTrackSelection}/>
            );
          })}
          <button className="button-primary u-full-width"
            onClick={e => this.props.onClose(this.generateResolveResult())}>
            DONE
          </button>
        </ResolverContainer>
      </Container>
    );
  }
}

export default UnsureResolver;
