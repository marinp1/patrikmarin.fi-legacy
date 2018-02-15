import * as React from 'react';
import glamorous from 'glamorous';
import { IWork, IEducation, IAward, ILanguage, ISkill } from
  'shared/interfaces/IResume';
import { colors } from '../../../styles';

import AboutComponent from './AboutComponent';
import { WorkExperience, Education, Competitions } from './EntryComponents/TimelineComponents';
import { Languages, Skills } from './EntryComponents/TagComponents';

const Container = glamorous.section({
  background: colors.background,
  '& p': {
    color: colors.gray,
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
