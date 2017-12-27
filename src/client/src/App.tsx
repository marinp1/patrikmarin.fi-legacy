import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Project from './components/Project';

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path={'/project/:id'} component={Project} />
      </Switch>
    );
  }
}

export default Main;
