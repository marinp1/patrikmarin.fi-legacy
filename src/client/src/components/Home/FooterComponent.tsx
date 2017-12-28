import * as React from 'react';
import glamorous from 'glamorous';
import ContentfulAttribution from '../Misc/ContentfulAttribution';
import { colors, mediaQueries } from '../../styles';

const Container = glamorous.section({
  borderTop: `0.1rem solid ${colors.lightGray}`,
  background: colors.background,
  paddingTop: '2rem',
  paddingBottom: '2.5rem',
  '& p': {
    color: colors.gray,
  },
  [mediaQueries.tablet]: {
    marginBottom: '2rem !important',
  },
});

class FooterComponent extends React.Component<{}, {}> {
  render() {
    return (
      <Container>
        <div className="container">
          <div className="row">
            <ContentfulAttribution/>
          </div>
        </div>
      </Container>
    );
  }
}

export default FooterComponent;
