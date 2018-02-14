import * as React from 'react';
import glamorous from 'glamorous';

import { enableScrolling, disableScrolling } from '../../../utils/scrollToggler';
import { breakpoints } from '../../../styles';
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

const Image = glamorous.img({
  // width: '70%',
  border: '0.5rem solid #FFF',
});

interface LightBoxComponentProps {
  images: IThumbnailPhoto[];
  currentIndex: number;
  unselectImage: () => void;
}

interface LightboxComponentState {
  currentIndex: number;
  loading: boolean;
}

class LightboxComponent extends React.Component<LightBoxComponentProps, LightboxComponentState> {
  
  state = {
    currentIndex: this.props.currentIndex,
    loading: true,
  };

  componentDidMount() {
    (this.state.currentIndex >= 0) ? disableScrolling() : enableScrolling();
  }

  componentWillUpdate(nextProps: LightBoxComponentProps, nextState: LightboxComponentState) {
    // Don't display lightbox on small screens
    if (window.innerWidth <= breakpoints.mobile && this.state.currentIndex !== -1) {
      enableScrolling();
      this.setState({ currentIndex: -1 });
      this.props.unselectImage();
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

  handleImageLoaded(e: React.SyntheticEvent<HTMLImageElement>) {
    this.setState({
      loading: false,
    });
  }

  render() {

    const currentImage = this.props.images[this.state.currentIndex];

    if (!currentImage) return null;

    let style: React.CSSProperties = currentImage.originalHeight > currentImage.originalWidth ?
      { height: '70%' } : { width: '70%' };

    if (this.state.loading) {
      style = { ...style, display: 'none' };
    } else {
      style = { ...style, display: 'block' };
    }

    return (
      this.state.currentIndex >= 0  && 
      <Container>
        { this.state.loading &&
          <i style={{ color: '#FFF' }} className="fa fa-circle-o-notch fa-spin fa-3x"/> }
        <Image
          src={currentImage.largeSrc}
          style={style}
          onLoad={ e => this.handleImageLoaded(e) }
        />
      </Container>
    );
  }

}

export default LightboxComponent;
