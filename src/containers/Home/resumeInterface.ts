export interface ILocation {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

export interface IProfile {
  network: string;
  username: string;
  url: string;
}

export interface IBasics {
  name: string;
  label: string;
  picture: string;
  email: string;
  phone: string;
  website: string;
  summary: string;
  location: Location;
  profiles: IProfile[];
}

export interface IWork {
  company: string;
  position: string;
  website: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: any[];
}

export interface IEducation {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  gpa: string;
  courses: any[];
}

export interface IAward {
  title: string;
  date: string;
  awarder: string;
  summary: string;
}

export interface ISkill {
  name: string;
  level: string;
  keywords: string[];
}

export interface ILanguage {
  language: string;
  fluency: string;
}

export interface IResume {
  basics: IBasics;
  work: IWork[];
  volunteer: any[];
  education: IEducation[];
  awards: IAward[];
  publications: any[];
  skills: ISkill[];
  languages: ILanguage[];
  interests: any[];
  references: any[];
}
