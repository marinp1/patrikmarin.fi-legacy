import * as React from 'react';
import glamorous from 'glamorous';
import { colors } from '../../styles';

interface CurriculumComponentProps {
  summary: string;
}

const Container = glamorous.section({
  paddingTop: '1rem',
  background: colors.background,
});

const AboutContainer = glamorous.div({
  textAlign: 'justify',
});

const Title = glamorous.h6({
  textTransform: 'uppercase',
  fontWeight: 'bold',
  color: colors.gray,
});

const Paragraph = glamorous.p({
  color: colors.gray,
})

class CurriculumComponent extends React.Component<CurriculumComponentProps, {}> {
  render() {
    return (
      <Container id="description">
        <div className="container">
          <div className="row">
            <AboutContainer className="twelve columns">
              <Title>ABOUT</Title>
              <Paragraph>{this.props.summary}</Paragraph>
            </AboutContainer>
          </div>
        </div>
      </Container>
    );
  }
}

export default CurriculumComponent;