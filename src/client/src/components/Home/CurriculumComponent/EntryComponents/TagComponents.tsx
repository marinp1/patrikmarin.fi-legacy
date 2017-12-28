import * as React from 'react';
import glamorous from 'glamorous';
import { ILanguage, ISkill } from'shared/interfaces/IResume';
import { colors } from '../../../../styles';

import { EntryContainer, EntryHeaderComponent } from './CommonComponents';

const TagEntry = glamorous.div({
  border: `0.3rem solid ${colors.lightGray}`,
  borderRadius: '0.5rem',
  background: colors.white,
  display: 'inline-block',
  marginRight: '0.8rem',
  marginBottom: '0.8rem',

  '& p': {
    padding: '0 0.5rem',
    margin: 0,
    color: colors.black,
    display: 'inline-block',
  },
});

const TagEntryMain = glamorous.p({
  fontWeight: 'bold',
});

export const Languages: React.SFC<{languages: ILanguage[]}> = ({ languages }) => (
  <EntryContainer style={{ marginBottom: '3.2rem !important' }}>
    <EntryHeaderComponent icon="fa-globe" text="Languages"/>
    {languages.map((language: ILanguage, i: number) => {
      return (
        <TagEntry key={i}>
          <TagEntryMain>{language.language}</TagEntryMain>
          <p>{language.fluency}</p>
        </TagEntry>
      );
    })}
  </EntryContainer>
);

export const Skills: React.SFC<{skills: ISkill[]}> = ({ skills }) => (
  <EntryContainer style={{ marginBottom: '3.2rem !important' }}>
    <EntryHeaderComponent icon="fa-star" text="Skills"/>
    {skills.map((_: ISkill) => _.keywords.map((skill: string, i: number) => {
      return (
        <TagEntry key={_.name + i}>
          <TagEntryMain>{skill}</TagEntryMain>
        </TagEntry>
      );
    }))}
  </EntryContainer>
);
