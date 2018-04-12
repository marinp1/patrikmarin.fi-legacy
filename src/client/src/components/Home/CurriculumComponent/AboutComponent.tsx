import * as React from 'react';
import glamorous from 'glamorous';
import * as moment from 'moment';
import { colors } from '../../../styles';

const AboutContainer = glamorous.div({
  textAlign: 'justify',
  paddingTop: '2rem',
  '& p': {
    marginBottom: '3rem !important',
  },
});

const Title = glamorous.h6({
  textTransform: 'uppercase',
  marginBottom: '1.5rem !important',
  fontWeight: 'bold',
  color: colors.gray,
  '& i': {
    marginRight: '1rem',
  },
});

function calculateAge(): string {
  const birthDate = moment('1995-06-08');
  const now = moment(Date.now());
  const age = now.diff(birthDate, 'years');
  return String(age);
}

const AboutComponent: React.SFC<{title: string, summary: string}> = ({ title, summary }) => (
  <AboutContainer id="description" className="twelve columns">
    <Title>
      <i className="fa fa-user-circle"></i>
      {title}
    </Title>
    <p>{summary.replace('${age}', calculateAge)}</p>
  </AboutContainer>
);

export default AboutComponent;
