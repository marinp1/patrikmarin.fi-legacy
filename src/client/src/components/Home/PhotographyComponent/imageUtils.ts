interface IGalleryProps {
  itemsPerRow: number;
}

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

export function getThumbnailsWithSizes(
  thumbnails: IThumbnailPhoto[], gProps: IGalleryProps, rowWidth: number) {

  // Calculate ratios for each image
  const withRatios = thumbnails.map((_) => {
    const ratio = getThumbnailRatio(_);
    return { ..._, ratio };
  });
  
  // Divide into rows of predefined items
  const chunked = withRatios.map((e, i) => {
    return  i % gProps.itemsPerRow === 0 && withRatios.slice(i, i + gProps.itemsPerRow);
  }).filter(e => e) as IThumbnailPhoto[][];

  chunked.forEach((row) => {
    const totalRatios = row.reduce((a: number, b: IThumbnailPhoto) => a + (b.ratio as number), 0);
    // Get percentage of widths for images
    const scaledRatios = row.map(_ => (_.ratio as number) / totalRatios);
    console.log(scaledRatios);
  });
  
}
