import * as fetch from 'isomorphic-fetch';
import { IFlickrPhoto, IFlickrPhotosResponse } from './interfaces/IFlickr';
import { IFlickrPhotosetResponse, IFlickrPhotoset } from './interfaces/IFlickrPhotoset';

const ENDPOINT = 'https://api.flickr.com/services/rest/';
// Get only public photos from user
const GET_LISTS_METHOD = '?method=flickr.photosets.getList';
const GET_PHOTOSET_PHOTOS = '?method=flickr.photosets.getPhotos';

// Just get the maximum amount of photos in a single request,
// there shouldn't be a reason to get more anytime soon.
// TODO: Parse through all photos if there are more than 500
const PER_PAGE = '&per_page=500';
const FORMAT = '&format=json&nojsoncallback=1';
const EXTRAS = '&extras=date_taken,url_z,url_l';

export function getFlickrURL(): string | undefined {
  if (!process.env.FLICKR_API_KEY || !process.env.FLICKR_USER_ID) {
    console.log('Required environment variables are missing!');
    return undefined;
  }

  const API_KEY = `&api_key=${process.env.FLICKR_API_KEY}`;
  const USER_ID = `&user_id=${process.env.FLICKR_USER_ID}`;

  const GET_LISTS_URL = ENDPOINT + GET_LISTS_METHOD + API_KEY + USER_ID + FORMAT;

  return GET_LISTS_URL;
}

export async function getFlickrImages(url: string): Promise<IFlickrPhoto[]> {
  const API_KEY = `&api_key=${process.env.FLICKR_API_KEY}`;
  const USER_ID = `&user_id=${process.env.FLICKR_USER_ID}`;

  const response = await fetch(url);
  if (response.status !== 200) return [];
  
  const res: IFlickrPhotosetResponse = await response.json();

  const photosets = res.photosets.photoset;

  async function getPhotosetPhotos(id: string): Promise<IFlickrPhoto[]> {

    const GET_PHOTOS_URL = ENDPOINT + GET_PHOTOSET_PHOTOS + API_KEY + USER_ID + 
      `&photoset_id=${id}` + PER_PAGE + EXTRAS + FORMAT;
    
    const photosResponse = await fetch(GET_PHOTOS_URL);
    if (photosResponse.status !== 200) return [];

    const photosResult: IFlickrPhotosResponse = await photosResponse.json();
    return photosResult.photoset.photo;

  }

  // Get all photos from all albums
  // https://stackoverflow.com/a/42497383
  const getPhotos = async () => {
    const promises = photosets.map(async (photoset) => {
        return await getPhotosetPhotos(photoset.id);
    });
    return Promise.all(promises);
  };

  const photos = await getPhotos();;

  return [].concat.apply([], photos);
}
