import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { BandPage } from '../index';

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
  },
  getBandById: jest.fn(),
  clearBandpage: jest.fn()
};

describe('<BandPage />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<BandPage {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
