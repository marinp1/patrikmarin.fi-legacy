import * as contentful from 'contentful';

import { IProjectList, IProjectFields } from '../interfaces/IProject';

export const contentfulClient = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CONTENTFUL_SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_DELIVERY_API_TOKEN,
});

export function getProjects(client: contentful.ContentfulClientApi): Promise<IProjectFields[]> {
  return client.getEntries({
    content_type: 'projects',
    include: 10
  }).then((response) => {
    if (response.items.length > 0) {
      const projectList: IProjectList = response.items[0].fields;
      return projectList.projects.map(_ => _.fields);
    } else {
      console.log("Fetch failed");
      return [];
    }
  }).catch((error) => {
    console.log(error);
    return [];
  });
}