import * as React from 'react';
import glamorous from 'glamorous';
import { colors } from '../../../styles';

const TechnologySelector = glamorous.div({
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

const SelectorContainer = glamorous.div({
  position: 'relative',
});


interface ISelectorComponentProps {
  technology: string;
  selected: boolean;
  handleClick: (skill: string) => void;
}

const SelectorComponent: React.SFC<ISelectorComponentProps> = (props) => {

  const activeStyle = props.selected ? { fontWeight: 'bold' } : {};

  return (
    <TechnologySelector onClick={e => props.handleClick(props.technology)}>
      <p style={activeStyle}>{props.technology}</p>
    </TechnologySelector>
  );
};

const TechnologySelectors: React.SFC<{
  technologies: string[],
  selectedTechnologies: string[],
  handleClick: (skill: string) => void;
}> = (props) => {
  return (
    <SelectorContainer>
      {props.technologies.map((technology: string, i: number) => {
        const selected = props.selectedTechnologies.indexOf(technology.toLowerCase()) !== -1;
        return (
          <SelectorComponent
            key={i}
            technology={technology}
            selected={selected}
            handleClick={props.handleClick}
          />
        );
      })}
    </SelectorContainer>
  );
};

export default TechnologySelectors;
