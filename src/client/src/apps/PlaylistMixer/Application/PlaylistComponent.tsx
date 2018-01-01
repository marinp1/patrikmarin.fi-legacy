import * as React from 'react';
import glamorous from 'glamorous';
import { Playlist } from './classes';
import { mediaQueries } from './styles';
import { timeToString } from './helpers';

const COMPONENT_SIZE = 6; // rem
const COMPONENT_PADDING = 1; // rem

const Wrapper = glamorous.div({
  width: '100%',
  [mediaQueries.tablet]: {
    width: '50%',
  },
  [mediaQueries.desktop]: {
    width: '33.33%',
  },
});

const Selector = glamorous.div({
  height: `${COMPONENT_SIZE + COMPONENT_PADDING * 2}rem`,
  width: '1.5rem',
  marginTop: `-${COMPONENT_PADDING}rem`,
  marginLeft: `-${COMPONENT_PADDING}rem`,
  marginRight: `${COMPONENT_PADDING}rem`,
  background: 'rgb(132,189,0)',
  borderRadius: '0.1rem 0 0 0.1rem',
});

const Container = glamorous.div({
  height: `${COMPONENT_SIZE}rem`,
  marginBottom: '0.8rem',
  marginRight: '0.8rem',
  padding: `${COMPONENT_PADDING}rem`,
  borderRadius: '0.2rem',
  display: 'flex',
  backgroundColor: '#f2f1ef',
  background: 'linear-gradient(to bottom, #f2f1ef 0%,#dedbd2 100%)',
  ':hover': {
    opacity: 0.9,
  },
});

const ImageContainer = glamorous.div({
  position: 'relative',
  height: `${COMPONENT_SIZE}rem`,
  width: `${COMPONENT_SIZE}rem`,
  marginRight: `${COMPONENT_PADDING}rem`,
  '& img': {
    width: 'inherit',
    border: '0.1rem solid #656565',
    borderRadius: '0.2rem',
    height: 'inherit',
  },
});

const Title = glamorous.h6({
  margin: 0,
  top: 0,
  color: '#272727',
  fontWeight: 'bold',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: '90%',
});

const Subtext = glamorous.p({
  color: '#4A4A4A',
  margin: 0,
  fontSize: '90%',
});

function runtimeToString(runtime: number): string {
  if (runtime === -1) return 'Loading...';
  return timeToString(runtime);
}

interface PlaylistComponentProps {
  data: Playlist;
  handleSelection: (playlist: Playlist) => void;
}

class PlaylistComponent extends React.Component<PlaylistComponentProps, {selected: boolean}> {

  constructor(props: PlaylistComponentProps) {
    super(props);
    this.state = { selected: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(list: Playlist) {
    if (list.runtime !== -1) {
      this.setState({ selected: !this.state.selected });
      this.props.handleSelection(list);
    }
  }

  render() {
    const loading = this.props.data.runtime === -1;
    const extraStyle: React.CSSProperties = {};
    if (loading) {
      extraStyle.background = '#b1b1b1';
    } else {
      extraStyle.cursor = 'pointer';
    }
    return (
      <Wrapper>
        <Container style={extraStyle} onClick={e => this.handleClick(this.props.data)}>
          {this.state.selected && <Selector/>}
          <ImageContainer>
            <img src={this.props.data.imageUrl}/>
          </ImageContainer>
          <div style={{ overflow: 'hidden' }}>
            <Title>{this.props.data.name}</Title>
            <Subtext>{this.props.data.length} songs</Subtext>
            <Subtext>{runtimeToString(this.props.data.runtime)}</Subtext>
          </div>
        </Container>
      </Wrapper>
    );
  }
}

export default PlaylistComponent;
