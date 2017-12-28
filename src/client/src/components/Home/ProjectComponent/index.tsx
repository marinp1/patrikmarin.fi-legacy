import * as React from 'react';
import glamorous from 'glamorous';

import { mediaQueries, colors } from '../../../styles';
import { IProjectFields } from 'shared/interfaces/IProject';

import ProjectEntry from './ProjectEntry';
import Skills from './Skills';

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
    marginBottom: 'calc(2rem + 1rem)',
    [mediaQueries.mobile]: {
      height: '29vw',
      width: '46%',
      marginRight: '2%',
      marginBottom: 'calc(2% + 1rem)',
    },
    [mediaQueries.tablet]: {
      height: '24vw',
    },
    [mediaQueries.desktop]: {
      height: '18vw',
      width: '31%',
    },
  },
  '& a:hover': {
    opacity: 0.8,
  },
});

interface ProjectComponentProps {
  projects: IProjectFields[];
}

interface ProjectComponentState {
  selectedSkills: string[];
}

class ProjectComponent extends React.Component<ProjectComponentProps, ProjectComponentState> {

  constructor(props: ProjectComponentProps) {
    super(props);
    this.state = {
      selectedSkills: [],
    };

    this.handleSkillSelection = this.handleSkillSelection.bind(this); 
  }

  handleSkillSelection(skillName: string) {
    const wasSelected = this.state.selectedSkills.indexOf(skillName.toLowerCase()) !== -1;
    if (wasSelected) {
      const filteredSkills = this.state.selectedSkills.filter((skill) => {
        return skill !== skillName.toLowerCase();
      });
      this.setState({ selectedSkills: filteredSkills });
    } else {
      const newSkills = this.state.selectedSkills.concat(skillName.toLowerCase());
      this.setState({ selectedSkills: newSkills });
    }
  }

  render() {

    // Create list of all unique technology tags
    const tags = Array.from(new Set(this.props.projects.map((project: IProjectFields) => {
      return project.thumbnail.fields.technologies;
    }).reduce((a, b) => a.concat(b), []))).sort();

    return (
      <Container id="projects">
        <div className="container">
          <div className="row">
            <Title>
              <i className="fa fa-desktop" style={{ marginRight: '1rem' }}/>
              Projects
            </Title>
          </div>
          <div className="row">
            <Skills skills={tags} selectedSkills={this.state.selectedSkills}
              handleClick={this.handleSkillSelection}/>
          </div>
          <ProjectContainer>
            {this.props.projects.map((project: IProjectFields, i: number) => {
              return <ProjectEntry key={i} project={project}
                selectedSkills={this.state.selectedSkills}/>;
            })}
          </ProjectContainer>
        </div>
      </Container>
    );
  }
}

export default ProjectComponent;
