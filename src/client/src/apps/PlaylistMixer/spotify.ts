import * as url from 'url';

export function getUserId(api: any, errorHandler: (e: any) => void): string {
  return api.getMe()
    .then(
      (data: any) => {
        return data.body.id;
      }, 
      (error: any) => {
        errorHandler(error);
      });
}


export function getUserPlaylists(api: any, id: string, errorHandler: (e: any) => void) {

  /*
  function getNext(offset: number) {
    api.getUserPlaylists(id, { limit: 20, offset: 1 })
    .then(
      (data: any) => {
        console.log(data);
      }, 
      (error: any) => {
        errorHandler(`${error.name}: ${error.message}`);
      });
  }
  */

  api.getUserPlaylists(id, { limit: 10 })
  .then(
    (data: any) => {
      if (data.body.next) {
        const nextUrl = url.parse(data.body.next);
        if (nextUrl.query !== undefined) {
          console.log(nextUrl);
        }
      }
      console.log(data.body.next);
    }, 
    (error: any) => {
      errorHandler(`${error.name}: ${error.message}`);
    });
}
