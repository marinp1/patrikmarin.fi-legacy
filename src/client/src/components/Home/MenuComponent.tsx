import * as React from 'react';
import glamorous from 'glamorous';

import { colors } from '../../styles';

const Navbar = glamorous.nav({
  height: '5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // margin: 0,
  margin: 'auto',
  '& h6': {
    marginRight: 'auto',
  },
});

const CurrentText = glamorous.h6({
  color: '#FFF',
  textTransform: 'uppercase',
  margin: 0,
  fontWeight: 'bold',
  letterSpacing: '0.2rem',
  float: 'left',
});

const NavItem = glamorous.ul({
  display: 'inline-block',
  margin: '0 1rem',
  cursor: 'pointer',
  textTransform: 'uppercase',
  letterSpacing: '0.2rem',
  ':last-child': {
    marginRight: 0,
  }
});

interface MenuComponentState {
  selectedText: string;
  isGlued: boolean,
}

const demoContent = [
  'Resume',
  'Projects',
  'Photography',
]

class MenuComponent extends React.Component<{}, MenuComponentState> {

  ref: null | HTMLDivElement = null;

  constructor(props: {}) {
    super(props);

    this.state = {
      selectedText: 'default',
      isGlued: false,
    };

    this.handleScroll = this.handleScroll.bind(this);

  }

  convertRemToPixels(rem: number) {
    const comp = getComputedStyle(document.documentElement).fontSize;
    return !!comp ? rem * parseFloat(comp) : 0;
  }

  handleScroll() {
    if (!!this.ref) {

      const isGlued = this.ref.getBoundingClientRect().top === 0;

      //const resumeAnchor = document.getElementById('description');
      const projectsAnchor = document.getElementById('projects');
      const photographyAnchor = document.getElementById('photography');
      
      if (!!projectsAnchor && !!photographyAnchor) {

        //const pastResume =
        //  resumeAnchor.getBoundingClientRect().top - this.convertRemToPixels(2) <= 0;
        const pastProjects =
          projectsAnchor.getBoundingClientRect().top + this.convertRemToPixels(2) <= 0;
        const pastPhotography =
          photographyAnchor.getBoundingClientRect().top + this.convertRemToPixels(2) <= 0;
        if (pastPhotography) {
          this.setState({ isGlued, selectedText: 'Photography' });
        } else if (pastProjects) {
          this.setState({ isGlued, selectedText: 'Projects' });
        } else if (isGlued) {
          this.setState({ isGlued, selectedText: 'Resume' });
        } else {
          this.setState({ isGlued, selectedText: '' });
        }

      }
    }
  }

  componentWillUpdate(nextProps: {}, nextState: MenuComponentState) {
    if (nextState.selectedText !== this.state.selectedText) {
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

  getIcon(selectedText: string) {
    switch (selectedText) {
      case 'Resume':
        return 'fa-user-circle';
      case 'Projects':
        return 'fa-desktop';
      case 'Photography':
        return 'fa-camera';
      default:
        return 'fa-desktop';
    }
    
  }

  render() {

    const extraStyle: React.CSSProperties = this.state.isGlued ?
      {
        background: colors.black,
        color: colors.white,
      } :
      {
        background: colors.background,
        color: colors.black,
      };

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
          <div className="row" style={extraStyle}>
            <Navbar className="container">
              {demoContent.indexOf(this.state.selectedText) !== -1 &&
                <CurrentText>
                  <i className={`fa ${this.getIcon(this.state.selectedText)}`} style={{ marginRight: '1rem' }}/>
                  { this.state.selectedText }
                </CurrentText>
              }
               {demoContent.map((_, i) => {
                 return _ !== this.state.selectedText && 
                   <NavItem key={i}>{_}</NavItem>
               })}
            </Navbar>
          </div>
        </div>
      </section>
    );
  }
}

export default MenuComponent;
