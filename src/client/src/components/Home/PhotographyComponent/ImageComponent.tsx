import * as React from 'react';

import { IThumbnailPhoto } from './imageUtils';

const ImageComponent: React.SFC<{img: IThumbnailPhoto}> = ({ img }) => {
  if (!img.width || !img.height) return null;
  return <img width={img.width as number} height={img.height as number} src={img.src}/>;
};

export default ImageComponent;
