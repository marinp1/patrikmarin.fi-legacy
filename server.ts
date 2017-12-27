require('dotenv').config();

import * as express from 'express';
import * as path from 'path';

import { contentfulClient, getProjects } from './fetch';

export default class Server {
  private app = express();

  constructor(){
    this.init();
  }

  init(){
    // Serve static files from the React app
    this.app.use(express.static(path.join(__dirname, 'client/build')));

    // Put all API endpoints under '/api'
    this.app.get('/api/projects', (req, res) => {
      getProjects(contentfulClient).then((projects) => {
        res.json({
          message: JSON.parse(JSON.stringify(projects))
        })
      });
    })
    
    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });

    const port = process.env.PORT || 5000;
    this.app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`)
    });
  }
}

new Server();