import * as React from 'react';
import glamorous from 'glamorous';

import { colors } from '../../../styles';

import { getThumbnailsWithSizes } from './imageUtils';
import { images } from './GalleryComponent';

const Container = glamorous.section({
  borderTop: `1px solid ${colors.lightGray}`,
  paddingTop: '4rem',
  background: colors.background,
  paddingBottom: '2rem',
  '& p': {
    color: colors.gray,
  },
});

const Title = glamorous.h6({
  textTransform: 'uppercase',
  fontWeight: 'bold',
});

class PhotographyComponent extends React.Component<{}, {}> {
  render() {

    getThumbnailsWithSizes(images, { itemsPerRow: 3 }, 200);

    return (
      <Container id="projects">
        <div className="container">
          <div className="row">
            <Title>
              <i className="fa fa-desktop" style={{ marginRight: '1rem' }}/>
              Photography
            </Title>
          </div>
        </div>
      </Container>
    );
  }
}

export default PhotographyComponent;
