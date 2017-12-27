import * as React from 'react';
import glamorous from 'glamorous';
import { RouteComponentProps, withRouter } from 'react-router-dom';
//
import { IProject, IEntry, ILink, IWhat, IWhy,
  ICurrentStatus, IImage, ImageClassEnum } from '../../interface/projectInterface';
import { fonts } from '../../styles';

const Container = glamorous.div({
  marginTop: '30px',
  marginBottom: '20px',
  '& h1, h2, h3, h4, h5, h6': {
    fontFamily: fonts.projectPage.title,
  },
  '& p': {
    fontFamily: fonts.projectPage.text,
  },
  '& a': {
    fontFamily: fonts.projectPage.text,
  },
});

const NavigationLink = glamorous.a({
  marginRight: '10px',
  textDecoration: 'none',
  cursor: 'pointer',
  ':hover': {
    textDecoration: 'underline',
  },
});

const ExternalLinkContainer = glamorous.div({
  '& a': {
    color: '#000',
  },
  '& a:hover': {
    color: '#000',
  },
});

const HeaderContainer = glamorous.div({
  paddingTop: '30px',
  paddingBottom: '10px',
  marginBottom: '40px',
  borderBottom: `2px solid ${'#ddd'}`,
});

const ContentContainer = glamorous.div({
  borderBottom: '2px solid #ddd',
  '& .row': {
    paddingBottom: '0.5rem',
  },
});

const SegmentTitle = glamorous.p({
  fontWeight: 'bold',
  marginBottom: '1rem',
});

const SegmentText = glamorous.p({
  textAlign: 'justify',
});

const SegmentImageContainer = glamorous.div({
  marginBottom: '2.5rem',
  textAlign: 'center',
  '& img': {
    maxWidth: '100%',
    boxShadow: '0px 0px 10px 1px rgba(171,171,171,1)',
  },
});

const SegmentImageDescription = glamorous.p({
  textAlign: 'center',
  fontSize: '80%',
});

const FooterContainer = glamorous.div({
  marginTop: '20px',
});

function getImageClasses(classNames: ImageClassEnum[]): React.CSSProperties {
  const style: React.CSSProperties = {};
  classNames.forEach((name: ImageClassEnum) => {
    switch (name) {
      case ImageClassEnum.PORTRAIT:
        style.maxHeight = '800px';
        style.maxWidth = '90%';
        break;
      case ImageClassEnum.NO_BG:
        style.boxShadow = 'none';
        break;
    }
  });
  return style;
}

type IDataSegment = IWhat | IWhy | ICurrentStatus;

const DataSegment: React.SFC<{title: string, data: IDataSegment}> = ({ title, data }) => (
  <div className="row">
    <SegmentTitle>{title}</SegmentTitle>
    <SegmentText>{data.text}</SegmentText>
    {data.images.map((image: IImage, i: number) => {
      return (
        <SegmentImageContainer key={i}>
          <img
            style={getImageClasses(image.classes)}
            src={image.filename}
          />
          <SegmentImageDescription>
            {image.altText}
          </SegmentImageDescription>
        </SegmentImageContainer>
      );
    })}
  </div>
);

interface IProjectState {
  project: IEntry | undefined;
}

class ProjectComponent extends React.Component<RouteComponentProps<any>, IProjectState> {

  state: IProjectState = {
    project: undefined,
  };

  componentDidMount() {
    const projects: IProject[] = require('../../data/projects.json');
    const entry: IEntry | undefined =
      projects.filter(project => project.entry !== undefined)[0].entry;
    this.setState({ project: entry });
  }

  render() {

    const project = this.state.project;

    if (project === undefined) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <Container>
        <div className="container">
          <div>
            <NavigationLink href="/">
              <i className="fa fa-angle-left fa-lg fa-fw"></i>
              Back to menu
            </NavigationLink>
          </div>
          <HeaderContainer>
            <div className="row">
              <div className="twelve columns">
                <h1>{project.title}</h1>
                <h5>{project.subtitle}</h5>
                <ExternalLinkContainer>
                  {project.links.map((link: ILink, i: number) => {
                    return (
                        <NavigationLink key={i}
                          href={link.url}>
                          <i className={`fa ${link.icon} fa-lg fa-fw`}></i>
                          {link.text}
                        </NavigationLink>
                    )
                  })}
                </ExternalLinkContainer>
              </div>
            </div>
          </HeaderContainer>
          <ContentContainer>
            <DataSegment title="What?" data={project.what}/>
            <DataSegment title="Why?" data={project.why}/>
            <DataSegment title="Current status" data={project.currentStatus}/>
          </ContentContainer>
          <FooterContainer>
            <NavigationLink href="/">
              <i className="fa fa-angle-left fa-lg fa-fw"></i>
              Back to menu
            </NavigationLink>
          </FooterContainer>
        </div>
      </Container>
    );
  }
}

export default withRouter(ProjectComponent);
