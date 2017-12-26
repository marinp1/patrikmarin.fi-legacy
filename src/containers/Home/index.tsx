import * as React from 'react'
import { getRouteProps } from 'react-static'
//
import * as IResume from '../../interface/resumeInterface'
import * as IProject from '../../interface/projectInterface'
import LandingComponent from './LandingComponent'
import CurriculumComponent from './CurriculumComponent'
import ProjectComponent from './ProjectComponent'


interface IMainPageProps {
  projects: IProject.IProject[];
  resume: IResume.IResume;
}

class MainPage extends React.Component<IMainPageProps, {}> {
  render() {
    return(
      <div>
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
          projects={this.props.projects}
        />
      </div>
    )
  }
}

export default getRouteProps(({ resume, projects }) => {
  return (
    <MainPage
      projects={projects as IProject.IProject[]}
      resume={resume as IResume.IResume}
    />
  );
});