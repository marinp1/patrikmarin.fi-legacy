import { IContentfulMetadata, IContentfulImage } from './IContentful';

export interface IEntry {
  sys: IContentfulMetadata;
  fields: IEntryFields;
}

export interface IEntryFields {
  title: string;
  subtitle: string;
  whatText: string;
  whyText: string;
  currentStatusText: string;
  links?: string[];
  whatImages?: IEntryImage[];
  whyImages?: IEntryImage[];
  currentStatusImages?: IEntryImage[];
}

export interface IEntryImage {
  sys: IContentfulMetadata;
  fields: IEntryImageFields;
}

export enum ImageClassEnum {
  'NO_BG' = 'NO_BG',
  'PORTRAIT' = 'PORTRAIT',
}

export interface IEntryImageFields {
  image: IContentfulImage;
  altText: string;
  classes: ImageClassEnum[];
}