import * as React from 'react';
import glamorous from 'glamorous';

import { mediaQueries, colors } from '../../styles';

import { animateToElement } from '../../utils/smoothScroller';

const ELEMENT_HEIGHT = 5;

const MOBILE_NAVBAR_DEFAULT_BG = 'rgba(0,0,0,0.35)';

const Section = glamorous.section({
  width: '100%',
  position: 'fixed',
  top: 0,
  zIndex: 998, // Just under lightbox component
  [mediaQueries.tablet]: {
    position: 'sticky',
  },
});

const NavbarContainer = glamorous.div({
  background: MOBILE_NAVBAR_DEFAULT_BG,
  color: colors.white,
  [mediaQueries.tablet]: {
    background: colors.background,
    color: colors.black,
  },
});

const Navbar = glamorous.nav({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
  '& h6': {
    marginRight: 'auto',
  },
  '& div:first-child': {
    marginRight: 'auto',
  },
});

const CurrentText = glamorous.h6({
  color: '#FFF',
  margin: 0,
  float: 'left',
  height: `${ELEMENT_HEIGHT}rem`,
  lineHeight: `${ELEMENT_HEIGHT}rem`,

  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.2rem',
    ':hover': {
      color: 'inherit',
      textDecoration: 'none',
    },
  },

});

const DefaultText = glamorous.h6({
  display:'inline-block',
  color: '#FFF',
  textTransform: 'uppercase',
  margin: '0 0 0 2rem',
  fontWeight: 'bold',
  letterSpacing: '0.2rem',
  float: 'left',
  height: `${ELEMENT_HEIGHT}rem`,
  lineHeight: `${ELEMENT_HEIGHT}rem`,
});

const WidescreenNavItem = glamorous.div({
  display: 'none',
  [mediaQueries.tablet]: {
    display: 'inline-block',
    margin: '0 1.5rem',
    height: `${ELEMENT_HEIGHT}rem`,
    lineHeight: `${ELEMENT_HEIGHT}rem`,
    '& a': {
      cursor: 'pointer',
      color: 'inherit',
      textDecoration: 'none',
      textTransform: 'uppercase',
      letterSpacing: '0.2rem',
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
  marginBottom: 0,
  textAlign: 'center',
  width: '100%',
  overflowY: 'hidden',
  transformOrigin: '0% 0%',
  [mediaQueries.tablet]: {
    display: 'none',
  },
});

const NarrowScreenNavItem = glamorous.div({
  display: 'block',
  height: `5rem`,
  lineHeight: `5rem`,
  margin: 0,
  borderTop: '0.1rem solid #fff',
  '& a': {
    cursor: 'pointer',
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
  [mediaQueries.tablet]: {
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
    backgroundColor: '#B73CA2',
    elementId: 'description',
    icon: 'fa-file-text',
  },
  {
    title: 'Projects',
    backgroundColor: '#2892D7',
    elementId: 'projects',
    icon: 'fa-desktop',
  },
  {
    title: 'Photography',
    backgroundColor: '#00BFB2',
    elementId: 'photography',
    icon: 'fa-camera',
  },
];

function convertRemToPixels(rem: number) {
  const comp = getComputedStyle(document.documentElement).fontSize;
  return !!comp ? rem * parseFloat(comp) : 0;
}

interface ScrollableAnchorProps {
  id: string;
  callback: () => void;
}

class ScrollableAnchor extends React.Component<ScrollableAnchorProps, {}>  {
  constructor(props: ScrollableAnchorProps) {
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  navigate(e: React.MouseEvent<HTMLAnchorElement>) {
    const elem = document.querySelector('#' + this.props.id);
    if (!!elem) {
      e.preventDefault();
      animateToElement(elem);
      this.props.callback();
    }
  }

  render() {
    return (
      <a onClick={this.navigate}
        href={'#' + this.props.id}>
        { this.props.children }
      </a>
    );
  }
}

const logo = require('./images/logo_0.5x.png');

const LogoContainer = glamorous.div({
  height: `${ELEMENT_HEIGHT}rem`,
  width: 'auto',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  [mediaQueries.tablet]: {
    display: 'none',
  },
});

const LogoComponent: React.SFC<{ title: string }> = ({ title }) => (
  <LogoContainer>
    <img height="60%" src={logo}/>
    <DefaultText>
      {title}
    </DefaultText>
  </LogoContainer>
);

class MenuComponent extends React.Component<{}, MenuComponentState> {

  ref: null | HTMLDivElement = null;

  constructor(props: {}) {
    super(props);

    this.state = {
      currentSection: undefined,
      menuOpen: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

  }

  handleScroll() {
    if (!!this.ref) {

      const isGlued = this.ref.getBoundingClientRect().top <= 0;

      const descriptionAnchor = document.getElementById('description');
      const projectsAnchor = document.getElementById('projects');
      const photographyAnchor = document.getElementById('photography');
      
      if (!!projectsAnchor && !!photographyAnchor && !!descriptionAnchor) {

        const pastDescription =
          descriptionAnchor.getBoundingClientRect().top - convertRemToPixels(6) <= 0;
        const pastProjects =
          projectsAnchor.getBoundingClientRect().top - convertRemToPixels(8) <= 0;
        const pastPhotography =
          photographyAnchor.getBoundingClientRect().top - convertRemToPixels(8) <= 0;

        if (pastPhotography) {
          if (this.state.currentSection !== menuContent[2]) {
            this.setState({ currentSection: menuContent[2] });
          }
        } else if (pastProjects) {
          if (this.state.currentSection !== menuContent[1]) {
            this.setState({ currentSection: menuContent[1] });
          }
        } else if (pastDescription && isGlued) {
          if (this.state.currentSection !== menuContent[0]) {
            this.setState({ currentSection: menuContent[0] });
          }
        } else {
          if (!!this.state.currentSection) {
            this.setState({ currentSection: undefined });
          }
        }

      }
    }
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

  getSectionStyle(): React.CSSProperties {
    return !!this.state.currentSection ? {
      background: this.state.currentSection.backgroundColor,
      color: colors.white,
      transition: 'background 0.5s ease',
    } : { };
  }

  getNarrowSectionStyle(sectionStyle: React.CSSProperties): React.CSSProperties {
    const menuOpen = Number(this.state.menuOpen);
    const translationStyle = {
      transform: `scaleY(${menuOpen})`,
      transition: 'all 0.5s ease',
    };
    return !this.state.currentSection ? {
      ...sectionStyle,
      ...translationStyle,
      background: MOBILE_NAVBAR_DEFAULT_BG,
      color: colors.white,
    } : {
      ...sectionStyle,
      ...translationStyle,
    };
  }

  getWidescreenNavStyle(): React.CSSProperties {
    const NAV_WIDTH =  Math.floor(100 / menuContent.length);
    return !this.state.currentSection ? {
      width: `${NAV_WIDTH}%`,
      textAlign: 'center',
      fontSize: '105%',
      margin: 0,
    } : { };
  }

  render() {

    const sectionStyle = this.getSectionStyle();
    const narrowSectionStyle = this.getNarrowSectionStyle(sectionStyle);
    const widescreenNavExtraStyles = this.getWidescreenNavStyle();

    // Get all elements which are not selected
    const inActiveElements = menuContent.filter((_) => {
      return _ !== this.state.currentSection;
    });

    return (
      <Section className="force-sticky">
        <div ref={(input: HTMLDivElement) => { this.ref = input; }}>
          <NavbarContainer className="row" style={sectionStyle}>
            <Navbar className="container">
              {
                !!this.state.currentSection &&
                <CurrentText>
                  <i className={`fa ${this.state.currentSection.icon}`}
                    style={{ marginRight: '1rem' }}/>
                  <ScrollableAnchor id={this.state.currentSection.elementId}
                    callback={() => this.toggleMenu(false)}
                  >
                    { this.state.currentSection.title }
                  </ScrollableAnchor>
                </CurrentText>
              }
              {
                !this.state.currentSection && <LogoComponent title="Patrik Marin"/>
              }
              <MenuButton onClick={e => this.toggleMenu()}>
                {
                  this.state.menuOpen ? 
                    <i className="fa fa-times fa-lg"/> :
                    <i className="fa fa-bars fa-lg"/>
                }
              </MenuButton>
              {
                inActiveElements
                  .map((_, i) => {
                    const isLastChild = menuContent.length - 2 === i;
                    const styling = isLastChild && !!this.state.currentSection ? 
                      { ...widescreenNavExtraStyles, marginRight: 0 } :
                      { ...widescreenNavExtraStyles };
                    return (
                      <WidescreenNavItem
                        key={i}
                        style={styling}
                      >
                        <ScrollableAnchor id={_.elementId}
                          callback={() => this.toggleMenu(false)}
                        >
                          {_.title}
                        </ScrollableAnchor>
                      </WidescreenNavItem>
                    );
                  })
              }
            </Navbar>
            <NarrowScreenContainer
              style={narrowSectionStyle}>
              {
                inActiveElements
                  .map((_, i) => {
                    return (
                      <NarrowScreenNavItem key={i}>
                        <ScrollableAnchor id={_.elementId}
                          callback={() => this.toggleMenu(false)}
                        >
                          {_.title}
                        </ScrollableAnchor>
                      </NarrowScreenNavItem>
                    );
                  })
              }
            </NarrowScreenContainer>
          </NavbarContainer>
        </div>
      </Section>
    );
  }
}

export default MenuComponent;
