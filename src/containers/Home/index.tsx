import * as React from 'react'
//
import * as IResume from './resumeInterface';
import LandingComponent from './LandingComponent'

const resume: IResume.IResume = require('./resume.json');

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
      </div>
    )
  }
}

export default MainPage;