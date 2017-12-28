import * as React from 'react';
import glamorous from 'glamorous';

import { mediaQueries, colors } from '../../../styles';
import { IProjectFields } from 'shared/interfaces/IProject';

import ProjectEntry from './ProjectEntry';

const Container = glamorous.section({
  borderTop: `1px solid ${colors.lightGray}`,
  paddingTop: '4rem',
  background: colors.white,
  paddingBottom: '2rem',
  '& p': {
    color: colors.gray,
  },
});

const Title = glamorous.h6({
  textTransform: 'uppercase',
  fontWeight: 'bold',
});

const ProjectContainer = glamorous.div({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'flex-start',
  alignContent: 'stretch',
  alignItems: 'stretch',

  // Project elements are react-router link tags, style them here
  '& a': {
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
    },
  },
  '& a:hover': {
    opacity: 0.8,
  },
});

interface ProjectComponentProps {
  projects: IProjectFields[];
}

class ProjectComponent extends React.Component<ProjectComponentProps, {}> {
  render() {
    return (
      <Container id="projects">
        <div className="container">
          <div className="row">
            <Title>
              <i className="fa fa-desktop" style={{ marginRight: '1rem' }}/>
              Projects
            </Title>
          </div>
          <ProjectContainer>
            {this.props.projects.map((project: IProjectFields, i: number) => {
              return <ProjectEntry key={i} project={project}/>;
            })}
          </ProjectContainer>
        </div>
      </Container>
    );
  }
}

export default ProjectComponent;