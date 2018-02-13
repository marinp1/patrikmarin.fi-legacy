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
    ':hover': {
      cursor: 'pointer',
      filter: 'brightness(80%)',
      transition: 'filter 0.2s',
    },
  },
});

interface ImageComponentProps {
  img: IThumbnailPhoto;
  index: number;
  onClick: (e: number) => void;
}

const ImageComponent: React.SFC<ImageComponentProps> = ({ img, onClick, index }) => {
  if (!img.width || !img.height) return null;
  const style = { width: `${img.width as number}px`, height: `${img.height as number}px` };
  return (
    <ImageContainer style={style} onClick={e => onClick(index)}>
      <img src={img.src}/>
    </ImageContainer>
  );
};

export default ImageComponent;
