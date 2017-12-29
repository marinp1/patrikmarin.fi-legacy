import * as contentful from 'contentful';

import { IProjectList, IProjectFields } from '../interfaces/IProject';


export function getContentfulClient(): contentful.ContentfulClientApi | undefined {

  if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_DELIVERY_API_TOKEN) {
    console.log('Required environment variables are missing!');
    return undefined;
  }
  return contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_DELIVERY_API_TOKEN as string,
  });
}

export function getProjects(client: contentful.ContentfulClientApi): Promise<IProjectFields[]> {
  return client.getEntries({
    content_type: 'projects',
    include: 10,
  }).then((response) => {
    if (response.items.length > 0) {
      const projectList: IProjectList = response.items[0].fields;
      return projectList.projects.map(_ => _.fields);
    }
    console.log('Fetch failed');
    return [];
  }).catch((error) => {
    console.log(error);
    return [];
  });
}
