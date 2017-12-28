import * as React from 'react';
import glamorous from 'glamorous';
import { ILanguage, ISkill } from'shared/interfaces/IResume';
import { colors } from '../../../../styles';

import { EntryContainer, EntryHeaderComponent } from './CommonComponents';

const SkillEntry = glamorous.div({

  cursor: 'pointer',
  ':hover': {
    opacity: 0.8,
  },

  // Same styles below as in TagEntry
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

const TagEntry = glamorous.div({
  // TODO: Combine SkillEntry styles
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


interface ISkillComponentProps {
  skill: string;
  selected: boolean;
  handleClick: (skill: string) => void;
}

const SkillComponent: React.SFC<ISkillComponentProps> = (props) => {

  const activeStyle = props.selected ? { fontWeight: 'bold' } : {};

  return (
    <SkillEntry onClick={e => props.handleClick(props.skill)}>
      <p style={activeStyle}>{props.skill}</p>
    </SkillEntry>
  );
};

export const Skills: React.SFC<{
  skills: ISkill[],
  selectedSkills: string[],
  handleClick: (skill: string) => void;
}> = (props) => {
  return (
    <EntryContainer style={{ marginBottom: '3.2rem !important' }}>
      <EntryHeaderComponent icon="fa-star" text="Skills"/>
      {props.skills.map((_: ISkill) => _.keywords.map((skill: string, i: number) => {
        const selected = props.selectedSkills.indexOf(skill) !== -1;
        return (
          <SkillComponent
            key={_.name + i}
            skill={skill}
            selected={selected}
            handleClick={props.handleClick}
          />
        );
      }))}
    </EntryContainer>
  );
};
