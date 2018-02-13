require('dotenv').config();

import * as express from 'express';
import * as path from 'path';

import { getContentfulClient, getProjects } from './contentful';
import { getFlickrURL, getFlickrImages } from './flickr';
import { getRedisClient } from './redis';

export default class Server {
  private app = express();

  private contentfulClient = getContentfulClient();
  private flickrURL = getFlickrURL();
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
      '/api/photos',
      this.cache.route(),
      (req, res) => {
        if (!!this.flickrURL) {
          getFlickrImages(this.flickrURL).then((images) => {
            res.send(images);
          });
        } else {
          res.send([]);
        }
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
