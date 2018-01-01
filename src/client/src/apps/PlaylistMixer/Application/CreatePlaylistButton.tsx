import * as React from 'react';
import glamorous from 'glamorous';
import { mediaQueries } from './styles';

const createImage = require('../images/create_playlist-green.png');

const Container = glamorous.div({
  width: '100% !important',
  display: 'block',
  [mediaQueries.mobile]: {
    width: '100% !important',
    display: 'flex',
    flexDirection: 'row',
  },
});

const PlaylistName = glamorous.input({
  width: '98%',
  display: 'block',
  [mediaQueries.mobile]: {
    marginRight: '0.8rem',
    width: 'auto',
    display: 'inline-block',
    listStyle: 'none',
    flexGrow: 1,
  },
});

const Button = glamorous.input({
  height: '38px',
  width: '158px',
  borderRadius: '0.3rem',
  display: 'block',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.85,
  },
  [mediaQueries.mobile]: {
    width: 'auto',
  },
});

class CreatePlaylistButton
  extends React.Component<{ onClick: (name: string) => void}, {playlistName: string }> {

  constructor(props: { onClick: (name: string) => void, noMarginRight: boolean }) {
    super(props);
    this.state = { playlistName: 'MixedPlaylist' };
    this.onPlaylistValueChange = this.onPlaylistValueChange.bind(this);
  }

  onPlaylistValueChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ playlistName: e.currentTarget.value });
  }

  render() {
    return (
      <Container className="row">
        <PlaylistName type="text"
          value={this.state.playlistName}
          onChange={e => this.onPlaylistValueChange(e)}/>
        <Button className="button-primary"
          onClick={e => this.props.onClick('Blaa')}
          type="image" src={createImage}/>
      </Container>
    );
  }
}

export default CreatePlaylistButton;
