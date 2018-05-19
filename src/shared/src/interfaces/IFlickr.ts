export interface IFlickrPhoto {
    id: string;
    secret: string;
    server: string;
    farm: number;
    title: string;
    isprimary: string;
    ispublic: number;
    isfriend: number;
    isfamily: number;
    datetaken: string;
    datetakengranularity: string;
    datetakenunknown: string;
    url_z: string;
    height_z: string;
    width_z: string;
    url_l: string;
    height_l: string;
    width_l: string;
    albumName: string; // NOTE: CUSTOM FIELD
}

interface IFlickrPhotoset {
    id: string;
    primary: string;
    owner: string;
    ownername: string;
    photo: IFlickrPhoto[];
    page: number;
    per_page: number;
    perpage: number;
    pages: number;
    title: string;
    total: number;
}

export interface IFlickrPhotosResponse {
    photoset: IFlickrPhotoset;
    stat: string;
}

export interface IFlickrPhotosetsResponse {
    albumNames: string[];
    photosetIds: string[];
}
