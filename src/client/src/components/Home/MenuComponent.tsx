import * as React from 'react';
import glamorous from 'glamorous';

import { colors } from '../../styles';

const Navbar = glamorous.nav({
  height: '5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  color: '#000',
});

const NavItem = glamorous.ul({
  display: 'inline-block',
  margin: '0 1rem',
  cursor: 'pointer',
});

interface MenuComponentState {
  initialOffsetTop: number;
  selectedMode: string;
}

class MenuComponent extends React.Component<{}, MenuComponentState> {

  ref: null | HTMLDivElement = null;

  constructor(props: {}) {
    super(props);

    this.state = {
      initialOffsetTop: -1,
      selectedMode: 'default',
    };

    this.handleScroll = this.handleScroll.bind(this);

  }

  handleScroll() {
    if (!!this.ref) {
      if (this.state.initialOffsetTop === -1) {
        this.setState({ initialOffsetTop: this.ref.offsetTop });
      } else {
        if (this.ref.offsetTop > this.state.initialOffsetTop) {
          this.setState({
            selectedMode: 'dark',
          });
        } else {
          this.setState({
            selectedMode: 'default',
          });
        }
      }
    }
  }

  componentWillUpdate(nextProps: {}, nextState: MenuComponentState) {
    if (nextState.selectedMode !== this.state.selectedMode) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getStyle(mode: string): React.CSSProperties {
    if (mode === 'default') {
      return {
        background: colors.background,
      }
    }
    return {
      background: '#000',
    }
  }

  render() {
    return (
      <section
        ref={(input: HTMLDivElement) => { this.ref = input; }}
        style={{
          width: '100%',
          position: 'sticky',
          background: colors.white,
          top: 0,
          zIndex: 999999999, // Just be on top
        }}
      >
        <div>
          <div className="row">
            <Navbar style={this.getStyle(this.state.selectedMode)}>
                <NavItem>Resume</NavItem>
                <NavItem>Projects</NavItem>
                <NavItem>Photographs</NavItem>
            </Navbar>
          </div>
        </div>
      </section>
    );
  }
}

export default MenuComponent;
