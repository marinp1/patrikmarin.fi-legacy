import * as React from 'react';
import glamorous from 'glamorous';

import { mediaQueries, colors } from '../../styles';
import { IProject } from './projectInterface';

const Container = glamorous.section({
  background: colors.background,
  paddingBottom: '2rem',
  '& p': {
    color: colors.gray,
  },
  [mediaQueries.tablet]: {
    paddingBottom: '6rem !important',
  }
})

const Title = glamorous.h6({
  textTransform: 'uppercase',
  fontWeight: 'bold',
})

const ProjectContainer = glamorous.div({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'flex-start',
  alignContent: 'stretch',
  alignItems: 'stretch',
})

const Project = glamorous.div({
  textAlign: 'center',
  borderRadius: '1rem',
  position: 'relative',
  boxSizing: 'border-box',
  border: `0.5rem solid ${colors.lightGray}`,
  background: colors.white,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  height: '60vw',
  width: '100%',
  marginBottom: '2rem',
  [mediaQueries.mobile]: {
    height: '29vw',
    width: '46%',
    marginRight: '2%',
    marginBottom: '2%',
  },
  [mediaQueries.tablet]: {
    height: '24vw',
  },
  [mediaQueries.desktop]: {
    height: '18vw',
    width: '31%',
    marginRight: '2%',
    marginBottom: '2%',
  }
})

const ProjectInfo = glamorous.div({
  position: 'absolute',
  height: '3.5rem',
  left: 0,
  right: 0,
  bottom: 0,
  background: colors.white,
  borderTop: `1px solid ${colors.lightGray}`,
  borderRadius: '0 0 0.5rem 0.5rem',

  '& h6': {
    color: colors.black,
    padding: 0,
    margin: 0,
    lineHeight: '3.75rem',
    textTransform: 'uppercase',
  },
})

function projectNameToId(project: IProject): string {
  return project.name.replace(' ','-').toLowerCase();
}

const ProjectEntry: React.SFC<{project: IProject}> = ({ project }) => {
  const bgImg = require(`./images/thumbnails/${project.backgroundImage}`);
  return (<Project id={projectNameToId(project)}
    style={{
      backgroundImage: `url(${bgImg})`,
      backgroundColor: project.backgroundColor,
      backgroundPosition: project.backgroundPosition,
    }}
  >
    <ProjectInfo>
      <h6>{project.name}</h6>
    </ProjectInfo>
  </Project>)
}

interface ProjectComponentProps {
  projects: IProject[];
}

class ProjectComponent extends React.Component<ProjectComponentProps, {}> {
  render() {
    console.log(this.props.projects.length);
    return (
      <Container id="projects">
        <div className="container">
          <div className="row">
            <Title>Projects</Title>
          </div>
          <ProjectContainer>
            {this.props.projects.map((project: IProject, i: number) => {
              return <ProjectEntry key={i} project={project}/>
            })}
          </ProjectContainer>
        </div>
      </Container>
    )
  }
}

export default ProjectComponent;