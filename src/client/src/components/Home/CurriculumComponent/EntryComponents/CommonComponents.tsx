import * as React from 'react';
import glamorous from 'glamorous';

export const EntryContainer = glamorous.div({
  position: 'relative',
  marginBottom: '4rem',
});

const EntryHeader = glamorous.h6({
  marginTop: '0.5rem !important',
  marginBottom: '1.5rem !important',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  '& i': {
    marginRight: '1rem',
  },
});

export const EntryHeaderComponent: React.SFC<{icon: string, text: string}> = ({ icon, text }) => (
  <EntryHeader>
    <i className={`fa ${icon}`}></i>
    {text}
  </EntryHeader>
);
