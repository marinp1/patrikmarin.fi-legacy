import * as React from 'react';
import glamorous from 'glamorous';
import { IWork, IEducation, IAward, ILanguage, ISkill } from
  'shared/interfaces/IResume';
import { mediaQueries, colors } from '../../../styles';

import AboutComponent from './AboutComponent';
import ImageComponent from './ImageComponent';
import { WorkExperience, Education, Competitions } from './EntryComponents/TimelineComponents';
import { Languages, Skills } from './EntryComponents/TagComponents';

const Container = glamorous.section({
  paddingTop: '1rem',
  background: colors.background,
  '& p': {
    color: colors.gray,
  },
  [mediaQueries.tablet]: {
    borderRadius: '0.4rem 0.4rem 0 0',
  },
});

interface CurriculumComponentProps {
  summary: string;
  workplaces: IWork[];
  educations: IEducation[];
  competitions: IAward[];
  languages: ILanguage[];
  skills: ISkill[];
}

class CurriculumComponent extends React.Component<CurriculumComponentProps, {}> {
  render() {

    const image = require('../images/cv_round_small_zoom.png');

    return (
      <Container>
        <div className="container">
          <div className="row">
            <ImageComponent image={image}/>
          </div>
          <div className="row">
            <AboutComponent title="About" summary={this.props.summary}/>
          </div>
          <div className="row">
            <div className="seven columns">
              <WorkExperience workplaces={this.props.workplaces}/>
              <Education educations={this.props.educations}/>
            </div>
            <div className="five columns">
              <Competitions competitions={this.props.competitions}/>
              <Languages languages={this.props.languages}/>
            </div>
          </div>
          <div className="row">
            <div className="twelve columns">
              <Skills skills={this.props.skills}/>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default CurriculumComponent;
