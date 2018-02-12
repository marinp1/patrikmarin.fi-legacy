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
  width: '100%',
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
}

class GalleryComponent extends React.Component<IGalleryProps, IGalleryState> {

  ref: HTMLDivElement | null = null;

  constructor(props: IGalleryProps) {
    super(props);
    this.state = {
      images: [],
    };
    this.refreshData = this.refreshData.bind(this);
  }

  refreshData() {
    if (!!this.ref) {
      const width = Math.floor((this.ref as HTMLDivElement).clientWidth - 1);
      const thumbnails = getThumbnailsWithSizes(images, this.props.itemsPerRow, width);
      this.setState({
        images: thumbnails,
      });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.refreshData);
    this.refreshData();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.refreshData);
  }

  render() {
    return (
      <div ref={(input: HTMLDivElement) => { this.ref = input; }}>
        <GalleryContainer>
          {this.state.images.map((img, i) => <ImageComponent key={`img-${i}`} img={img}/>)}
        </GalleryContainer>
      </div>
    );
  }
}

export default GalleryComponent;
