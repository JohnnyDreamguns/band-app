import React from 'react';
import TestRenderer from 'react-test-renderer';

const TestHook = ({ callback }) => {
  callback();
  return null;
};

export const testHook = (callback, StoreProvider = null) => {
  if (StoreProvider) {
    return TestRenderer.create(
      <StoreProvider>
        <TestHook callback={callback} />
      </StoreProvider>
    );
  } else {
    return TestRenderer.create(<TestHook callback={callback} />);
  }
};
