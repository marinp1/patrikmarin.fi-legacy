import * as React from 'react';
import glamorous from 'glamorous';
import { colors } from '../../../styles';

const SkillEntry = glamorous.div({
  cursor: 'pointer',
  ':hover': {
    opacity: 0.8,
  },
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

const SkillContainer = glamorous.div({
  position: 'relative',
  marginBottom: '4rem',
});


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

const Skills: React.SFC<{
  skills: string[],
  selectedSkills: string[],
  handleClick: (skill: string) => void;
}> = (props) => {
  return (
    <SkillContainer>
      {props.skills.map((skill: string, i: number) => {
        const selected = props.selectedSkills.indexOf(skill.toLowerCase()) !== -1;
        return (
          <SkillComponent
            key={i}
            skill={skill}
            selected={selected}
            handleClick={props.handleClick}
          />
        );
      })}
    </SkillContainer>
  );
};

export default Skills;
