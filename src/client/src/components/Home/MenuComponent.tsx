import * as React from 'react';
import glamorous from 'glamorous';

import { mediaQueries, colors } from '../../styles';

const ELEMENT_HEIGHT = 5;

const NavbarContainer = glamorous.div({
  background: colors.black,
  color: colors.white,
  [mediaQueries.mobile]: {
    background: colors.background,
    color: colors.black,
  }
});

const Navbar = glamorous.nav({
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
  height: `${ELEMENT_HEIGHT}rem`,
  lineHeight: `${ELEMENT_HEIGHT}rem`,
});

const DefaultText = glamorous.h6({
  display:'inline-block',
  color: '#FFF',
  textTransform: 'uppercase',
  margin: 0,
  fontWeight: 'bold',
  letterSpacing: '0.2rem',
  float: 'left',
  height: `${ELEMENT_HEIGHT}rem`,
  lineHeight: `${ELEMENT_HEIGHT}rem`,
  [mediaQueries.mobile]: {
    display: 'none',
  },
});

const WidescreenNavItem = glamorous.ul({
  display: 'none',
  [mediaQueries.mobile]: {
    display: 'inline-block',
    margin: '0 1rem',
    cursor: 'pointer',
    height: `${ELEMENT_HEIGHT}rem`,
    lineHeight: `${ELEMENT_HEIGHT}rem`,
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
  },
});

const NarrowScreenContainer = glamorous.div({
  position: 'absolute',
  top: `${ELEMENT_HEIGHT}rem`,
  zIndex: 999999999,
  textAlign: 'center',
  width: '100%',
  [mediaQueries.mobile]: {
    display: 'none',
  },
});

const NarrowScreenNavItem = glamorous.ul({
  display: 'block',
  cursor: 'pointer',
  height: `5rem`,
  lineHeight: `5rem`,
  margin: 0,
  borderTop: '0.1rem solid #fff',
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

const MenuButton = glamorous.div({
  display: 'inline-block',
  cursor: 'pointer',
  [mediaQueries.mobile]: {
    display: 'none',
  },
});

interface MenuComponentState {
  currentSection?: MenuLink;
  menuOpen: boolean;
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
      menuOpen: false,
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
      this.toggleMenu(false);
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

  toggleMenu(newValue: boolean = !this.state.menuOpen) {
    this.setState({ menuOpen: newValue });
  }

  render() {

    const sectionStyle: React.CSSProperties = !!this.state.currentSection ?
    {
      background: this.state.currentSection.backgroundColor,
      color: colors.white,
      transition: 'background 0.5s ease',
    } : { };

    let narrowSectionStyle = { ...sectionStyle };
    if (!this.state.currentSection) {
      narrowSectionStyle = {
        ...sectionStyle,
        background: colors.black,
        color: colors.white,
      }
    }

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
          <NavbarContainer className="row" style={sectionStyle}>
            <Navbar className="container">
              {
                !!this.state.currentSection &&
                <CurrentText>
                  <i className={`fa ${this.state.currentSection.icon}`}
                    style={{ marginRight: '1rem' }}/>
                  { this.state.currentSection.title }
                </CurrentText>
              }
              {
                !this.state.currentSection &&
                <DefaultText>
                  Menu
                </DefaultText>
              }
              <MenuButton onClick={e => this.toggleMenu()}>
                <i className="fa fa-bars fa-lg"/>
              </MenuButton>
              {
                menuContent
                  .filter((_) => {
                    return  !this.state.currentSection ||
                            _.title !== this.state.currentSection.title;
                  })
                  .map((_, i) => {
                    return <WidescreenNavItem key={i}>
                      <a href={'#' + _.elementId}>{_.title}</a>
                    </WidescreenNavItem>;
                  })
              }
            </Navbar>
            {
              this.state.menuOpen &&
              <NarrowScreenContainer
                style={narrowSectionStyle}>
                {
                  menuContent
                    .filter((_) => {
                      return  !this.state.currentSection ||
                              _.title !== this.state.currentSection.title;
                    })
                    .map((_, i) => {
                      return <NarrowScreenNavItem key={i}>
                        <a href={'#' + _.elementId}>{_.title}</a>
                      </NarrowScreenNavItem>;
                    })
                }
              </NarrowScreenContainer>
            }
          </NavbarContainer>
        </div>
      </section>
    );
  }
}

export default MenuComponent;
