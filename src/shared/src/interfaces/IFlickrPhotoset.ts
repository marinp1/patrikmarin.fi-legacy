interface IContentString {
    _content: string;
}

export interface IFlickrPhotoset {
    id: string;
    primary: string;
    secret: string;
    server: string;
    farm: number;
    photos: number;
    videos: number;
    title: IContentString;
    description: IContentString;
    needs_interstitial: number;
    visibility_can_see_set: number;
    count_views: string;
    count_comments: string;
    can_comment: number;
    date_create: string;
    date_update: string;
}

interface IFlickrPhotosets {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photoset: IFlickrPhotoset[];
}

export interface IFlickrPhotosetResponse {
    photosets: IFlickrPhotosets;
    stat: string;
}
