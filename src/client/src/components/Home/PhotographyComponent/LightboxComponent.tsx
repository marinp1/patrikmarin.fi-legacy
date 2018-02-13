import * as React from 'react';
import glamorous from 'glamorous';

import { enableScrolling, disableScrolling } from '../../../utils/scrollToggler';
import { IThumbnailPhoto } from './imageUtils';

const Container = glamorous.div({
  background: 'rgba(0,0,0,0.8)',
  zIndex: 999,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: 'fixed',
});

interface LightBoxComponentProps {
  images: IThumbnailPhoto[];
  currentIndex: number;
}

interface LightboxComponentState {
  currentIndex: number;
}

class LightboxComponent extends React.Component<LightBoxComponentProps, LightboxComponentState> {
  
  state = {
    currentIndex: this.props.currentIndex,
  };

  componentDidMount() {
    (this.state.currentIndex >= 0) ? disableScrolling() : enableScrolling();
  }

  componentWillUpdate(nextProps: LightBoxComponentProps, nextState: LightboxComponentState) {
    if (nextProps.currentIndex >= 0 && this.state.currentIndex === -1) {
      disableScrolling();
      this.setState({ currentIndex: this.props.currentIndex });
    } else if (nextProps.currentIndex === -1 && this.state.currentIndex >= 0) {
      enableScrolling();
      this.setState({ currentIndex: this.props.currentIndex });
    }
  }

  render() {
    return (
      this.state.currentIndex >= 0 && <Container/>
    );
  }

}

export default LightboxComponent;
