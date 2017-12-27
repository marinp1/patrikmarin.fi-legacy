import { IContentfulMetadata, IContentfulImage } from './IContentful';

export interface IThumbnail {
  sys: IContentfulMetadata;
  fields: IThumbnailFields;
}

export interface IThumbnailFields {
  name: string;
  image: IContentfulImage;
  backgroundColor: string;
  backgroundPosition: string;
}