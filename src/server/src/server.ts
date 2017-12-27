require('dotenv').config();

import * as express from 'express';
import * as path from 'path';
import * as url from 'url';

import { getContentfulClient, getProjects } from './fetch';

export default class Server {
  private app = express();

  private isProduction: boolean = process.env.NODE_ENV === 'production';

  private redisUrl = this.isProduction ?
    url.parse(process.env.REDIS_URL as string) :
    url.parse('http://localhost:6379');

  private cache = require('express-redis-cache')({
    expire: 120,
    host: this.redisUrl.hostname,
    port: this.redisUrl.port,
    auth_pass: this.redisUrl.auth ? this.redisUrl.auth.split(':')[1] : undefined,
  });

  private contentfulClient = getContentfulClient();

  constructor(){
    this.init();
  }

  init(){
    // Serve static files from the React app
    this.app.use(express.static(path.join(__dirname, 'client/build')));

    // Put all API endpoints under '/api'
    this.app.get('/api/projects',
      this.cache.route(),
        (req, res) => {
          if (this.contentfulClient !== undefined) {
            getProjects(this.contentfulClient).then((projects) => {
              res.send(projects);
            });
          } else {
            res.json({
              message: [],
            })
          }
        }
      )
    
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