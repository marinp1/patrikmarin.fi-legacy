import * as React from 'react';
import glamorous from 'glamorous';

import { IFlickrPhoto } from 'shared/interfaces/IFlickr';
import { colors } from '../../../styles';
import { ComponentState } from '../';

import { TagSelectors } from '../../Misc/TagSelectors';
import GalleryComponent from './GalleryComponent';

const Container = glamorous.section({
  borderTop: `1px solid ${colors.lightGray}`,
  paddingTop: '4rem',
  background: colors.background,
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

interface PhotographyComponentProps {
  albumNames: string[];
  photos: IFlickrPhoto[];
  componentState: ComponentState;
}

interface PhotographyComponentState {
  selectedAlbums: string[];
}

class PhotographyComponent
  extends React.Component<PhotographyComponentProps, PhotographyComponentState> {

  constructor(props: PhotographyComponentProps) {
    super(props);

    this.state = {
      selectedAlbums: [],
    };

    this.handleCategorySelection = this.handleCategorySelection.bind(this);
  }

  handleCategorySelection(albumName: string) {

    const anchor = document.getElementById('photography');
    if (!!anchor) {
      anchor.scrollIntoView();
    }

    const wasSelected = this.state.selectedAlbums.indexOf(albumName.toLowerCase()) !== -1;
    if (wasSelected) {
      const filteredAlbums = this.state.selectedAlbums.filter((skill) => {
        return skill !== albumName.toLowerCase();
      });
      this.setState({ selectedAlbums: filteredAlbums });
    } else {
      const newAlbums = this.state.selectedAlbums.concat(albumName.toLowerCase());
      this.setState({ selectedAlbums: newAlbums });
    }
  }

  render() {

    if (this.props.componentState !== ComponentState.SUCCESS) {
      return (
        <Container>
          <div className="container">
            <div className="row">
              <Title id="photography">
                <i className="fa fa-camera" style={{ marginRight: '1rem' }}/>
                Photography
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

    return (
      <Container>
        <div className="container">
          <div className="row">
            <Title id="photography">
              <i className="fa fa-camera" style={{ marginRight: '1rem' }}/>
              Photography
            </Title>
            <div className="row" style={{ marginBottom: '2rem' }}>
              <TagSelectors
                tags={this.props.albumNames}
                selectedTags={this.state.selectedAlbums}
                handleClick={this.handleCategorySelection}/>
            </div>
            <GalleryComponent
              photos={this.props.photos} 
              selectedAlbums={this.state.selectedAlbums}/>
          </div>
        </div>
      </Container>
    );
  }
}

export default PhotographyComponent;
