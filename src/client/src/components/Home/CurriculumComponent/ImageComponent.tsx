import * as React from 'react';
import glamorous from 'glamorous';

import { colors, mediaQueries } from '../../../styles';

const ImageContainer = glamorous.div({
  [mediaQueries.tablet]: {
    maxWidth: '80%',
    margin: 'auto',
  },
});

const ImageHolder = glamorous.div({
  width: '10rem',
  height: '10rem',
  padding: '1rem',
  margin: 'auto',
  marginTop: '-7rem',
  background: colors.background,
  borderRadius: '50%',
  '& img': {
    width: 'inherit',
    height: 'inherit',
    borderRadius: 'inherit',
    border: `0.1rem solid ${colors.gray}`,
  },
});


const ImageComponent: React.SFC<{image: any}> = ({ image }) => (
  <ImageContainer>
    <ImageHolder>
      <img src={image} alt={'Patrik Marin'}/>
    </ImageHolder>
  </ImageContainer>
);

export default ImageComponent;
