import * as fetch from 'isomorphic-fetch';
import { IFlickrResponse, IFlickrPhoto } from './interfaces/IFlickr';

const ENDPOINT = 'https://api.flickr.com/services/rest/';
// Get only public photos from user
const METHOD = '?method=flickr.people.getPublicPhotos';

// Just get the maximum amount of photos in a single request,
// there shouldn't be a reason to get more anytime soon.
// TODO: Parse through all photos if there are more than 500
const PER_PAGE = '&per_page=500';
const FORMAT = '&format=json&nojsoncallback=1';
const EXTRAS = '&extras=date_taken,url_z,url_h';

export function getFlickrURL(): string | undefined {
  if (!process.env.FLICKR_API_KEY || !process.env.FLICKR_USER_ID) {
    console.log('Required environment variables are missing!');
    return undefined;
  }

  const API_KEY = `&api_key=${process.env.FLICKR_API_KEY}`;
  const USER_ID = `&user_id=${process.env.FLICKR_USER_ID}`;

  const FETCH_URL = ENDPOINT + METHOD + API_KEY + USER_ID + PER_PAGE + EXTRAS + FORMAT;

  return FETCH_URL;
}

export async function getFlickrImages(url: string): Promise<IFlickrPhoto[]> {

  const response = await fetch(url);
  if (response.status !== 200) return [];
  
  const res: IFlickrResponse = await response.json();
  return res.photos.photo;

}
