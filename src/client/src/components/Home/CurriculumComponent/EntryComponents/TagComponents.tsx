import * as React from 'react';
import glamorous from 'glamorous';
import { ILanguage, ISkill } from'shared/interfaces/IResume';
import { colors } from '../../../../styles';

import { EntryContainer, EntryHeaderComponent } from './CommonComponents';

const TagEntry = glamorous.div({
  position: 'relative',
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

const LanguageName = glamorous.p({
  fontWeight: 'bold',
  marginLeft: '2.75rem !important',
});

function getFlagFromLanguage(language: string): string | undefined {
  switch (language.toLowerCase()) {
    case 'finnish':
      return '🇫🇮';
    case 'english':
      return '🇬🇧';
    case 'german':
      return '🇩🇪';
    case 'swedish':
      return '🇸🇪';
    case 'chinese':
      return '🇨🇳';
    default:
      return '🏳️‍🌈';
  }
}

const FlagContainer = glamorous.div({
  position: 'absolute',
  background: colors.lightGray,
  padding: '0 0.75rem 0 0.5rem',
});

export const Languages: React.SFC<{languages: ILanguage[]}> = ({ languages }) => (
  <EntryContainer style={{ marginBottom: '3.2rem !important' }}>
    <EntryHeaderComponent icon="fa-flag" text="Languages"/>
    {languages.map((language: ILanguage, i: number) => {
      const flag = getFlagFromLanguage(language.language);
      return (
        <TagEntry key={i}>
          {flag && <FlagContainer>{flag}</FlagContainer>}
          <LanguageName>{language.language}</LanguageName>
          <p>{language.fluency}</p>
        </TagEntry>
      );
    })}
  </EntryContainer>
);

const SkillListHeader = glamorous.p({
  background: colors.lightGray,
  fontWeight: 'bold',
  padding: '0.8rem 1rem',
  margin: 0,
  marginBottom: '0.8rem',
  '& i': {
    marginRight: '0.8rem',
  },
});

const SkillContainer = glamorous.div({
  background: colors.white,
  borderRadius: '0.5rem',
  border: `0.3rem solid ${colors.lightGray}`,
  marginBottom: '1rem',
  marginRight: 'auto',
});

const SkillTagContainer = glamorous.div({
  padding: '0.2rem 0.2rem 0.2rem 1rem',
});

function getIconName(skill: string): string | undefined {
  switch (skill.toLowerCase()) {
    case 'web development':
      return 'fa-globe';
    case 'software development':
      return 'fa-code-fork';
    default:
      return undefined;
  } 
}

const SkillTypeComponent: React.SFC<{skill: ISkill}> = ({ skill }) => {
  const iconName = getIconName(skill.name);
  return (
    <SkillContainer>
      <SkillListHeader>
        {iconName && <i className={`fa ${iconName}`} aria-hidden="true"></i>}
        {skill.name}
      </SkillListHeader>
      <SkillTagContainer>
        {skill.keywords.map((_: string, i: number) => {
          return (
            <TagEntry key={skill.name + _}>
              <p>{_}</p>
            </TagEntry>
          );
        })}
      </SkillTagContainer>
    </SkillContainer>
  );
};

export const Skills: React.SFC<{skills: ISkill[]}> = ({ skills }) => (
  <EntryContainer style={{ marginBottom: '3.2rem !important' }}>
    <EntryHeaderComponent icon="fa-star" text="Skills"/>
    <div>
      {skills.map((skill: ISkill, i: number) => <SkillTypeComponent skill={skill} key={i}/>)}
    </div>
  </EntryContainer>
);
