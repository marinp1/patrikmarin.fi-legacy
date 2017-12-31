import * as React from 'react';
import glamorous from 'glamorous';
import { Playlist } from './classes';
import { mediaQueries } from './styles';

const COMPONENT_SIZE = '6rem';

const Wrapper = glamorous.div({
  width: '100%',
  [mediaQueries.tablet]: {
    width: '50%',
  },
  [mediaQueries.desktop]: {
    width: '33.33%',
  },
});

const ImageContainer = glamorous.div({
  position: 'relative',
  height: COMPONENT_SIZE,
  width: COMPONENT_SIZE,
  marginRight: '1rem',
  '& img': {
    width: 'inherit',
    border: '0.1rem solid #656565',
    borderRadius: '0.2rem',
    height: 'inherit',
  },
});

const Container = glamorous.div({
  height: COMPONENT_SIZE,
  marginBottom: '0.8rem',
  marginRight: '0.8rem',
  padding: '1rem',
  backgroundColor: '#f2f1ef',
  background: 'linear-gradient(to bottom, #f2f1ef 0%,#dedbd2 100%)',
  borderRadius: '0.2rem',
  display: 'flex',
  cursor: 'pointer',
});

const Title = glamorous.h6({
  margin: 0,
  top: 0,
  color: '#272727',
  fontWeight: 'bold',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: '90%',
});

const Subtext = glamorous.p({
  color: '#4A4A4A',
  margin: 0,
  fontSize: '90%',
});

function runtimeToString(runtime: number): string {
  if (runtime === -1) return 'Loading...';
  const inMinutes = runtime / 60000;
  const inHours = inMinutes / 60;
  const hours = Math.floor(inHours);
  const minutes = Math.floor((inHours - hours) * 60);
  return `${hours} hours, ${minutes} minutes`;
}

const PlaylistComponent: React.SFC<{data: Playlist}> = ({ data }) => {
  const loading = data.runtime === -1;
  const extraStyle: React.CSSProperties = {};
  if (loading) extraStyle.background = '#b1b1b1';
  return (
    <Wrapper>
      <Container style={extraStyle}>
        <ImageContainer>
          <img src={data.imageUrl}/>
        </ImageContainer>
        <div>
          <Title>{data.name}</Title>
          <Subtext>{data.length} songs</Subtext>
          <Subtext>{runtimeToString(data.runtime)}</Subtext>
        </div>
      </Container>
    </Wrapper>
  );
};

export default PlaylistComponent;
