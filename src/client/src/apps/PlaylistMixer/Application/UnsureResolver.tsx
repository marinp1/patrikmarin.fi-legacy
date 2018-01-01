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
        <div>
          <TrackText><b>{this.props.track.artist}</b>: {this.props.track.name}</TrackText>
          <TrackText><i>{this.props.track.album.name}</i></TrackText>
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
});

const ResolverContainer = glamorous.div({
  padding: '2rem !important',
  background: '#FFF',
  borderRadius: '0.3rem',
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
}

interface UnsureResolverState {
  trackStatus: Map<Track, boolean>;
}

class UnsureResolver extends React.Component<UnsureResolverProps, UnsureResolverState> {

  constructor(props: UnsureResolverProps) {
    super(props);
    this.state = { trackStatus: new Map() };
    this.handleTrackSelection = this.handleTrackSelection.bind(this);
  }

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
    this.props.unsures.forEach((_) => {
      map.set(_.a, true);
      map.set(_.b, false);
    });
    this.setState({ trackStatus: map });
  }

  render() {
    return (
      <Container className="u-full-width">
        <ResolverContainer className="container">
          <Title>{this.props.unsures.length} unsure duplicates</Title>
          <Subtitle>Select which ones to save</Subtitle>
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
