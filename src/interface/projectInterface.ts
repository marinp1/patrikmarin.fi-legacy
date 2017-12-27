export enum ImageClassEnum {
  'PORTRAIT' = 'PORTRAIT',
  'NO_BG' = 'NO_BG',
}

export interface IThumbnail {
    name: string;
    backgroundImage: string;
    backgroundColor: string;
    backgroundPosition: string;
}

export interface ILink {
    text: string;
    url: string;
    icon: string;
}

export interface IImage {
    filename: string;
    altText: string;
    classes: ImageClassEnum[];
}

export interface IWhat {
    text: string;
    images: IImage[];
}

export interface IWhy {
    text: string;
    images: IImage[];
}

export interface ICurrentStatus {
    text: string;
    images: IImage[];
}

export interface IEntry {
    title: string;
    subtitle: string;
    links: ILink[];
    what: IWhat;
    why: IWhy;
    currentStatus: ICurrentStatus;
}

export interface IDirectLink {
  address: string;
}

export interface IProject {
    id: string;
    thumbnail: IThumbnail;
    entry?: IEntry;
    directLink: IDirectLink;
}