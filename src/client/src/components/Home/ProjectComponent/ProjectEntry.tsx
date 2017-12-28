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
  fontSize: '90%',

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

const LinkComponent: React.SFC<{project: IProjectFields}> = (props) => {

  const style = {
    backgroundImage: `url(${props.project.thumbnail.fields.image.fields.file.url})`,
    backgroundColor: props.project.thumbnail.fields.backgroundColor,
    backgroundPosition: props.project.thumbnail.fields.backgroundPosition,
  };

  // If direct link is not defined, assume that entry content exists
  if (!props.project.directLink) {
    return (
      <Link to={`/project/${props.project.id}`} id={props.project.id} style={style}>
        {props.children}
      </Link>
    );
  }
  return (
    <a href={props.project.directLink} target="_blank" id={props.project.id} style={style}>
      {props.children}
    </a>
  );
};

const TechonologyTagContainer = glamorous.div({
  textAlign: 'right',
  textDecoration: 'none !important',
  marginTop: '0.2rem',
  marginRight: '0.2rem',
  position: 'absolute',
  top: 0,
  right: 0,
  color: colors.black,
  fontSize: '80%',
});

const TechonologyTag = glamorous.div({
  background: '#fff',
  margin: '0.2rem',
  border: '0.2rem solid #e1e1e1',
  borderRadius: '0.5rem',
  padding: '0 0.5rem',
  textDecoration: 'none !important',
  display: 'inline-block',
});

const TechonologyTags: React.SFC<{tags: string[]}> = ({ tags }) => {
  return (
    <TechonologyTagContainer>
        {tags.map((tag: string, i: number) => {
          return (
            <TechonologyTag key={i}>
              {tag}
            </TechonologyTag>
          );
        })}
    </TechonologyTagContainer>
  );
};

const ProjectEntry: React.SFC<{project: IProjectFields}> = ({ project }) => {
  const tags = project.thumbnail.fields.technologies
    ? project.thumbnail.fields.technologies : [];
  return (
    <LinkComponent project={project}>
      <TechonologyTags tags={tags}/>
      <ProjectInfo>
        <ProjectTitle>{project.thumbnail.fields.name}</ProjectTitle>
      </ProjectInfo>
    </LinkComponent>
  );
};

export default ProjectEntry;
