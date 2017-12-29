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
});

const ToolTipContainer = glamorous.div({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  background: colors.white,
  borderTop: `0.1rem solid ${colors.lightGray}`,
  '& p': {
    fontSize: '80%',
    marginLeft: '0.3rem',
    marginRight: '0.3rem',
    marginTop: '0.5rem',
    marginBottom: '2rem',
  },
});

const ToolTipComponent: React.SFC<{text: string}> = ({ text }) => (
  <ToolTipContainer>
    <p>{text}</p>
  </ToolTipContainer>
);

interface ILinkState {
  showToolTip: boolean;
}

class LinkComponent extends React.Component<{project: IProjectFields}, ILinkState> {

  constructor(props: {project: IProjectFields}) {
    super(props);
    this.state = {
      showToolTip: false,
    };
    this.triggerTooltip = this.triggerTooltip.bind(this);
  }

  triggerTooltip(status: boolean) {
    this.setState({ showToolTip: status });
  }

  render() {
    const style = {
      backgroundImage: `url(${this.props.project.thumbnail.fields.image.fields.file.url})`,
      backgroundColor: this.props.project.thumbnail.fields.backgroundColor,
      backgroundPosition:this.props.project.thumbnail.fields.backgroundPosition,
    };

    // If direct link is not defined, assume that entry content exists
    if (!this.props.project.directLink) {
      return (
        <Link onMouseEnter={e => this.triggerTooltip(true)}
          onMouseLeave={e => this.triggerTooltip(false)} 
          to={`/project/${this.props.project.id}`} id={this.props.project.id} style={style}>
          {this.state.showToolTip &&
            <ToolTipComponent text={this.props.project.thumbnail.fields.description}/>}
          {this.props.children}
        </Link>
      );
    }
    return (
      <a onMouseEnter={e => this.triggerTooltip(true)}
        onMouseLeave={e => this.triggerTooltip(false)} 
        href={this.props.project.directLink}
        target="_blank" id={this.props.project.id} style={style}>
        {this.state.showToolTip &&
          <ToolTipComponent text={this.props.project.thumbnail.fields.description}/>}
        {this.props.children}
      </a>
    );
  }
}

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

const TechonologyTags: React.SFC<{tags: string[], selectedTechnologies: string[]}> =
({ tags, selectedTechnologies }) => {
  return (
    <TechonologyTagContainer>
        {tags.map((tag: string, i: number) => {
          const style = (selectedTechnologies.indexOf(tag.toLowerCase()) !== -1) ?
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

const ProjectEntry: React.SFC<{project: IProjectFields, selectedTechnologies: string[]}> =
({ project, selectedTechnologies }) => {
  const tags = project.thumbnail.fields.technologies
    ? project.thumbnail.fields.technologies : [];

  const intersection = tags.filter(_ => selectedTechnologies.indexOf(_.toLowerCase()) !== -1);

  if (selectedTechnologies.length !== 0 && intersection.length === 0) {
    return null;
  }

  return (
    <LinkComponent project={project}>
      <TechonologyTags tags={tags} selectedTechnologies={selectedTechnologies}/>
      <ProjectInfo>
        <ProjectTitle>{project.thumbnail.fields.name}</ProjectTitle>
      </ProjectInfo>
    </LinkComponent>
  );
};

export default ProjectEntry;
