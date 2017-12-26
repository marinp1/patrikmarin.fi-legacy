import React from 'react'
import { Router, Route, Switch } from 'react-static'
//
import Home from 'containers/Home'
import About from 'containers/About'
import Blog from 'containers/Blog'
import NotFound from 'containers/404'

import './css/skeleton.css'
import './css/app.css'

export default () => (
  <Router>
    <div className="content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/blog" component={Blog} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)
