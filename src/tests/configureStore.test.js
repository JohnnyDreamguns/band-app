import configureStore from '../configureStore';

describe('configureStore', () => {
  it('should return store if no initial state is passed in', () => {
    const store = configureStore(undefined, {});
    expect(typeof store.dispatch).toBe('function');
    expect(typeof store.getState).toBe('function');
    expect(typeof store.replaceReducer).toBe('function');
    expect(typeof store.injectedReducers).toBe('object');
  });

  it('should return store if an initial state is passed in', () => {
    const store = configureStore({ data: 'Mock!' }, {});
    expect(typeof store.dispatch).toBe('function');
    expect(typeof store.getState).toBe('function');
    expect(typeof store.replaceReducer).toBe('function');
    expect(typeof store.injectedReducers).toBe('object');
  });
});
