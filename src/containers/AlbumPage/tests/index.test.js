import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { AlbumPage } from '../index';

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
  },
  getAlbumById: jest.fn(),
  clearAlbumpage: jest.fn()
};

describe('<AlbumPage />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<AlbumPage {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
