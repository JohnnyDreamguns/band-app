import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import BandPage from '../BandPage';

const renderer = new ShallowRenderer();

const props = {
  bandId: 2,
  loading: false,
  albums: [
    {
      id: 1,
      name: 'Album Name'
    }
  ],
  band: {
    id: 1,
    name: 'Band Name',
    bio: 'Band description'
  }
};

describe('<BandPage />', () => {
  it('should match the snapshot', () => {
    renderer.render(<BandPage {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should show loading indicator', () => {
    renderer.render(<BandPage {...props} loading={true} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should show no content if band data is missing', () => {
    renderer.render(<BandPage {...props} band={undefined} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should show no albums content if album data is missing', () => {
    renderer.render(<BandPage {...props} albums={undefined} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
