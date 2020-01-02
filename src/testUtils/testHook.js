import React from 'react';
import TestRenderer from 'react-test-renderer';

const TestHook = ({ callback }) => {
  callback();
  return null;
};

export const testHook = (callback, StoreProvider = null) => {
  if (StoreProvider) {
    TestRenderer.create(
      <StoreProvider>
        <TestHook callback={callback} />
      </StoreProvider>
    );
  } else {
    TestRenderer.create(<TestHook callback={callback} />);
  }
};
