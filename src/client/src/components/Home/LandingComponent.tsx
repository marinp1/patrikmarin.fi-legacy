import * as React from 'react';
import glamorous from 'glamorous';

import { colors } from '../../styles';
import { IProfile } from 'shared/interfaces/IResume';

const Container = glamorous.div({
  height: 'inherit',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

const WelcomeText = glamorous.h5({
  color: colors.landingPage.welcomeText,
  textAlign: 'center',
  letterSpacing: '1px',
  padding: 0,
  margin: 0,
  marginBottom: '1rem',
  fontWeight: 'bold',
});

const Title = glamorous.h1({
  color: colors.landingPage.foreground,
  letterSpacing: '5px',
  textAlign: 'center',
  padding: 0,
  margin: 0,
  marginBottom: '2rem',
  fontFamily: 'Lato, sans-serif',
});

const InfoLabel = glamorous.h6({
  textAlign: 'center',
  letterSpacing: '1px',
  padding: 0,
  margin: 0,
  color: colors.landingPage.infolabel,
  marginBottom: '3rem',
  textTransform: 'uppercase',
  fontWeight: 'bold',
});

const ButtonContainer = glamorous.div({
  textAlign: 'center',
});

const Button = glamorous.a({
  color: `${colors.landingPage.foreground} !important`,
  marginLeft: '0.7rem !important',
  marginRight: '0.7rem !important',

  ':hover': {
    color: `${colors.landingPage.hoverForeground} !important`,
    background: 'rgba(0,0,0,0.1) !important',
    borderColor: `${colors.landingPage.infolabel} !important'`,
  },

  ':active': {
    color: `${colors.landingPage.hoverForeground} !important`,
    background: 'rgba(0,0,0,0.2) !important',
    borderColor: `${colors.landingPage.infolabel} !important'`,
  },
});

const LinkContainer = glamorous.div({
  marginTop: '4rem',
  color: colors.landingPage.foreground,
  textAlign: 'center',

  '& i': {
    color: colors.landingPage.foreground,
  },

  '& a': {
    color: colors.landingPage.foreground,
    textDecoration: 'none',
  },

  '& a:hover': {
    color: colors.landingPage.infolabel,
    textDecoration: 'none',
  },
});

interface LandingComponentProps {
  name: string;
  infoLabel: string;
  profiles: IProfile[];
  email: string;
}

interface LandingComponentState {
  height: string;
}

class LandingComponent extends React.Component<LandingComponentProps, LandingComponentState> {

  profileSeparator = ' • ';

  render() {
    return (
      <div style={{ height: 'calc(100vh - 8rem)' }}>
        <Container>
          <div className="container">
            <WelcomeText>HELLO AND WELCOME.</WelcomeText>
            <Title>I'm {this.props.name}</Title>
            <InfoLabel>{this.props.infoLabel}</InfoLabel>
            <ButtonContainer>
              <Button className="button" href="#description">READ MORE</Button>
              <Button className="button">DOWNLOAD CV</Button>
            </ButtonContainer>
            <LinkContainer>
              {this.props.profiles.map((profile: IProfile, index: number) => {
                return (index === this.props.profiles.length - 1) ?
                  <a key={index} href={profile.url}>{profile.network}</a> :
                  <span key={index}>
                    <a href={profile.url}>{profile.network}</a>{this.profileSeparator}
                  </span>;
              })}
              <br/>
              <a href={`mailto:${this.props.email}`}>{this.props.email}</a>
            </LinkContainer>
          </div>
        </Container>
      </div>
    );
  }
}

export default LandingComponent;
