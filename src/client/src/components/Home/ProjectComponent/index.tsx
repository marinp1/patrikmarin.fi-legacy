import * as React from 'react';
import glamorous from 'glamorous';

import { mediaQueries, colors } from '../../../styles';
import { IProjectFields } from 'shared/interfaces/IProject';
import { ComponentState } from '../';
import ProjectEntry from './ProjectEntry';
import { ClearSelectionButton, TagSelectors } from '../../Misc/TagSelectors';

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
  paddingTop: '2rem',
  marginTop: '-2rem',
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

const SelectionInfo = glamorous.p({
  margin: 0,
  marginBottom: '0.8rem',
});

interface ProjectComponentProps {
  projects: IProjectFields[];
  componentState: ComponentState;
}

interface ProjectComponentState {
  selectedTechnologies: string[];
}

class ProjectComponent extends React.Component<ProjectComponentProps, ProjectComponentState> {

  constructor(props: ProjectComponentProps) {
    super(props);
    this.state = {
      selectedTechnologies: [],
    };

    this.handleTechnologySelection = this.handleTechnologySelection.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
  }

  clearSelection() {
    this.setState({ selectedTechnologies: [] });
  }

  handleTechnologySelection(techName: string) {
    const wasSelected = this.state.selectedTechnologies.indexOf(techName.toLowerCase()) !== -1;
    if (wasSelected) {
      const filteredTechs = this.state.selectedTechnologies.filter((skill) => {
        return skill !== techName.toLowerCase();
      });
      this.setState({ selectedTechnologies: filteredTechs });
    } else {
      const newTechs = this.state.selectedTechnologies.concat(techName.toLowerCase());
      this.setState({ selectedTechnologies: newTechs });
    }
  }

  render() {

    if (this.props.componentState !== ComponentState.SUCCESS) {
      return (
        <Container>
          <div className="container">
            <div className="row">
              <Title id="projects">
                <i className="fa fa-desktop" style={{ marginRight: '1rem' }}/>
                Projects
              </Title>
            </div>
            <div className="row">
              {this.props.componentState === ComponentState.LOADING
                ? 'Loading...' : 'Couldn\'t fetch content :(' }
            </div>
          </div>
        </Container>
      );
    }

    // Create list of all unique technology tags
    const tags = Array.from(new Set(this.props.projects.map((project: IProjectFields) => {
      return project.thumbnail.fields.technologies;
    }).reduce((a, b) => a.concat(b), []))).sort();

    // Get amount projects that are displayed
    const projectCount = this.props.projects.filter((_) => {
      return _.thumbnail.fields.technologies.filter((tech) => {
        return this.state.selectedTechnologies.indexOf(tech.toLowerCase()) !== -1;
      }).length > 0;
    }).length;

    // If selection is empty, all projects are displayed
    const displayedProjectCount = projectCount === 0
      ? this.props.projects.length : projectCount;

    const message = 'Displaying ' + displayedProjectCount + 
                    ' / ' + this.props.projects.length + ' projects';

    return (
      <Container>
        <div className="container">
          <div className="row">
            <Title id="projects">
              <i className="fa fa-desktop" style={{ marginRight: '1rem' }}/>
              Projects
            </Title>
          </div>
          <div className="row" style={{ marginBottom: '2rem' }}>
            <TagSelectors
              tags={tags}
              selectedTags={this.state.selectedTechnologies}
              handleClick={this.handleTechnologySelection}/>
              <SelectionInfo>
                {message}
              </SelectionInfo>
              <ClearSelectionButton handleClick={this.clearSelection}/>
          </div>
          <ProjectContainer>
            {this.props.projects.map((project: IProjectFields, i: number) => {
              return <ProjectEntry key={i} project={project}
                selectedTechnologies={this.state.selectedTechnologies}/>;
            })}
          </ProjectContainer>
        </div>
      </Container>
    );
  }
}

export default ProjectComponent;
