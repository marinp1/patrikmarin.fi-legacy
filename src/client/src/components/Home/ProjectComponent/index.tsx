import * as React from 'react';
import glamorous from 'glamorous';

import { mediaQueries, colors } from '../../../styles';
import { IProjectFields } from 'shared/interfaces/IProject';

import ProjectEntry from './ProjectEntry';
import TechnologySelectors from './TechnologySelectors';

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

const ButtonContainer = glamorous.button({
  margin: 0,
});

const ClearSelectionButton: React.SFC<{
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
}> = ({ handleClick }) => (
  <ButtonContainer className="button-primary" onClick={e => handleClick(e)}>
    Clear selection
  </ButtonContainer>
);

interface ProjectComponentProps {
  projects: IProjectFields[];
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
          <div className="row" style={{ marginBottom: '2rem' }}>
            <TechnologySelectors
              technologies={tags}
              selectedTechnologies={this.state.selectedTechnologies}
              handleClick={this.handleTechnologySelection}/>
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
