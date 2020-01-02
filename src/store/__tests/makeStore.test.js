import React from 'react';
import { makeStore } from '../makeStore';
import ShallowRenderer from 'react-test-renderer/shallow';
import { testHook } from '../../testUtils/testHook';
import { StoreProvider as SP } from '../../store/store';

const mockState = {
  test: 'mock!',
  test2: 'mock!'
};

const renderer = new ShallowRenderer();

const { useStore } = makeStore();

let useStoreHook;
beforeEach(() => {
  testHook(() => {
    useStoreHook = useStore();
  }, SP);
});

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

  it('useStore hook have a setState function', () => {
    expect(useStoreHook.setState).toEqual(expect.any(Function));
  });

  it('useStore hook should return expected value', () => {
    expect(useStoreHook.state).toStrictEqual({});
  });
});
