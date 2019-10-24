import produce from 'immer';
import {
  SET_BAND_ID,
  CLEAR_BAND_PAGE,
  SET_LOADING,
  SET_ALBUM_IDS
} from './constants';

// The initial state of the App
export const initialState = {
  bandId: undefined,
  loading: false,
  albums: []
};

/* eslint-disable default-case, no-param-reassign */
const bandReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_BAND_ID:
        draft.bandId = action.payload;
        break;

      case CLEAR_BAND_PAGE:
        draft.bandId = undefined;
        break;

      case SET_LOADING:
        draft.loading = action.payload;
        break;

      case SET_ALBUM_IDS:
        draft.albums = action.payload;
        break;
    }
  });

export default bandReducer;
