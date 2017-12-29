import * as React from 'react';
import glamorous from 'glamorous';

import { mediaQueries, colors } from '../../styles';

const Container = glamorous.div({
  marginTop: '3rem',
  marginLeft: '2rem',
  marginRight: '2rem',
  [mediaQueries.mobile]: {
  	marginTop: '10rem',
    marginLeft: '5rem',
  	marginRight: '5rem',
  },
});

const Title = glamorous.h3({
  color: colors.white,
  fontWeight: 'bold',
  letterSpacing: '0.1rem',
});

const Subtitle = glamorous.h5({
  color: colors.lightGray,
  letterSpacing: '0.1rem',
  fontWeight: 'lighter',
  fontFamily: '"Lato", "sans serif"',
});

const NotFound = () => {
  document.title = '404 - Page not found!';
  document.body.style.background = '#111';
  document.body.style.height = 'auto';
  return (
    <Container>
      <Title>404 - PAGE NOT FOUND</Title>
      <Subtitle>To be, or not to be, that is the question...</Subtitle>
    </Container>
  );
};

export default NotFound;
