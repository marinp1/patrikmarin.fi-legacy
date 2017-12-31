import * as React from 'react';
import glamorous from 'glamorous';

const LoginContainer = glamorous.div({
  marginTop: '20rem',
});

const Title = glamorous.h3({
  letterSpacing: '0.15rem',
  fontWeight: 300,
  color: '#f5f5f5',
});

const Subtitle = glamorous.h5({
  color: '#A1A1A1',
});

const ErrorScreen: React.SFC<{
  msg: string,
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ msg, handleClick }) => (
  <div className="container">
    <LoginContainer>
      <Title>Something happened...</Title>
      <Subtitle>{ msg }</Subtitle>
      <button className="button-primary" onClick={e => handleClick(e)}>
        Try again
      </button>
    </LoginContainer>
  </div>
);

export default ErrorScreen;
