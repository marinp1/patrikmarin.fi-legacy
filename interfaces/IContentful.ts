export interface IContentfulMetadata {
  space: IContentfulSpace;
  id: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  revision: number;
  locale: string;
  contentType?: IContentfulContentType;
}

interface IContentfulBasicMetadata {
  type: string;
  linkType: string;
  id: string;
}

interface IContentfulSpace {
  sys: IContentfulBasicMetadata;
}

interface IContentfulContentType {
  sys: IContentfulBasicMetadata;
}

export interface IContentfulImage {
  sys: IContentfulMetadata;
  fields: IContentfulImageFields;
}

interface IContentfulFile {
  url: string;
  details: IContentfulImageFileDetails;
  fileName: string;
  contentType: string;
}

interface IContentfulImageFileDetails {
  size: number;
  image: IContentfulImageFileDimensions;
}

interface IContentfulImageFileDimensions {
  width: number;
  height: number;
}

interface IContentfulImageFields {
  title: string;
  file: IContentfulFile;
  description?: string;
}