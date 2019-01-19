export interface ILocation {
  city?: string;
  country?: string;
  timestamp: number;
}

export interface ILocationInformation {
  city: string;
  country: string;
  information?: string;
}