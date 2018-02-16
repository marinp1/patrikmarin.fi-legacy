import * as React from 'react';
import glamorous from 'glamorous';

import { colors } from '../../styles';

const Navbar = glamorous.nav({
  height: '5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.2rem',
    ':last-child': {
      marginRight: 0,
    },
    ':hover': {
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  },
});

interface MenuComponentState {
  currentSection?: MenuLink;
}

interface MenuLink {
  title: string;
  elementId: string;
  backgroundColor: string;
  icon: string;
}

const menuContent: MenuLink[] = [
  {
    title: 'Resume',
    backgroundColor: '#b73ca2',
    elementId: 'description',
    icon: 'fa-user-circle',
  },
  {
    title: 'Projects',
    backgroundColor: '#3644ab',
    elementId: 'projects',
    icon: 'fa-desktop',
  },
  {
    title: 'Photography',
    backgroundColor: '#8eab36',
    elementId: 'photography',
    icon: 'fa-camera',
  },
];

class MenuComponent extends React.Component<{}, MenuComponentState> {

  ref: null | HTMLDivElement = null;

  constructor(props: {}) {
    super(props);

    this.state = {
      currentSection: undefined, 
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

      const projectsAnchor = document.getElementById('projects');
      const photographyAnchor = document.getElementById('photography');
      
      if (!!projectsAnchor && !!photographyAnchor) {

        const pastProjects =
          projectsAnchor.getBoundingClientRect().top - this.convertRemToPixels(2) <= 0;
        const pastPhotography =
          photographyAnchor.getBoundingClientRect().top - this.convertRemToPixels(2) <= 0;
        if (pastPhotography) {
          this.setState({ currentSection: menuContent[2] });
        } else if (pastProjects) {
          this.setState({ currentSection: menuContent[1] });
        } else if (isGlued) {
          this.setState({ currentSection: menuContent[0] });
        } else {
          this.setState({ currentSection: undefined });
        }

      }
    }
  }

  componentWillUpdate(nextProps: {}, nextState: MenuComponentState) {
    if (nextState.currentSection !== this.state.currentSection) {
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

  render() {

    const extraStyle: React.CSSProperties = !!this.state.currentSection ?
    {
      background: this.state.currentSection.backgroundColor,
      color: colors.white,
      transition: 'background 0.5s ease',
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
              {!!this.state.currentSection &&
                <CurrentText>
                  <i className={`fa ${this.state.currentSection.icon}`}
                    style={{ marginRight: '1rem' }}/>
                  { this.state.currentSection.title }
                </CurrentText>
              }
              {menuContent
                .filter((_) => {
                  return !this.state.currentSection || _.title !== this.state.currentSection.title;
                })
                .map((_, i) => {
                  return <NavItem key={i}>
                    <a href={'#' + _.elementId}>{_.title}</a>
                  </NavItem>;
                })
              }
            </Navbar>
          </div>
        </div>
      </section>
    );
  }
}

export default MenuComponent;
