export enum ImageClassEnum {
  'PORTRAIT',
  'NO-BG'
}

export interface IThumbnail {
    name: string;
    backgroundImage: string;
    backgroundColor: string;
    backgroundPosition: string;
}

export interface ILinks {
    github: string;
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
    links: ILinks;
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