import * as React from 'react';
import glamorous from 'glamorous';
import { colors } from '../../../../../styles';

const DurationContainer = glamorous.div({
  position: 'relative',
  minWidth: '56px',
  marginRight: '1.5rem',
  paddingRight: '1.5rem',
  borderRight: `0.1rem solid ${colors.gray}`,

  '& p': {
    fontSize: '85%',
    textAlign: 'right',
    margin: 0,
  },
});

const TimelineTag = glamorous.div({
  position: 'absolute',
  right: '-0.3rem',
  top: '1.1rem',
  width: '0.6rem',
  height: '0.1rem',
  background: colors.gray,
});

const DurationComponent: React.SFC<{start: string, end?: string}> = ({ start, end }) => (
  <DurationContainer>
    {!end || start === end ?
      <p>{start}</p> :
      <p>{end}<br/>{start}</p>
    }
    <TimelineTag/>
  </DurationContainer>
);

export default DurationComponent;
