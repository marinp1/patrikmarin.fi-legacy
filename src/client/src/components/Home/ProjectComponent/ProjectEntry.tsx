import * as React from 'react';
import glamorous from 'glamorous';
import { Link } from 'react-router-dom';

import { colors } from '../../../styles';
import { IProjectFields } from 'shared/interfaces/IProject';

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

export default ProjectEntry;
