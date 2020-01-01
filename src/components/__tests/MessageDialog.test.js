import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import MessageDialog from '../MessageDialog';

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
