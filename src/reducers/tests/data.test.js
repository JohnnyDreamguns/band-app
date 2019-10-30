import produce from 'immer';
import dataReducer from '../data';
import {
  SET_BANDS,
  SET_TOTAL_NUM_BANDS,
  SET_ALBUMS,
  SET_TOTAL_NUM_ALBUMS
} from '../../constants/data';

/* eslint-disable default-case, no-param-reassign */
describe('data reducer', () => {
  let state;
  beforeEach(() => {
    state = {
      bands: {},
      albums: {}
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(dataReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the SET_BANDS action', () => {
    const val = {
      bandData: {
        band: 'mock'
      }
    };

    const expectedResult = produce(state, draft => {
      draft.bands = val;
    });

    expect(
      dataReducer(state, {
        type: SET_BANDS,
        payload: val
      })
    ).toEqual(expectedResult);
  });

  it('should handle the SET_TOTAL_NUM_BANDS action', () => {
    const val = 7;

    const expectedResult = produce(state, draft => {
      draft.totalNumBands = val;
    });

    expect(
      dataReducer(state, {
        type: SET_TOTAL_NUM_BANDS,
        payload: val
      })
    ).toEqual(expectedResult);
  });

  it('should handle the SET_ALBUMS action', () => {
    const val = {
      albumData: {
        album: 'mock'
      }
    };

    const expectedResult = produce(state, draft => {
      draft.albums = val;
    });

    expect(
      dataReducer(state, {
        type: SET_ALBUMS,
        payload: val
      })
    ).toEqual(expectedResult);
  });

  it('should handle the SET_TOTAL_NUM_ALBUMS action', () => {
    const val = 5;

    const expectedResult = produce(state, draft => {
      draft.totalNumAlbums = val;
    });

    expect(
      dataReducer(state, {
        type: SET_TOTAL_NUM_ALBUMS,
        payload: val
      })
    ).toEqual(expectedResult);
  });
});
