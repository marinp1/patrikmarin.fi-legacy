import * as fetch from 'isomorphic-fetch';
import { IFlickrPhoto, IFlickrPhotosResponse,
  IFlickrPhotosetsResponse } from './interfaces/IFlickr';
import { IFlickrPhotosetResponse } from './interfaces/IFlickrPhotoset';

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

export async function getFlickrPhotosetIds(url: string): Promise<IFlickrPhotosetsResponse> {
  const response = await fetch(url);

  if (response.status !== 200) return {
    albumNames: [],
    photosetIds: [],
  };

  const res: IFlickrPhotosetResponse = await response.json();

  const albumNames = Array.from(new Set(res.photosets.photoset.map(_ => _.title._content)));
  const photosetIds = res.photosets.photoset.map(_ => _.id);
  
  return {
    albumNames,
    photosetIds,
  };
}

export async function getFlickrImages(url: string, psId: string): Promise<IFlickrPhoto[]> {
  const API_KEY = `&api_key=${process.env.FLICKR_API_KEY}`;
  const USER_ID = `&user_id=${process.env.FLICKR_USER_ID}`;

  async function getPhotosetPhotos(id: string): Promise<IFlickrPhoto[]> {
    const GET_PHOTOS_URL = ENDPOINT + GET_PHOTOSET_PHOTOS + API_KEY + USER_ID + 
      `&photoset_id=${id}` + PER_PAGE + EXTRAS + FORMAT;
    
    const photosResponse = await fetch(GET_PHOTOS_URL);
    if (photosResponse.status !== 200) return [];

    const photosResult: IFlickrPhotosResponse = await photosResponse.json();
    photosResult.photoset.photo.forEach(_ => _.albumName = photosResult.photoset.title);

    return photosResult.photoset.photo;
  }

  return await getPhotosetPhotos(psId);

}
