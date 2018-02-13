import * as React from 'react';
import glamorous from 'glamorous';

import { colors, breakpoints } from '../../../styles';
import { IThumbnailPhoto, getThumbnailsWithSizes } from './imageUtils';
import ImageComponent from './ImageComponent';

const demoImages: IThumbnailPhoto[] = [
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

// Same width as a row of gallery images
const LoadMoreButton = glamorous.button({
  background: colors.lightGray,
  color: 'black',
  marginTop: '0.5rem',
  marginLeft: '0.2rem',
  width: 'calc(100% - 0.4rem)',
});

const GalleryContainer = glamorous.div({
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'flex-start',
  alignContent: 'stretch',
  alignItems: 'stretch',
  lineHeight: 0,
});

interface IGalleryState {
  rowsDisplayed: number;
  allVisible: boolean;
  thumbnails: IThumbnailPhoto[];
}

// Gets number of elements to be displayed on a row defined by component width
function getGalleryWidth(componentWidth: number): number {
  if (componentWidth <= breakpoints.mobile) return 2;
  if (componentWidth <= breakpoints.desktop) return 3;
  return 4;
}

// Numbers of image rows to load per iteration
const DEFAULT_ROW_CHUNK = 3;

class GalleryComponent extends React.Component<{}, IGalleryState> {

  ref: HTMLDivElement | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      rowsDisplayed: 1,
      allVisible: false,
      thumbnails: [],
    };
    this.refreshData = this.refreshData.bind(this);
  }

  loadImageRow() {
    this.setState({
      rowsDisplayed: this.state.rowsDisplayed + 1,
    });
  }

  componentDidUpdate(nextProps: {}, nextState: IGalleryState) {
    if (nextState.rowsDisplayed !== this.state.rowsDisplayed) {
      this.refreshData();
    }
  }

  refreshData() {
    if (!!this.ref) {
      const width = Math.floor((this.ref as HTMLDivElement).clientWidth - 1);
      const itemsPerRow = getGalleryWidth(width);
      const imagesToBeDisplayed = this.state.rowsDisplayed * DEFAULT_ROW_CHUNK * itemsPerRow;

      const demo = [...demoImages, ...demoImages, ...demoImages];
      const images = demo.slice(0, imagesToBeDisplayed);

      const allVisible = images.length >= demo.length;

      const thumbnails = getThumbnailsWithSizes(images, itemsPerRow, width);
      this.setState({
        thumbnails,
        allVisible,
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
          {this.state.thumbnails.map((img, i) => <ImageComponent key={`img-${i}`} img={img}/>)}
        </GalleryContainer>
        {!this.state.allVisible &&
          <LoadMoreButton
            onClick={ e => this.loadImageRow() }
          >
            Load more images
          </LoadMoreButton>
         }
      </div>
    );
  }
}

export default GalleryComponent;
