import * as React from 'react';
import glamorous from 'glamorous';

import { colors } from '../../styles';

const Container = glamorous.div({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
});

const Content = glamorous.div({
  margin: 'auto',
  padding: 0,
  color: colors.black,
});

const Loader = () => {
  document.title = 'Loading...';
  return (
    <Container>
      <Content>
        <i className="fa fa-circle-o-notch fa-spin fa-3x"/>
      </Content>
    </Container>
  );
};

export default Loader;
