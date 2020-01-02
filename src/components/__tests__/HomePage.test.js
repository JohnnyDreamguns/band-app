import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import HomePage from '../HomePage';
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
  actions: {
    setPreviousPage: jest.fn(),
    setNextPage: jest.fn()
  }
};

describe('<HomePage />', () => {
  it('should match the snapshot', () => {
    renderer.render(<HomePage {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should show loading indicator', () => {
    renderer.render(<HomePage {...props} loading={true} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should show no content if band data is missing', () => {
    renderer.render(<HomePage {...props} bands={[]} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
