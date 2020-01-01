import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AlbumPage from '../AlbumPage';

const renderer = new ShallowRenderer();

const props = {
  albumId: 2,
  loading: false,
  album: {
    name: 'Album Name',
    released: '2009'
  },
  band: {
    id: 1,
    name: 'Band Name'
  }
};

describe('<AlbumPage />', () => {
  it('should match the snapshot', () => {
    renderer.render(<AlbumPage {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should show loading indicator', () => {
    renderer.render(<AlbumPage {...props} loading={true} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should show no content if band data is missing', () => {
    renderer.render(<AlbumPage {...props} band={undefined} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should show no content if album data is missing', () => {
    renderer.render(<AlbumPage {...props} album={undefined} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
