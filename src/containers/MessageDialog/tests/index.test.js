import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { MessageDialog } from '../index';

const renderer = new ShallowRenderer();

const props = {
  messages: {
    error: 'There was an error'
  }
};

describe('<MessageDialog />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<MessageDialog {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
