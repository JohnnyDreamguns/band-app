import produce from 'immer';
import bandReducer from '../reducer';
import {
  SET_BAND_ID,
  CLEAR_BAND_PAGE,
  SET_LOADING,
  SET_ALBUM_IDS
} from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('bandReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      bandId: undefined,
      loading: false,
      albums: []
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(bandReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the SET_BAND_ID action', () => {
    const val = 3;
    const expectedResult = produce(state, draft => {
      draft.bandId = val;
    });

    expect(
      bandReducer(state, {
        type: SET_BAND_ID,
        payload: val
      })
    ).toEqual(expectedResult);
  });

  it('should handle the CLEAR_BAND_PAGE action', () => {
    const expectedResult = produce(state, draft => {
      draft.bandId = undefined;
    });

    expect(
      bandReducer(state, {
        type: CLEAR_BAND_PAGE
      })
    ).toEqual(expectedResult);
  });

  it('should handle the SET_LOADING action', () => {
    const val = true;
    const expectedResult = produce(state, draft => {
      draft.loading = val;
    });

    expect(
      bandReducer(state, {
        type: SET_LOADING,
        payload: val
      })
    ).toEqual(expectedResult);
  });

  it('should handle the SET_ALBUM_IDS action', () => {
    const val = [4, 5, 6];
    const expectedResult = produce(state, draft => {
      draft.albums = val;
    });

    expect(
      bandReducer(state, {
        type: SET_ALBUM_IDS,
        payload: val
      })
    ).toEqual(expectedResult);
  });
});
