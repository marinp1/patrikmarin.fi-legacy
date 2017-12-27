import React from 'react'
import { Router } from 'react-static'
import Routes from 'react-static-routes'
//

import './css/normalize.css'
import './css/skeleton.css'
import './css/app.css'

export default () => (
  <Router>
    <div className="content">
      <Routes />
    </div>
  </Router>
)
