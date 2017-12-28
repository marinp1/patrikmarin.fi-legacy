import * as React from 'react';
import glamorous from 'glamorous';
import ContentfulAttribution from '../Misc/ContentfulAttribution';
import { colors, mediaQueries } from '../../styles';

const Container = glamorous.section({
  borderTop: `0.1rem solid ${colors.lightGray}`,
  background: colors.background,
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
              <ContentfulAttribution/>
            </FooterContainer>
          </div>
        </div>
      </Container>
    );
  }
}

export default FooterComponent;
