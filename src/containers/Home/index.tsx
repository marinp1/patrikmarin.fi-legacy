import * as React from 'react'
//
import * as IResume from './resumeInterface'
import LandingComponent from './LandingComponent'
import CurriculumComponent from './CurriculumComponent'

const resume: IResume.IResume = require('./resume.json')

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
        />
      </div>
    )
  }
}

export default MainPage;