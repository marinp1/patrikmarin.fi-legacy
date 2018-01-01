import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Project from './components/Project';
import NotFound from './components/NotFound';
import PlaylistMixer from './apps/PlaylistMixer';

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path={'/project/:id'} component={Project} />
        <Route path={'/apps/playlistmixer'} component={PlaylistMixer} />
        <Route path="*" component={NotFound}/>
      </Switch>
    );
  }
}

export default Main;
