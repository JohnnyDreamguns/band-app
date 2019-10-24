import produce from 'immer';
import {
  SET_BANDS,
  SET_TOTAL_NUM_BANDS,
  SET_ALBUMS,
  SET_TOTAL_NUM_ALBUMS
} from '../constants/data';

// The initial state of the App
export const initialState = {
  bands: {},
  albums: {}
};

/* eslint-disable default-case, no-param-reassign */
const dataReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_BANDS:
        draft.bands = { ...draft.bands, ...action.payload };
        break;

      case SET_TOTAL_NUM_BANDS:
        draft.totalNumBands = action.payload;
        break;

      case SET_ALBUMS:
        draft.albums = { ...draft.albums, ...action.payload };
        break;

      case SET_TOTAL_NUM_ALBUMS:
        draft.totalNumAlbums = action.payload;
        break;
    }
  });

export default dataReducer;
