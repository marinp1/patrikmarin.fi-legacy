export interface IFlickrPhoto {
    id: string;
    owner: string;
    secret: string;
    server: string;
    farm: number;
    title: string;
    ispublic: number;
    isfriend: number;
    isfamily: number;
    datetaken: string;
    datetakengranularity: string;
    datetakenunknown: string;
    url_z: string;
    height_z: string;
    width_z: string;
    url_h: string;
    height_h: any;
    width_h: any;
}

export interface IFlickrPhotos {
    page: number;
    pages: number;
    perpage: number;
    total: string;
    photo: IFlickrPhoto[];
}

export interface IFlickrResponse {
    photos: IFlickrPhotos;
    stat: string;
}