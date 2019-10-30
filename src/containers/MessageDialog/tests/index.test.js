import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { MessageDialog, mapStateToProps } from '../index';

const renderer = new ShallowRenderer();

const props = {
  messages: {
    error: 'There was an error',
    info: 'This is for info'
  }
};

describe('<MessageDialog />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<MessageDialog {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});

describe('mapStateToProps', () => {
  it('should return the correct data', () => {
    const mockState = {
      messages: {
        mockProp: 'Mock!'
      }
    };

    expect(mapStateToProps(mockState)).toEqual({
      messages: { mockProp: 'Mock!' }
    });
  });
});
