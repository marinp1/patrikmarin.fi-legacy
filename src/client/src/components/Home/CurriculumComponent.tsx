import * as React from 'react';
import glamorous from 'glamorous';
import { IWork, IEducation, IAward, ILanguage, ISkill } from
  'shared/interfaces/IResume';
import { mediaQueries, colors } from '../../styles';

const Container = glamorous.section({
  paddingTop: '1rem',
  background: colors.background,
  '& p': {
    color: colors.gray,
  },
});

const AboutContainer = glamorous.div({
  textAlign: 'justify',
  marginTop: '1rem',
  paddingTop: '3rem',
  '& p': {
    marginBottom: '3rem !important',
  },
});

const Title = glamorous.h6({
  textTransform: 'uppercase',
  marginBottom: '1.5rem !important',
  fontWeight: 'bold',
  color: colors.gray,
  '& i': {
    marginRight: '1rem',
  },
});

const EntryContainer = glamorous.div({
  position: 'relative',
  marginBottom: '4rem',
});

const EntryHeader = glamorous.h6({
  marginTop: '0.5rem !important',
  marginBottom: '1.5rem !important',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  '& i': {
    marginRight: '1rem',
  },
});

const Entry = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
});

const DurationContainer = glamorous.div({
  position: 'relative',
  minWidth: '56px',
  marginRight: '1.5rem',
  paddingRight: '1.5rem',
  borderRight: `0.1rem solid ${colors.gray}`,

  '& p': {
    fontSize: '90%',
    textAlign: 'right',
    margin: 0,
  },
});

const TimelineTag = glamorous.div({
  position: 'absolute',
  right: '-0.3rem',
  top: '1.1rem',
  width: '0.6rem',
  height: '0.1rem',
  background: colors.gray,
});

const DescriptionContainer = glamorous.div({
  flexGrow: 3,
  '& p': {
    margin: 0,
  },
});

const DescriptionHeader = glamorous.h6({
  margin: 0,
  color: colors.black,
  fontWeight: 'bold',
});

const DescriptionSubtitle = glamorous.p({
  color: colors.black,
  fontWeight: 'bold',
});

const DescriptionText = glamorous.p({
  textAlign: 'justify',
  fontSize: '90%',
});

const TagEntry = glamorous.div({
  border: `0.3rem solid ${colors.lightGray}`,
  borderRadius: '0.5rem',
  background: colors.white,
  display: 'inline-block',
  marginRight: '0.8rem',
  marginBottom: '0.8rem',

  '& p': {
    padding: '0 0.5rem',
    margin: 0,
    color: colors.black,
    display: 'inline-block',
  },
});

const TagEntryMain = glamorous.p({
  fontWeight: 'bold',
});

const ImageContainer = glamorous.div({
  [mediaQueries.tablet]: {
    maxWidth: '80%',
    margin: 'auto',
  },
});

const ImageHolder = glamorous.div({
  width: '10rem',
  height: '10rem',
  padding: '1rem',
  margin: 'auto',
  marginTop: '-7rem',
  background: colors.background,
  borderRadius: '50%',
  '& img': {
    width: 'inherit',
    height: 'inherit',
    borderRadius: 'inherit',
    border: `0.1rem solid ${colors.gray}`,
  },
});

const ImageComponent: React.SFC<{image: any}> = ({ image }) => (
  <ImageContainer>
    <ImageHolder>
      <img src={image} alt={'Patrik Marin'}/>
    </ImageHolder>
  </ImageContainer>
);

const WorkExperience: React.SFC<{workplaces: IWork[]}> = ({ workplaces }) => (
  <EntryContainer>
    <EntryHeader>
      <i className="fa fa-briefcase"></i>
      Work Experience
    </EntryHeader>
    {workplaces.map((workplace: IWork, i: number) => {
      return (
        <Entry key={i}>
          <DurationContainer>
            {workplace.endDate === workplace.startDate ?
              <p>{workplace.endDate}</p> :
              <p>{workplace.endDate}<br/>{workplace.startDate}</p>
            }
            <TimelineTag/>
          </DurationContainer>
          <DescriptionContainer>
            <DescriptionHeader>{workplace.company}</DescriptionHeader>
            <DescriptionSubtitle>{workplace.position}</DescriptionSubtitle>
            {workplaces.length - 1 === i ? 
              <DescriptionText>{workplace.summary}</DescriptionText> : 
              <DescriptionText style={{ marginBottom: '2rem' }}>
                {workplace.summary}
              </DescriptionText>
            }
          </DescriptionContainer>
        </Entry>
      );
    })}
  </EntryContainer>
);

const Education: React.SFC<{educations: IEducation[]}> = ({ educations }) => (
  <EntryContainer>
    <EntryHeader>
      <i className="fa fa-graduation-cap"></i>
      Education
    </EntryHeader>
    {educations.map((education: IEducation, i: number) => {
      const description = education.area ?
        `${education.area}, ${education.institution}` :
        education.institution;
      return (
        <Entry key={i}>
          <DurationContainer>
            <p>{education.endDate}<br/>{education.startDate}</p>
            <TimelineTag/>
          </DurationContainer>
          <DescriptionContainer>
            <DescriptionHeader>{education.studyType}</DescriptionHeader>
            {education.estGraduation &&
              <DescriptionSubtitle
                style={{ fontWeight: 'lighter' }}>
                (est. grad. {education.estGraduation})
              </DescriptionSubtitle>
            }
            {educations.length - 1 === i ? 
              <DescriptionText
                style={{ textAlign: 'left' }}>
                {description}
              </DescriptionText> : 
              <DescriptionText
                style={{ textAlign: 'left', marginBottom: '2rem' }}>
                {description}
              </DescriptionText>
            }
          </DescriptionContainer>
        </Entry>
      );
    })}
  </EntryContainer>
);

const Competitions: React.SFC<{competitions: IAward[]}> = ({ competitions }) => (
  <EntryContainer>
    <EntryHeader>
      <i className="fa fa-trophy"></i>
      Projects & Certificates
    </EntryHeader>
    {competitions.map((competition: IAward, i: number) => {
      const headerText = competition.awarder ? competition.awarder : competition.title;
      return (
        <Entry key={i}>
          <DurationContainer>
            <p>{competition.date}</p>
            <TimelineTag/>
          </DurationContainer>
          <DescriptionContainer>
            <DescriptionHeader>{headerText}</DescriptionHeader>
            {competition.awarder && <DescriptionSubtitle>{competition.title}</DescriptionSubtitle>}
            {competitions.length - 1 === i ? 
              <DescriptionText>{competition.summary}</DescriptionText> : 
              <DescriptionText style={{ marginBottom: '2rem' }}>
                {competition.summary}
              </DescriptionText>
            }
          </DescriptionContainer>
        </Entry>
      );
    })}
  </EntryContainer>
);

const Languages: React.SFC<{languages: ILanguage[]}> = ({ languages }) => (
  <EntryContainer style={{ marginBottom: '3.2rem !important' }}>
    <EntryHeader>
      <i className="fa fa-globe"></i>
      Languages
    </EntryHeader>
    {languages.map((language: ILanguage, i: number) => {
      return (
        <TagEntry key={i}>
          <TagEntryMain>{language.language}</TagEntryMain>
          <p>{language.fluency}</p>
        </TagEntry>
      );
    })}
  </EntryContainer>
);

const Skills: React.SFC<{skills: ISkill[]}> = ({ skills }) => (
  <EntryContainer style={{ marginBottom: '3.2rem !important' }}>
    <EntryHeader>
      <i className="fa fa-star"></i>
      Skills
    </EntryHeader>
    {skills.map((_: ISkill) => _.keywords.map((skill: string, i: number) => {
      return (
        <TagEntry key={_.name + i}>
          <TagEntryMain>{skill}</TagEntryMain>
        </TagEntry>
      );
    }))}
  </EntryContainer>
);

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

    const image = require('./images/cv_round_small_zoom.png');

    return (
      <Container>
        <div className="container">
          <div className="row">
            <ImageComponent image={image}/>
          </div>
          <div className="row">
            <AboutContainer id="description" className="twelve columns">
              <Title>
                <i className="fa fa-user-circle"></i>
                ABOUT
              </Title>
              <p>{this.props.summary}</p>
            </AboutContainer>
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
