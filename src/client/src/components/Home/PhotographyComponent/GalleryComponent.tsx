import * as React from 'react';
import glamorous from 'glamorous';

import { IThumbnailPhoto, getThumbnailsWithSizes } from './imageUtils';
import ImageComponent from './ImageComponent';

const images: IThumbnailPhoto[] = [
  {
    src: require('./images/photo_1.jpg'),
    originalWidth: 800,
    originalHeight: 533,
  },
  {
    src: require('./images/photo_2.jpg'),
    originalWidth: 800,
    originalHeight: 533,
  },
  {
    src: require('./images/photo_3.jpg'),
    originalWidth: 800,
    originalHeight: 533,
  },
  {
    src: require('./images/photo_4.jpg'),
    originalWidth: 800,
    originalHeight: 533,
  },
  {
    src: require('./images/photo_5.jpg'),
    originalWidth: 800,
    originalHeight: 533,
  },
  {
    src: require('./images/photo_6.jpg'),
    originalWidth: 800,
    originalHeight: 1195,
  },
  {
    src: require('./images/photo_7.jpg'),
    originalWidth: 800,
    originalHeight: 533,
  },
];

const GalleryContainer = glamorous.div({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'flex-start',
  alignContent: 'stretch',
  alignItems: 'stretch',
  lineHeight: 0,
});

interface IGalleryProps {
  itemsPerRow: number;
}

interface IGalleryState {
  images: IThumbnailPhoto[];
  width: number;
}

class GalleryComponent extends React.Component<IGalleryProps, IGalleryState> {

  state = {
    images: [],
    width: 800,
  };

  componentDidMount() {
    const thumbnails = getThumbnailsWithSizes(images, this.props.itemsPerRow, this.state.width);
    this.setState({
      images: thumbnails,
    });
  }

  render() {
    return (
      <GalleryContainer>
        {this.state.images.map((img, i) => <ImageComponent key={`img-${i}`} img={img}/>)}
      </GalleryContainer>
    );
  }
}

export default GalleryComponent;
