import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import ErrorScreen from './ErrorScreen';

function parseHashString(hash: string): Map<string, string> {
  const hashMap = new Map<string,string>();
  hash.replace('#','').split('&').forEach((part: string) => {
    const pair = part.split('=');
    hashMap.set(pair[0], pair[1]);
  });
  return hashMap;
}

interface PlaylistMixerState {
  accessToken: string | undefined;
  errorMessage: string | undefined;
}

class PlaylistMixer extends React.Component<RouteComponentProps<any>, PlaylistMixerState> {

  constructor(props: RouteComponentProps<any>) {
    super(props);
    this.state = { accessToken: undefined, errorMessage: undefined };
    this.resetState = this.resetState.bind(this);
  }

  componentWillMount() {
    const hashes = parseHashString(this.props.location.hash);
    const accessToken = hashes.get('access_token');
    const errorMessage = hashes.get('error');
    this.setState({ accessToken, errorMessage });
  }

  resetState() {
    this.setState({ accessToken: undefined, errorMessage: undefined });
  }

  render() {
    document.body.style.backgroundColor = '#272822';
    document.body.style.backgroundImage = `url(${require('./images/dark_tile.png')})`;

    if (this.state.errorMessage) {
      return (
        <ErrorScreen msg={this.state.errorMessage} handleClick={this.resetState}/>
      );
    }

    if (!this.state.accessToken) {
      return (
        <LoginForm
          redirectUri={window.location.origin + window.location.pathname}/>
      );
    }

    return (
      <div>
        Hello
      </div>
    );
  }
}

export default withRouter(PlaylistMixer);
