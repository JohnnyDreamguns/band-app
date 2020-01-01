import React from 'react';
import { makeStore } from '../makeStore';
import ShallowRenderer from 'react-test-renderer/shallow';
import { testHook } from '../../testUtils/testHook';

const mockState = {
  test: 'mock!',
  test2: 'mock!'
};

const renderer = new ShallowRenderer();

describe('makeStore', () => {
  it('context provider with initialState should match snapshot', () => {
    const { StoreProvider } = makeStore(mockState);
    renderer.render(<StoreProvider />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('context provider with initialValue should match snapshot', () => {
    const { StoreProvider } = makeStore();
    renderer.render(<StoreProvider initialValue={{ tester: 'sdsdvd' }} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('context provider with no initialState and no initialValue should match snapshot', () => {
    const { StoreProvider } = makeStore();
    renderer.render(<StoreProvider />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should provide a custom hook', () => {
    const { useStore } = makeStore();

    testHook(() => {
      const { state, setState } = useStore();
      expect(state).toEqual({});
      expect(typeof setState).toBe('function');
    });
  });
});
