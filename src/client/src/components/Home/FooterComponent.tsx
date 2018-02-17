import * as React from 'react';
import glamorous from 'glamorous';
import ContentfulAttribution from '../Misc/ContentfulAttribution';
import { colors, mediaQueries } from '../../styles';

import { animateToElement } from '../../utils/smoothScroller';

const Container = glamorous.section({
  borderTop: `0.1rem solid ${colors.lightGray}`,
  background: colors.white,
  paddingTop: '2rem',
  paddingBottom: '2rem',
  '& p': {
    color: colors.gray,
  },
  [mediaQueries.tablet]: {
    marginBottom: '2rem !important',
    borderRadius: '0 0 0.4rem 0.4rem',
  },
});

const FooterContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const PageSourceLink = glamorous.div({
  '& i': {
    marginRight: '1rem',
  },
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
  },
  '& a:hover': {
    cursor: 'pointer',
    textDecoration: 'underline',
    color: 'inherit',
  },
});

const LogoContainer = glamorous.div({
  height: '3rem',
  cursor: 'pointer',
});

const logoImg = require('./images/logo_black.png');

const Logo = () => (
  <LogoContainer onClick={e => animateToElement(0)}>
    <img height="100%" src={logoImg}/>
  </LogoContainer>
);

class FooterComponent extends React.Component<{}, {}> {
  render() {
    return (
      <Container>
        <div className="container">
          <div className="row">
            <FooterContainer>
              <PageSourceLink>
                <i className="fa fa-github fa-lg"/>
                <a href="https://github.com/marinp1/patrikmarin.fi" target="_blank">Source</a>
              </PageSourceLink>
              <Logo/>
              <ContentfulAttribution/>
            </FooterContainer>
          </div>
        </div>
      </Container>
    );
  }
}

export default FooterComponent;
