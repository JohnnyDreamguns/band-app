import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { HomePage } from '../index';

const renderer = new ShallowRenderer();

const props = {
  page: 2,
  numOfPages: 5,
  loading: false,
  bands: [
    {
      id: 1,
      name: 'Band Name',
      bio: 'Band description'
    }
  ],
  loadBands: jest.fn(),
  setPreviousPage: jest.fn(),
  setNextPage: jest.fn(),
  clearHomepage: jest.fn()
};

describe('<HomePage />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<HomePage {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
