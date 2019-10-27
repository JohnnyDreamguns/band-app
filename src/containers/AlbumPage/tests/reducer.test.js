import produce from 'immer';
import albumReducer from '../reducer';
import { SET_ALBUM_ID, CLEAR_ALBUM_PAGE, SET_LOADING } from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('albumReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      albumId: undefined,
      loading: false
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(albumReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the SET_ALBUM_ID action', () => {
    const val = 2;
    const expectedResult = produce(state, draft => {
      draft.albumId = val;
    });

    expect(
      albumReducer(state, {
        type: SET_ALBUM_ID,
        payload: val
      })
    ).toEqual(expectedResult);
  });

  it('should handle the CLEAR_ALBUM_PAGE action', () => {
    const val = undefined;
    const expectedResult = produce(state, draft => {
      draft.albumId = val;
    });

    expect(
      albumReducer(state, {
        type: CLEAR_ALBUM_PAGE
      })
    ).toEqual(expectedResult);
  });

  it('should handle the CLEAR_ALBUM_PAGE action', () => {
    state.albumId = 5;
    const val = undefined;
    const expectedResult = produce(state, draft => {
      draft.albumId = val;
    });

    expect(
      albumReducer(state, {
        type: CLEAR_ALBUM_PAGE
      })
    ).toEqual(expectedResult);
  });

  it('should handle the SET_LOADING action', () => {
    const val = true;
    const expectedResult = produce(state, draft => {
      draft.loading = true;
    });

    expect(
      albumReducer(state, {
        type: SET_LOADING,
        payload: val
      })
    ).toEqual(expectedResult);
  });
});
