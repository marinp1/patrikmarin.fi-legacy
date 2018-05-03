require('dotenv').config();

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import { getContentfulClient, getProjects, getRedirectProjects } from './contentful';
import { getFlickrURL, getFlickrImages } from './flickr';
import { getRedisClient } from './redis';
import { getACMEChallenge, forceSSL } from './ssl';

export default class Server {
  private app = express();

  private isProduction: boolean = process.env.NODE_ENV === 'production';

  private contentfulClient = getContentfulClient(this.isProduction);
  private flickrURL = getFlickrURL();
  
  private REDIS_URL = !!process.env.REDIS_URL ?
    process.env.REDIS_URL as string : 'http://localhost:6379';
  private cache = getRedisClient(this.REDIS_URL);

  private sslConfiguration = getACMEChallenge();

  constructor() {
    this.init();
  }

  init() {

    // Force SSL in production
    if (this.isProduction && !!this.sslConfiguration) {
      this.app.use(forceSSL);
    }

    // Doesn't work for some reason :( //FIXME
    this.app.use(bodyParser.text({ type: 'application/pgp-signature' }));

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
      '/api/redirects',
      this.cache.route(),
      (req, res) => {
        if (!!this.contentfulClient) {
          getRedirectProjects(this.contentfulClient).then((redirects) => {
            res.send(redirects);
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
          getFlickrImages(this.flickrURL).then((flickrResult) => {
            res.send(flickrResult);
          });
        } else {
          res.send([]);
        }
      },
    );

    // SSL certificate for custom domain
    if (!!this.sslConfiguration) {
      const configs = this.sslConfiguration;
      const challengeRoute = '/.well-known/acme-challenge';
      for (const config of configs) {
        this.app.get(
          `${challengeRoute}/${config.name}`,
          (req, res) => {
            res.send(config.value);
          },
        );
      }
    }

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
