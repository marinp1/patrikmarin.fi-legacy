# patrikmarin.fi
My portfolio website, recreated with React and TypeScript.

## Structure
Application's front-end is created with [create-react-app](https://github.com/facebookincubator/create-react-app) and uses [Skeleton CSS framework](http://getskeleton.com/).

Back-end contains a simple [express.js](http://expressjs.com/) server.

## Data
### Resume
Resume data is hosted locally and follows generally [JSON Resume](https://jsonresume.org/) standard, with the exception of estimated graduation date.
### Projects
Project data are fetched dynamically from [Contentful](https://www.contentful.com/) and the data is cached for two minutes with [Redis](https://redis.io/).
### Photography
Photographs are fetched from [Flickr](https://www.flickr.com/) and the data is also cached for two minutes.
### Location
Location is sent from a [React Native application](https://github.com/marinp1/patrikmarin-hub) that I created to act as a hub. Location is updated approximately every 30 minutes and shows the country and city where my phone is located. Location can also be removed from the application.

Small description about the location is fetched from Wikipedia using [DBpedia's](https://wiki.dbpedia.org/) SPARQL endpoint.

## Development
### Requirements
* Node
* Yarn
* Local redis server (e.g. `brew install redis`)

### Steps
1. Install dependencies in all main directories (**root**, **server**, **client**) with `yarn`
2. Create `.env` file in **server** with required parameters defined in `.env.template`.
3. Run `redis-server` with default parameters
4. Run `yarn run dev` while in root directory

## Testing
Currently CI runs only linter as no tests are defined. Tests could probably be added for testing redis cache and API calls.

## Deployment
Application is hosted on [Heroku](https://www.heroku.com/), update to master branch will automatically trigger a new deployment. Beta version of the site is available at [www.beta.patrikmarin.fi](http://www.beta.patrikmarin.fi) which is based on the dev-branch. Beta site has no SSL configured as it's a different Heroku application.

Simply creating a dyno with attached [Heroku Redis](https://elements.heroku.com/addons/heroku-redis) add-on and pushing to heroku will work fine.