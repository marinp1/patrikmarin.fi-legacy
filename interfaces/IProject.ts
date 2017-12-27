import { IContentfulMetadata } from './IContentful';
import { IEntry } from './IEntry';
import { IThumbnail } from './IThumbnail';

export interface IProjectList {
  id: string;
  projects: IProject[];
}

export interface IProject {
  sys: IContentfulMetadata;
  fields: IProjectFields;
}

export interface IProjectFields {
  id: string;
  thumbnail: IThumbnail;
  entry?: IEntry;
  directLink?: string;
}