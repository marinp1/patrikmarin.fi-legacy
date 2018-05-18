import * as React from 'react';
import glamorous from 'glamorous';
import * as moment from 'moment';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as IResume from 'shared/interfaces/IResume';
import { IProjectFields } from 'shared/interfaces/IProject';
import { IFlickrPhotosetsResponse,
  IFlickrPhoto, IFlickrContentResult } from 'shared/interfaces/IFlickr';
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

  async getPhotos(): Promise<void> {

    // Make multiple api calls here instead of packing all to one
    // in order to avoid timeouts
    const photosets: IFlickrPhotosetsResponse | undefined = await fetch('/api/photosets')
      .then(res => res.json())
      .catch((err) => {
        console.log(`Couldn't fetch photosets from Flickr!`);
        return undefined;
      });

    // Abort if fetch failed
    if (!photosets) {
      return;
    }

    let photos: IFlickrPhoto[] = [];

    // Get all photos from photosets
    for (const photosetId of photosets.photosetIds) {
      const photosetPhotos: IFlickrPhoto[] = await fetch(`/api/photoset/${photosetId}`)
        .then(res => res.json())
        .catch((err) => {
          console.log(`Couldn't fetch photos from Flickr!`);
          return [];
        });
      photos = photos.concat(photosetPhotos);
    }

    photos.sort((a, b) => {
      const dateA = moment(a.datetaken).unix();
      const dateB = moment(b.datetaken).unix();
      return dateB - dateA;
    });

    this.setState({
      flickr: {
        albumNames: photosets.albumNames.sort(),
        images: photos,
      },
    });
  }

  componentDidMount() {
    this.getProjects();
    this.getPhotos();
  }

  render() {

    document.title = 'Patrik Marin';

    document.body.style.backgroundColor = colors.black;

    return (
      <div>
        <Background/>
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

