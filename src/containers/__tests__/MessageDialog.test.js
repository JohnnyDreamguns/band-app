import React from 'react';
import TestRenderer from 'react-test-renderer';
import MessageDialogContainer from '../MessageDialog';
import MessageDialog from '../../components/MessageDialog';

jest.mock('../../hooks/useMessages', () => ({
  useMessages: () => ({
    messages: 'mock messages',
    setError: 'mock setError',
    setErrorObject: 'mock setErrorObject',
    setInfo: 'mock setInfo'
  })
}));

describe('HomePage container', () => {
  const testRenderer = TestRenderer.create(<MessageDialogContainer />);
  const testInstance = testRenderer.root;

  it('should match the props sent to the component', () => {
    expect(testInstance.findByType(MessageDialog.type).props).toMatchSnapshot();
  });
});
