require('dotenv').config();

import * as express from 'express';
import * as path from 'path';

import { getContentfulClient, getProjects } from './contentful';
import { getRedisClient } from './redis';

export default class Server {
  private app = express();

  private contentfulClient = getContentfulClient();
  private isProduction: boolean = process.env.NODE_ENV === 'production';
  private REDIS_URL = this.isProduction ? process.env.REDIS_URL as string : 'http://localhost:6379';
  private cache = getRedisClient(this.REDIS_URL);

  constructor() {
    this.init();
  }

  init() {

    // Serve static files from the React app
    this.app.use(express.static(path.join(__dirname, '../../client/build')));

    // Put all API endpoints under '/api'
    this.app.get(
      '/api/projects',
      this.cache.route(),
      (req, res) => {
        if (this.contentfulClient !== undefined) {
          getProjects(this.contentfulClient).then((projects) => {
            res.send(projects);
          });
        } else {
          res.send([]);
        }
      },
    );

    this.app.get(
      '/apps/club-afterski',
      (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/build/apps/club-afterski/index.html'));
      },
    );

    this.app.get(
      '/apps/ruokalistat',
      (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/build/apps/ruokalistat/index.html'));
      },
    );

    this.app.get(
      '/resources/cv_patrik-marin_en_web.pdf',
      (req, res) => {
        // tslint:disable-next-line
        res.sendFile(path.join(__dirname, '../../client/build/resources/cv_patrik-marin_en_web.pdf'));
      },
    );
    
    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/build/index.html'));
    });

    const port = process.env.PORT || 5000;
    this.app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  }
}

new Server();
