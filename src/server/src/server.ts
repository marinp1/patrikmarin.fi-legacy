require('dotenv').config();

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as basicAuth from 'express-basic-auth';

import { getContentfulClient, getProjects, getRedirectProjects } from './contentful';
import { getFlickrURL, getFlickrImages, getFlickrPhotosetIds } from './flickr';
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

    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    // Serve static files from the React app
    this.app.use(express.static(path.join(__dirname, '../../client/build')));

    // Put all API endpoints under '/api'

    this.app.get(
      '/api/location',
      (req, res) => {
        this.cache.get('lastLocation', (error: any, entries: any[]) => {
          if (!!error) return res.sendStatus(404);
          try {
            const jsonResponse = JSON.parse(entries[0].body);
            return res.status(200).send(jsonResponse);
          } catch (e) {
            return res.sendStatus(404);
          }
        });
      }
    )

    this.app.get(
      '/api/projects',
      this.cache.route({
        expire: {
          200: 120,
          xxx: 1,
        },
      }),
      (req, res) => {
        if (this.contentfulClient !== undefined) {
          getProjects(this.contentfulClient).then((projects) => {
            res.status(200).send(projects);
          }).catch((e) => {
            res.status(404).send([]);
          });
        } else {
          res.status(404).send([]);
        }
      },
    );

    this.app.get(
      '/api/redirects',
      this.cache.route(),
      (req, res) => {
        if (!!this.contentfulClient) {
          getRedirectProjects(this.contentfulClient).then((redirects) => {
            res.status(200).send(redirects);
          }).catch((e) => {
            res.status(404).send([]);
          });
        } else {
          res.status(404).send([]);
        }
      },
    );

    this.app.get(
      '/api/photosets',
      this.cache.route({
        expire: {
          200: 120,
          xxx: 1,
        },
      }),
      (req, res) => {
        if (!!this.flickrURL) {
          getFlickrPhotosetIds(this.flickrURL).then((flickrResult) => {
            res.status(200).send(flickrResult);
          }).catch((e) => {
            res.status(404).send([]);
          });
        } else {
          res.status(404).send([]);
        }
      },
    );

    this.app.get(
      '/api/photoset/:id',
      this.cache.route({
        expire: {
          200: 120,
          xxx: 1,
        },
      }),
      (req, res) => {
        const photosetId = req.params.id;
        if (!!this.flickrURL && !!photosetId) {
          getFlickrImages(this.flickrURL, photosetId).then((flickrResult) => {
            res.status(200).send(flickrResult);
          }).catch((e) => {
            res.status(404).send([]);
          });
        } else {
          res.status(404).send([]);
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


    // Configure authentication

    if (!!process.env.LOCATION_ADMIN_NAME && !!process.env.LOCATION_ADMIN_PASSWORD) {
      const users = {};
      users[process.env.LOCATION_ADMIN_NAME] = process.env.LOCATION_ADMIN_PASSWORD;
      this.app.use(basicAuth({ users }));
    } else {
      this.app.use(basicAuth({ users: {} }));
    }

    // Paths that require authentication

    this.app.post(
      '/api/location',
      (req, res) => {
        const country = req.body.country || null;
        const city = req.body.city || null;
        const timestamp = req.body.timestamp || Date.now();
        // tslint-disable align
        if (country || city) {
          this.cache.add('lastLocation', JSON.stringify({
            city,
            country,
            timestamp,
          }), { expire: 86400*28, type: 'json' }, (error: any) => {
            if (!!error) return res.sendStatus(500);
            return res.sendStatus(200);
          });
        } else {
          res.sendStatus(500);
        }
      },
    );

    const port = process.env.PORT || 5000;
    this.app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  }
}

new Server();
