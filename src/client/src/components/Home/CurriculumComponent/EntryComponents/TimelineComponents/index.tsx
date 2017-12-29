import * as React from 'react';
import glamorous from 'glamorous';
import { IWork, IEducation, IAward } from'shared/interfaces/IResume';
import { EntryContainer, EntryHeaderComponent } from '../CommonComponents';

import DescriptionComponent from './DescriptionComponent';
import DurationComponent from './DurationComponent';

const TimelineEntry = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
});

export const WorkExperience: React.SFC<{workplaces: IWork[]}> = ({ workplaces }) => (
  <EntryContainer>
    <EntryHeaderComponent icon="fa-briefcase"
      text="Work Experience"/>
    {workplaces.map((workplace: IWork, i: number) => {
      return (
        <TimelineEntry key={i}>
          <DurationComponent start={workplace.startDate} end={workplace.endDate}/>
          <DescriptionComponent
            title={workplace.company}
            subtitle={workplace.position}
            text={workplace.summary}
            textAlign={'justify'}
            last={workplaces.length - 1 === i}
          />
        </TimelineEntry>
      );
    })}
  </EntryContainer>
);

export const Education: React.SFC<{educations: IEducation[]}> = ({ educations }) => (
  <EntryContainer>
    <EntryHeaderComponent icon="fa-graduation-cap"
      text="Education"/>
    {educations.map((education: IEducation, i: number) => {
      const description = education.area ?
        `${education.area}, ${education.institution}` :
        education.institution;
      return (
        <TimelineEntry key={i}>
          <DurationComponent start={education.startDate} end={education.endDate}/>
          <DescriptionComponent
            title={education.studyType}
            subtitle={education.estGraduation ? `(est. grad. ${education.estGraduation})` : ''}
            text={description}
            textAlign={'left'}
            last={educations.length - 1 === i}
            subtitleVisible={education.estGraduation !== undefined}
          />
        </TimelineEntry>
      );
    })}
  </EntryContainer>
);

export const Competitions: React.SFC<{competitions: IAward[]}> = ({ competitions }) => (
  <EntryContainer>
    <EntryHeaderComponent icon="fa-trophy"
      text="Projects & Certificates"/>
    {competitions.map((competition: IAward, i: number) => {
      const headerText = competition.awarder ? competition.awarder : competition.title;
      return (
        <TimelineEntry key={i}>
          <DurationComponent start={competition.date}/>
          <DescriptionComponent
            title={headerText}
            subtitle={competition.title}
            text={competition.summary}
            textAlign={'justify'}
            last={competitions.length - 1 === i}
            subtitleVisible={!!competition.awarder}
          />
        </TimelineEntry>
      );
    })}
  </EntryContainer>
);
