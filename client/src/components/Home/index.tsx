import * as React from 'react';
import glamorous from 'glamorous';
import { RouteComponentProps, withRouter } from 'react-router-dom';
//
import * as IResume from '../../interface/resumeInterface';
import * as IProject from '../../interface/projectInterface';
import LandingComponent from './LandingComponent';
import CurriculumComponent from './CurriculumComponent';
import ProjectComponent from './ProjectComponent';

import { colors, mediaQueries } from '../../styles';

const resume: IResume.IResume = require('../../data/resume.json');

const Container = glamorous.div({
  [mediaQueries.tablet]: {
    marginBottom: '10rem',
  },
  '& section': {
    [mediaQueries.tablet]: {
      maxWidth: '80%',
      margin: 'auto',
    },
  },
  '& .columns': {
    [mediaQueries.untilDesktop]: {
      width: '100% !important',
      marginLeft: '0 !important',
    },
  },
});

interface IMainPageState {
  resume: IResume.IResume;
  projects: IProject.IProject[];
}

class MainPage extends React.Component<RouteComponentProps<any>, IMainPageState> {

  state = {
    resume,
    projects: [],
  };

  componentDidMount() {
    const projects: IProject.IProject[] = require('../../data/projects.json');
    this.setState({ projects });
  }

  render() {
    document.body.style.backgroundColor = colors.black;
    document.body.style.backgroundImage = `url(${require('./images/bg.jpg')})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundSize = 'cover';

    return(
      <Container>
        <LandingComponent
          name={this.state.resume.basics.name}
          infoLabel={this.state.resume.basics.label}
          profiles={this.state.resume.basics.profiles}
          email={this.state.resume.basics.email}
        />
        <CurriculumComponent
          summary={this.state.resume.basics.summary}
          workplaces={this.state.resume.work}
          educations={this.state.resume.education}
          competitions={this.state.resume.awards}
          languages={this.state.resume.languages}
          skills={this.state.resume.skills}
        />
        <ProjectComponent
          projects={this.state.projects}
        />
      </Container>
    );
  }
}

export default withRouter(MainPage);

