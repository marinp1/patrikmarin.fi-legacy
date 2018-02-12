export interface IThumbnailPhoto {
  src: string;
  originalWidth: number;
  originalHeight: number;
  ratio?: number;
  width?: number;
  height?: number;
}

// https://stackoverflow.com/a/29101013
function round(value: number, decimals: number) {
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
}

// Gets width to height - ratio for thumbnails
function getThumbnailRatio(thumbnail: IThumbnailPhoto): Number {
  return round(thumbnail.originalWidth / thumbnail.originalHeight, 2);
}

// Partly ported from
// https://github.com/neptunian/react-photo-gallery/blob/master/src/utils.js
export function getThumbnailsWithSizes(
  thumbnails: IThumbnailPhoto[], columnCount: number, rowWidth: number): IThumbnailPhoto[] {

  // Calculate ratios for each image
  const withRatios = thumbnails.map((_) => {
    const ratio = getThumbnailRatio(_);
    return { ..._, ratio };
  });
  
  // Divide into chunks of predefined length
  const chunked = withRatios.map((e, i) => {
    return  i % columnCount === 0 && withRatios.slice(i, i + columnCount);
  }).filter(e => e) as IThumbnailPhoto[][];

  const withSizes = chunked.map((row) => {

    // Get total ratio for images in the row
    const totalRatio = row.reduce((a: number, b: IThumbnailPhoto) => a + (b.ratio as number), 0);

    // Calculate initial scaled pixel width and height for images in the row
    const newRow = row.map((elem, i) => {
      const width = row.length === columnCount ? 
        Math.floor(((elem.ratio as number) / totalRatio) * rowWidth) :
        Math.floor(((elem.ratio as number) / totalRatio / (columnCount / row.length)) * rowWidth);
      const height = Math.floor((width / elem.originalWidth) * elem.originalHeight);
      return {
        ...elem,
        width,
        height,
      };
    });

    // Make small adjustments for images in the row to fill all the available space
    // and correct rounding errors
    const maxRowHeight: number = Math.max.apply(Math, newRow.map(_ => _.height));
    const unusedSpace = rowWidth - newRow.reduce((a, b) => a + b.width, 0);

    return newRow.map((_, i) => {
      return (i % columnCount === 0 && newRow.length === columnCount) ?
        { ..._, height: maxRowHeight, width: _.width + unusedSpace } :
        { ..._, height: maxRowHeight };
    });

  });

  return [].concat.apply([], withSizes);
  
}
