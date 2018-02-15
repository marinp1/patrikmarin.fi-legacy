import * as React from 'react';
import glamorous from 'glamorous';
import { IWork, IEducation, IAward, ILanguage, ISkill } from
  'shared/interfaces/IResume';
import { mediaQueries, colors } from '../../../styles';

import AboutComponent from './AboutComponent';
import ImageComponent from './ImageComponent';
import { WorkExperience, Education, Competitions } from './EntryComponents/TimelineComponents';
import { Languages, Skills } from './EntryComponents/TagComponents';

import MenuComponent from '../MenuComponent';

const image = require('../images/cv_round_small_zoom.png');

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
  name: string;
  summary: string;
  workplaces: IWork[];
  educations: IEducation[];
  competitions: IAward[];
  languages: ILanguage[];
  skills: ISkill[];
}

const CurriculumComponent: React.SFC<CurriculumComponentProps> = (props) => {
  return (
    <Container>
      <div className="container">
        <div className="row">
          <ImageComponent image={image} altText={props.name}/>
        </div>
        <MenuComponent/>
        <div className="row">
          <AboutComponent title="About" summary={props.summary}/>
        </div>
        <div className="row">
          <div className="seven columns">
            <WorkExperience workplaces={props.workplaces}/>
            <Education educations={props.educations}/>
          </div>
          <div className="five columns">
            <Competitions competitions={props.competitions}/>
            <Languages languages={props.languages}/>
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <Skills
              skills={props.skills}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CurriculumComponent;
