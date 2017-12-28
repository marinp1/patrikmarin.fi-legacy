import * as React from 'react';
import glamorous from 'glamorous';
import { colors } from '../../../../../styles';

const DescriptionContainer = glamorous.div({
  flexGrow: 3,
  '& p': {
    margin: 0,
  },
});

const DescriptionHeader = glamorous.h6({
  margin: 0,
  color: colors.black,
  fontWeight: 'bold',
});

const DescriptionSubtitle = glamorous.p({
  color: colors.black,
  fontWeight: 'bold',
});

const DescriptionText = glamorous.p({
  textAlign: 'justify',
  fontSize: '90%',
});

const DescriptionTextComponent: React.SFC<{text: string, last: boolean}> = ({ text, last }) => {
  const style = last ? {} : { marginBottom: '2rem' };
  return (
      <DescriptionText style={style}>{text}</DescriptionText>
  );
};

interface IDescriptionComponent {
  title: string;
  subtitle: string;
  text: string;
  last: boolean;
  subtitleVisible?: boolean;
}

const DescriptionComponent: React.SFC<IDescriptionComponent> =
  ({ title, subtitle, subtitleVisible, text, last }) => (
  <DescriptionContainer>
    <DescriptionHeader>{title}</DescriptionHeader>
    {subtitleVisible !== false &&
      <DescriptionSubtitle>
        {subtitle}
      </DescriptionSubtitle>
    }
    <DescriptionTextComponent last={last}
      text={text}/>
  </DescriptionContainer>
);

export default DescriptionComponent;
