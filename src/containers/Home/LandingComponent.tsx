import * as React from 'react'
import glamorous from 'glamorous'

import { mediaQueries, colors } from '../../styles';
import { IProfile } from './resumeInterface';

const image = require('./images/cv_round_small_zoom.png');

const Container = glamorous.div({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
})

const WelcomeText = glamorous.h5({
  color: colors.landingPage.welcomeText,
  textAlign: 'center',
  letterSpacing: '1px',
  padding: 0,
  margin: 0,
  marginBottom: '1rem',
  fontWeight: 'bold',
})

const Title = glamorous.h1({
  color: colors.landingPage.foreground,
  letterSpacing: '5px',
  textAlign: 'center',
  padding: 0,
  margin: 0,
  marginBottom: '2rem',
})

const InfoLabel = glamorous.h6({
  textAlign: 'center',
  letterSpacing: '1px',
  padding: 0,
  margin: 0,
  color: colors.landingPage.infolabel,
  marginBottom: '3rem',
  textTransform: 'uppercase',
  fontWeight: 'bold',
})

const ButtonContainer = glamorous.div({
  textAlign: 'center',
})

const Button = glamorous.a({
  color: `${colors.landingPage.foreground} !important`,
  marginLeft: '0.5rem !important',
  marginRight: '0.5rem !important',

  ':hover': {
    color: `${colors.landingPage.hoverForeground} !important`,
    background: 'rgba(0,0,0,0.1) !important',
    borderColor: '#e87373 !important',
  },

  ':active': {
    color: `${colors.landingPage.hoverForeground} !important`,
    background: 'rgba(0,0,0,0.2) !important',
    borderColor: '#e87373 !important',
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
})

const ImageContainer = glamorous.div({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  [mediaQueries.tablet]: {
    maxWidth: '80%',
    margin: 'auto',
  }
});

const ImageHolder = glamorous.div({
  width: '10rem',
  height: '10rem',
  padding: '1rem',
  margin: 'auto',
  marginBottom: '-6rem',
  background: colors.background,
  borderRadius: '50%',
  
  '& img': {
    width: 'inherit',
    height: 'inherit',
    borderRadius: 'inherit',
    border: `0.1rem solid ${colors.gray}`,
  }
});

const TextHolder = glamorous.div({
  left: 0,
  right: 0,
  background: colors.background,
  height: '7rem',
});

interface LandingComponentProps {
  name: string;
  infoLabel: string;
  profiles: IProfile[];
  email: string;
}

class LandingComponent extends React.Component<LandingComponentProps, {}> {

  profileSeparator = ' • '

  render() {
    return (
      <div>
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
                  <a href={profile.url}>{profile.network}</a> :
                  <span><a href={profile.url}>{profile.network}</a>{this.profileSeparator}</span>
              })}
              <br/>
              <a href={`mailto:${this.props.email}`}>{this.props.email}</a>
            </LinkContainer>
          </div>
        </Container>
        <ImageContainer>
          <ImageHolder>
            <img src={image} alt={this.props.name}/>
          </ImageHolder>
          <TextHolder/>
        </ImageContainer>
      </div>
    );
  }
}

export default LandingComponent
