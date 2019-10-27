import produce from 'immer';
import homeReducer from '../reducer';
import {
  SET_BAND_IDS,
  SET_PAGE_ID,
  SET_LOADING,
  CLEAR_HOME_PAGE
} from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      bands: [],
      loading: false,
      page: 1
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the SET_BAND_IDS action', () => {
    const val = [1, 2, 3];
    const expectedResult = produce(state, draft => {
      draft.bands = val;
    });

    expect(
      homeReducer(state, {
        type: SET_BAND_IDS,
        payload: val
      })
    ).toEqual(expectedResult);
  });

  it('should handle the SET_PAGE_ID action', () => {
    const val = 2;
    const expectedResult = produce(state, draft => {
      draft.page = val;
    });

    expect(
      homeReducer(state, {
        type: SET_PAGE_ID,
        payload: val
      })
    ).toEqual(expectedResult);
  });

  it('should handle the SET_LOADING action', () => {
    const val = true;
    const expectedResult = produce(state, draft => {
      draft.loading = val;
    });

    expect(
      homeReducer(state, {
        type: SET_LOADING,
        payload: val
      })
    ).toEqual(expectedResult);
  });

  it('should handle the CLEAR_HOME_PAGE action', () => {
    const val = [];
    const expectedResult = produce(state, draft => {
      draft.bands = val;
    });

    expect(
      homeReducer(state, {
        type: CLEAR_HOME_PAGE,
        payload: val
      })
    ).toEqual(expectedResult);
  });
});
