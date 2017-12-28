import * as React from 'react';
import glamorous from 'glamorous';
import { Link } from 'react-router-dom';

import { mediaQueries, colors } from '../../styles';
import { IProjectFields } from 'shared/interfaces/IProject';

const Container = glamorous.section({
  background: colors.background,
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

const ProjectInfo = glamorous.div({
  position: 'absolute',
  height: '3.5rem',
  left: 0,
  right: 0,
  bottom: 0,
  background: colors.white,
  borderTop: `1px solid ${colors.lightGray}`,
  borderRadius: '0 0 0.5rem 0.5rem',
});

const ProjectTitle = glamorous.h6({
  color: colors.black,
  padding: 0,
  margin: 0,
  lineHeight: '3.75rem',
  textTransform: 'uppercase',

  '& a': {
    color: 'inherit',
    textDecoration: 'none',
  },
  '& a:hover': {
    color: colors.black,
    textDecoration: 'underline',
  },
  '& a:active': {
    color: colors.lightGray,
  },
});

const LinkComponent: React.SFC<{href: string, project: IProjectFields}> = (props) => {

  const style = {
    backgroundImage: `url(${props.project.thumbnail.fields.image.fields.file.url})`,
    backgroundColor: props.project.thumbnail.fields.backgroundColor,
    backgroundPosition: props.project.thumbnail.fields.backgroundPosition,
  };

  if (props.href.startsWith('/')) {
    return (
      <Link to={props.href} id={props.project.id} style={style}>
        {props.children}
      </Link>
    );
  }
  return (
    <a href={props.href} target="_blank" id={props.project.id} style={style}>
      {props.children}
    </a>
  );
};

const ProjectEntry: React.SFC<{project: IProjectFields}> = ({ project }) => {
  const href = project.directLink
    ? project.directLink
    : `/project/${project.id}`;
  return (
    <LinkComponent href={href} project={project}>
      <ProjectInfo>
        <ProjectTitle>{project.thumbnail.fields.name}</ProjectTitle>
      </ProjectInfo>
    </LinkComponent>
  );
};

interface ProjectComponentProps {
  projects: IProjectFields[];
}

class ProjectComponent extends React.Component<ProjectComponentProps, {}> {
  render() {
    return (
      <Container id="projects">
        <div className="container">
          <div className="row">
            <Title>Projects</Title>
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
