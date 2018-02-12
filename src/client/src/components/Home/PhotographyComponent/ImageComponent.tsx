import * as React from 'react';
import glamorous from 'glamorous';

import { IThumbnailPhoto } from './imageUtils';
// import { colors } from '../../../styles';

const ImageContainer = glamorous.div({
  padding: '0.2rem',
  boxSizing: 'border-box',
  '& img': {
    width: '100%',
    height: '100%',
  },
});

const ImageComponent: React.SFC<{img: IThumbnailPhoto}> = ({ img }) => {
  if (!img.width || !img.height) return null;
  const style = { width: `${img.width as number}px`, height: `${img.height as number}px` };
  return (
    <ImageContainer style={style}>
      <img src={img.src}/>
    </ImageContainer>
  );
};

export default ImageComponent;
