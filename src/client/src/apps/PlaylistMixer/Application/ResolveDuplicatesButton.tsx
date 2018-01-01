import * as React from 'react';
import glamorous from 'glamorous';

const Container = glamorous.div({

});

const ResolveDuplicatesButton: React.SFC<{ duplicateCount: number, onClick: (e:any) => void }>
= ({ duplicateCount, onClick }) => (
  <Container className="button button-primary u-full-width" onClick={e => onClick(e)}>
    Resolve duplicates ({duplicateCount})
  </Container>
);

export default ResolveDuplicatesButton;
