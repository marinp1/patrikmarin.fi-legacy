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

interface IMainPageProps {
  resume: IResume.IResume;
}

interface IMainPageState {
  projects: IProject.IProject[];
}

class MainPage extends React.Component<IMainPageProps & RouteComponentProps<any>, IMainPageState> {

  state = {
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
          name={this.props.resume.basics.name}
          infoLabel={this.props.resume.basics.label}
          profiles={this.props.resume.basics.profiles}
          email={this.props.resume.basics.email}
        />
        <CurriculumComponent
          summary={this.props.resume.basics.summary}
          workplaces={this.props.resume.work}
          educations={this.props.resume.education}
          competitions={this.props.resume.awards}
          languages={this.props.resume.languages}
          skills={this.props.resume.skills}
        />
        <ProjectComponent
          projects={this.state.projects}
        />
      </Container>
    );
  }
}

export default withRouter(MainPage);

