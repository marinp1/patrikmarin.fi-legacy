import * as React from 'react';
import glamorous from 'glamorous';

import { enableScrolling, disableScrolling } from '../../../utils/scrollToggler';
import { breakpoints, colors } from '../../../styles';
import { IThumbnailPhoto } from './imageUtils';

const Container = glamorous.div({
  background: 'rgba(0,0,0,0.8)',
  zIndex: 999,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const CloseButton = glamorous.div({
  position: 'absolute',
  top: '-4.5rem',
  right: '-0.5rem',
  height: '4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  color: colors.white,
  cursor: 'pointer',
  ':hover': {
    color: colors.lightGray,
  },
  '& i': {
    marginLeft: '0.5rem',
  },
});

const PreviousButton = glamorous.div({
  position: 'absolute',
  left: '-3rem',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  color: colors.white,
  cursor: 'pointer',
  ':hover': {
    color: colors.lightGray,
  },
  '& i': {
    marginRight: '0.5rem',
  },
});

const NextButton = glamorous.div({
  position: 'absolute',
  right: '-3rem',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  color: colors.white,
  cursor: 'pointer',
  ':hover': {
    color: colors.lightGray,
  },
  '& i': {
    marginLeft: '0.5rem',
  },
});

const DescriptionBox = glamorous.div({
  position: 'absolute',
  width: '100%',
  height: '4rem',
  bottom: '-4.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.white,
});

const ImageContainer = glamorous.div({
  border: `0.5rem solid ${colors.white}`,
  position: 'relative',
  lineHeight: 0,
});

interface LightboxComponentProps {
  images: IThumbnailPhoto[];
  currentIndex: number;
  unselectImage: () => void;
}

interface LightboxComponentState {
  currentIndex: number;
  loading: boolean;
}

class LightboxComponent extends React.Component<LightboxComponentProps, LightboxComponentState> {
  
  state = {
    currentIndex: this.props.currentIndex,
    loading: true,
  };

  componentDidMount() {
    (this.state.currentIndex >= 0) ? disableScrolling() : enableScrolling();
  }

  componentWillUpdate(nextProps: LightboxComponentProps, nextState: LightboxComponentState) {
    // Don't display lightbox on small screens
    if (window.innerWidth <= breakpoints.mobile && this.state.currentIndex !== -1) {
      this.closeLightbox();
    } else {
      if (nextProps.currentIndex >= 0 && this.state.currentIndex === -1) {
        disableScrolling();
        this.setState({ currentIndex: this.props.currentIndex, loading: true });
      } else if (nextProps.currentIndex === -1 && this.state.currentIndex >= 0) {
        enableScrolling();
        this.setState({ currentIndex: this.props.currentIndex, loading: true });
      }
    }
  }

  closeLightbox() {
    enableScrolling();
    this.setState({ currentIndex: -1 });
    this.props.unselectImage();
  }

  switchImage(hop: number) {
    this.setState({
      currentIndex: this.state.currentIndex + hop,
      loading: true,
    });
  }

  handleImageLoaded(e: React.SyntheticEvent<HTMLImageElement>) {
    this.setState({
      loading: false,
    });
  }

  render() {

    const currentImage = this.props.images[this.state.currentIndex];

    if (!currentImage) return null;

    let style: React.CSSProperties = currentImage.originalHeight > currentImage.originalWidth ?
      { height: '70%' } : { width: '70%', maxWidth: `${breakpoints.tablet}px` };

    if (this.state.loading) {
      style = { ...style, display: 'none' };
    } else {
      style = { ...style, display: 'block' };
    }

    const imgStyle: React.CSSProperties = currentImage.originalHeight > currentImage.originalWidth ?
      { height: '100%' } : { width: '100%' };

    return (
      this.state.currentIndex >= 0  && 
      <Container>
        { this.state.loading &&
          <i style={{ color: '#FFF' }} className="fa fa-circle-o-notch fa-spin fa-3x"/> }
        <ImageContainer style={style}>
          <CloseButton onClick={e => this.closeLightbox()}>
            CLOSE
            <i className="fa fa-times fa-lg"/>
          </CloseButton>
          { this.state.currentIndex !== this.props.images.length &&
            <NextButton onClick={e => this.switchImage(1)}>
              <i className="fa fa-caret-right fa-2x"/>
            </NextButton>
           }
          { this.state.currentIndex !== 0 &&
            <PreviousButton onClick={e => this.switchImage(-1)}>
              <i className="fa fa-caret-left fa-2x"/>
            </PreviousButton>
          }
          <img
            src={currentImage.largeSrc} style={imgStyle}
            onLoad={ e => this.handleImageLoaded(e) }
          />
          <DescriptionBox>
            <span>
              <b>{currentImage.title}</b> ({this.state.currentIndex + 1}/{this.props.images.length})
            </span>
          </DescriptionBox>
        </ImageContainer>
      </Container>
    );
  }

}

export default LightboxComponent;
