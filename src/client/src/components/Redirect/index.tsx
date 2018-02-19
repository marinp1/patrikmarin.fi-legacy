import * as React from 'react';
import glamorous from 'glamorous';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IRedirectResponse } from 'shared/interfaces/IEntry';

const Container = glamorous.div({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexFlow: 'column',
  margin: '0 4rem',
});

const Row = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  '& i': {
    marginRight: '2rem',
  },
  '& h5': {
    margin: 0,
  },
});

const Paragraph = glamorous.p({
  marginTop: '1rem',
  textAlign: 'center',
});

const Redirecting: React.SFC<{ url?: string }> = ({ url }) => (
  <React.Fragment>
    <Row>
      <i className="fa fa-circle-o-notch fa-spin fa-2x"/>
      <h5>Starting application...</h5>
    </Row>
    { !!url && <Paragraph>You will be redirected soon to {url}</Paragraph> }
  </React.Fragment>
);

const NotFound: React.SFC<{ url?: string }> = ({ url }) => (
  <React.Fragment>
    <Row>
      <i className="fa fa-ban fa-2x"/>
      <h5>Application not found!</h5>
    </Row>
    { !!url && <Paragraph>Received invalid status code from {url}.</Paragraph> }
  </React.Fragment>
);

interface RedirectState {
  url?: string;
  error: boolean;
}

class Redirect extends React.Component<RouteComponentProps<any>, RedirectState> {

  state = {
    url: undefined,
    error: false,
  };

  async loadPage(url: string) {
    try {
      const res = await fetch(url, { mode: 'no-cors' });
      // Failed cors request means that the site is running
      if (res.status === 0) {
        window.location.replace(url);
      } else {
        this.setState({ error: true });
      }
    } catch (e) {
      this.setState({ error: true });
    }
  }

  async componentDidMount() {
    try {
      const apps = await fetch('/api/redirects');
      const response: IRedirectResponse[] = await apps.json();

      const app = response.find(_ => _.id === this.props.match.params.id);

      if (!app) {
        this.setState({ error: true });
      } else {
        this.setState({ url: decodeURIComponent(app.url) });
        this.loadPage(decodeURIComponent(app.url));
      }

    } catch (e) {
      this.setState({ error: true });
    }
  }
  
  render() {
    return (
      <Container>
        { this.state.error
          ? <NotFound url={this.state.url}/>
          : <Redirecting url={this.state.url}/> }
      </Container>
    );
  }

}

export default withRouter(Redirect);
