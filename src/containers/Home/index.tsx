import * as React from 'react'
//
import * as IResume from './resumeInterface'
import * as IProject from './projectInterface'
import LandingComponent from './LandingComponent'
import CurriculumComponent from './CurriculumComponent'
import ProjectComponent from './ProjectComponent'

const resume: IResume.IResume = require('./resume.json')
const projects: IProject.IProject[] = require('./projects.json')

class MainPage extends React.Component<{}, {}> {
  render() {
    return(
      <div>
        <LandingComponent
          name={resume.basics.name}
          infoLabel={resume.basics.label}
          profiles={resume.basics.profiles}
          email={resume.basics.email}
        />
        <CurriculumComponent
          summary={resume.basics.summary}
          workplaces={resume.work}
          educations={resume.education}
          competitions={resume.awards}
          languages={resume.languages}
          skills={resume.skills}
        />
        <ProjectComponent
          projects={projects}
        />
      </div>
    )
  }
}

export default MainPage;