import * as React from 'react';

// tslint:disable-next-line
const contentfulUrl = 'https://images.contentful.com/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg';

const ContentfulAttribution = () => (
  <a href="https://www.contentful.com/" rel="nofollow" target="_blank">
    <img
      src={contentfulUrl}
      style={{ maxWidth: '100px', width: '100%', float:'right' }}
      alt="Powered by Contentful"/>
  </a>
);

export default ContentfulAttribution;
