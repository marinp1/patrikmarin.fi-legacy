import * as contentful from 'contentful';

import { IProjectList, IProjectFields } from './interfaces/IProject';

export function getContentfulClient(isProduction: boolean):
  contentful.ContentfulClientApi | undefined {

  const space = process.env.CONTENTFUL_SPACE_ID;
  const deliveryToken = process.env.CONTENTFUL_DELIVERY_API_TOKEN;
  const previewToken = process.env.CONTENTFUL_PREVIEW_API_TOKEN;

  if (!space) {
    console.log('Contentful space is missing!');
    return undefined;
  }

  // Return preview token in dev
  if (!isProduction && !!previewToken) {
    return contentful.createClient({
      space,
      accessToken: previewToken,
      host: 'preview.contentful.com',
    });
  }

  // Fallback to delivery token
  if (!!deliveryToken) {
    return contentful.createClient({
      space,
      accessToken: deliveryToken,
    });
  }

  console.log('Contentful access token missing!');
  return undefined;

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
