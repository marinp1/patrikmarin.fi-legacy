import * as React from 'react';
import glamorous from 'glamorous';

import { IThumbnailPhoto } from './imageUtils';
import { colors, mediaQueries } from '../../../styles';

const ImageContainer = glamorous.div({
  padding: '0.2rem',
  boxSizing: 'border-box',
  '& img': {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    border: '0.1rem solid #bbb',
    borderRadius: '0.5rem',
    [mediaQueries.mobile]: {
      ':hover': {
        cursor: 'pointer',
        filter: 'brightness(80%)',
        transition: 'filter 0.2s',
      },
    },
  },
});

const ImagePlaceHolder = glamorous.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  border: '0.1rem solid #bbb',
  borderRadius: '0.5rem',
  background: colors.lightGray,
});

interface ImageComponentProps {
  img: IThumbnailPhoto;
  index: number;
  onClick: (e: number) => void;
}

interface ImageComponentState {
  loading: boolean;
}

class ImageComponent extends React.Component<ImageComponentProps, ImageComponentState> {

  state = {
    loading: true,
  };

  handleImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    this.setState({
      loading: false,
    });
  }

  render() {
    if (!this.props.img.width || !this.props.img.height) return null;

    const style = {
      width: `${this.props.img.width as number}px`,
      height: `${this.props.img.height as number}px`,
    };

    const extraStyle = this.state.loading ? { display: 'none' } : { display: 'block' };

    return (
      <ImageContainer style={style} onClick={e => this.props.onClick(this.props.index)}>
        { this.state.loading &&
          <ImagePlaceHolder>
            <i className="fa fa-circle-o-notch fa-spin fa-lg"/>
          </ImagePlaceHolder>
        }
        <img style={extraStyle} src={this.props.img.src} onLoad={ e => this.handleImageLoad(e) }/>
      </ImageContainer>
    );
  }
}

export default ImageComponent;
