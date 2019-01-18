import * as React from 'react';
import glamorous from 'glamorous';

import { colors, mediaQueries } from '../../styles';

const Container = glamorous.section({
  borderTop: `0.1rem solid ${colors.lightGray}`,
  background: colors.background,
  paddingTop: '2rem',
  paddingBottom: '2rem',
  '& p': {
    color: colors.gray,
  },
  [mediaQueries.tablet]: {
    borderRadius: '0.4rem 0.4rem 0 0',
  },
});

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
  marginTop: '-8rem',
  background: colors.background,
  borderRadius: '50%',
  '& img': {
    width: 'inherit',
    height: 'inherit',
    borderRadius: 'inherit',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  },
});


const ImageComponent: React.SFC<{image: any, altText: string}> = ({ image, altText }) => (
  <Container>
    <div className="container">
      <div className="row">
        <ImageContainer>
          <ImageHolder>
            <img src={image} alt={altText}/>
          </ImageHolder>
        </ImageContainer>
      </div>
    </div>
  </Container>
);

export default ImageComponent;
