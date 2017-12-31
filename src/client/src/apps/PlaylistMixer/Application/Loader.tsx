import * as React from 'react';
import glamorous from 'glamorous';

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
  color: '#FFF',
});

const Loader = () => {
  return (
    <Container>
      <Content>
        <i className="fa fa-circle-o-notch fa-spin fa-2x"/>
      </Content>
    </Container>
  );
};

export default Loader;
