import * as React from 'react';
import glamorous from 'glamorous';
import { Link } from 'react-router-dom';

import { colors } from '../../../styles';
import { IProjectFields } from 'shared/interfaces/IProject';

const ProjectInfo = glamorous.div({
  position: 'absolute',
  left: 0,
  right: 0,
  margin: 'auto',
  bottom: '-1.75rem',
  textAlign: 'center',
});

const ProjectTitle = glamorous.h6({
  display: 'inline-block',
  background: colors.lightGray,
  color: colors.black,
  padding: '0.5rem 1rem',
  margin: 0,
  textTransform: 'uppercase',
  height: '2rem',
  lineHeight: '2rem',
  fontSize: '80%',
  borderRadius: '0.5rem',
  fontWeight: 'bold',

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

const TechonologyTags: React.SFC<{tags: string[], selectedSkills: string[]}> =
({ tags, selectedSkills }) => {
  return (
    <TechonologyTagContainer>
        {tags.map((tag: string, i: number) => {
          const style = (selectedSkills.indexOf(tag.toLowerCase()) !== -1) ?
            { fontWeight: 'bold' } : {};
          return (
            <TechonologyTag key={i} style={style}>
              {tag}
            </TechonologyTag>
          );
        })}
    </TechonologyTagContainer>
  );
};

const ProjectEntry: React.SFC<{project: IProjectFields, selectedSkills: string[]}> =
({ project, selectedSkills }) => {
  const tags = project.thumbnail.fields.technologies
    ? project.thumbnail.fields.technologies : [];

  const intersection = tags.filter(_ => selectedSkills.indexOf(_.toLowerCase()) !== -1);

  if (selectedSkills.length !== 0 && intersection.length === 0) {
    return null;
  }

  return (
    <LinkComponent project={project}>
      <TechonologyTags tags={tags} selectedSkills={selectedSkills}/>
      <ProjectInfo>
        <ProjectTitle>{project.thumbnail.fields.name}</ProjectTitle>
      </ProjectInfo>
    </LinkComponent>
  );
};

export default ProjectEntry;
