import * as React from 'react';
import glamorous from 'glamorous';
import * as moment from 'moment';
import { RouteComponentProps, withRouter } from 'react-router-dom';
//
import * as IResume from 'shared/interfaces/IResume';
import { IProjectFields } from 'shared/interfaces/IProject';
import { IFlickrContentResult } from 'shared/interfaces/IFlickr';
import LandingComponent from './LandingComponent';
import CurriculumComponent from './CurriculumComponent';
import ProjectComponent from './ProjectComponent';
import PhotographyComponent from './PhotographyComponent';
import FooterComponent from './FooterComponent';

import ImageComponent from './ImageComponent';
import MenuComponent from './MenuComponent';

import { colors, mediaQueries } from '../../styles';

const image = require('./images/cv_round_small_zoom.png');
const resume: IResume.IResume = require('./resume.json');

const Container = glamorous.div({
  [mediaQueries.tablet]: {
    marginBottom: '10rem',
  },
  '& section': {
    [mediaQueries.tablet]: {
      maxWidth: '80%',
      margin: 'auto',
    },
  },
  '& .columns': {
    [mediaQueries.untilDesktop]: {
      width: '100% !important',
      marginLeft: '0 !important',
    },
  },
});

/*
const Background = glamorous.div({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: -1,
  backgroundColor: colors.black,
  backgroundImage: `url(${require('./images/bg.jpg')})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
});
*/

interface IMainPageState {
  resume: IResume.IResume;
  projects: IProjectFields[];
  flickr: IFlickrContentResult;
}

class MainPage extends React.Component<RouteComponentProps<any>, IMainPageState> {

  constructor(props: RouteComponentProps<any>) {
    super(props);
    this.state = {
      resume,
      projects: [],
      flickr: { albumNames: [], images: [] },
    };

    this.getProjects = this.getProjects.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
  }

  getProjects(): void {
    fetch('/api/projects')
      .then(res => res.json())
      .then((projects: IProjectFields[]) => {
        this.setState({ projects });
      })
      .catch((err) => {
       // Handle error
        console.log('Couldn\'t fetch project data!');
      });
  }

  getPhotos(): void {
    fetch('/api/photos')
      .then(res => res.json())
      .then((content: IFlickrContentResult) => {

        // Sort images by timestamp
        const sortedImages = content.images.sort((a, b) => {
          const dateA = moment(a.datetaken).unix();
          const dateB = moment(b.datetaken).unix();
          return dateB - dateA;
        });

        this.setState({ 
          flickr: {
            albumNames: content.albumNames.sort(),
            images: sortedImages,
          },
        });

      })
      .catch((err) => {
       // Handle error
        console.log('Couldn\'t fetch photos from Flickr!');
      });
  }

  componentDidMount() {
    this.getProjects();
    this.getPhotos();
  }

  render() {

    document.title = 'Patrik Marin';

    document.body.style.backgroundColor = colors.black;

    document.body.style.height = '100vh';	
    document.body.style.width = '100vw';	
    document.body.style.backgroundImage = `url(${require('./images/bg.jpg')})`;	
    document.body.style.backgroundRepeat = 'no-repeat';	
    document.body.style.backgroundPosition = 'center center';	
    document.body.style.backgroundAttachment = 'fixed';	
    document.body.style.backgroundSize = 'cover';

    return (
      <div>
        <Container>
          <LandingComponent
            name={this.state.resume.basics.name}
            infoLabel={this.state.resume.basics.label}
            profiles={this.state.resume.basics.profiles}
            email={this.state.resume.basics.email}
          />
          <ImageComponent image={image} altText={this.state.resume.basics.name}/>
          <MenuComponent/>
          <CurriculumComponent
            name={this.state.resume.basics.name}
            summary={this.state.resume.basics.summary}
            workplaces={this.state.resume.work}
            educations={this.state.resume.education}
            competitions={this.state.resume.awards}
            languages={this.state.resume.languages}
            skills={this.state.resume.skills}
          />
          <ProjectComponent
            projects={this.state.projects}
          />
          <PhotographyComponent
            albumNames={this.state.flickr.albumNames}
            photos={this.state.flickr.images}
          />
          <FooterComponent/>
        </Container>
      </div>
    );
  }
}

export default withRouter(MainPage);

