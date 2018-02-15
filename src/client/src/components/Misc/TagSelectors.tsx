import * as React from 'react';
import glamorous from 'glamorous';
import { colors } from '../../styles';

const ButtonContainer = glamorous.button({
  background: colors.lightGray,
  color: 'black',
  margin: 0,
});

export const ClearSelectionButton: React.SFC<{
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
}> = ({ handleClick }) => (
  <ButtonContainer onClick={e => handleClick(e)}>
    Clear selection
  </ButtonContainer>
);

const TagSelector = glamorous.div({
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
  tag: string;
  selected: boolean;
  handleClick: (skill: string) => void;
}

const SelectorComponent: React.SFC<ISelectorComponentProps> = (props) => {

  const activeStyle: React.CSSProperties = props.selected ? { fontWeight: 'bold' } : {};

  return (
    <TagSelector onClick={e => props.handleClick(props.tag)}>
      <p style={activeStyle}>{props.tag}</p>
    </TagSelector>
  );
};

export const TagSelectors: React.SFC<{
  tags: string[],
  selectedTags: string[],
  handleClick: (skill: string) => void;
}> = (props) => {
  return (
    <SelectorContainer>
      {props.tags.map((tag: string, i: number) => {
        const selected = props.selectedTags.indexOf(tag.toLowerCase()) !== -1;
        return (
          <SelectorComponent
            key={i}
            tag={tag}
            selected={selected}
            handleClick={props.handleClick}
          />
        );
      })}
    </SelectorContainer>
  );
};
