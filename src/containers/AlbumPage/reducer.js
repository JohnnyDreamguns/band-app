import produce from 'immer';
import { SET_ALBUM_ID, CLEAR_ALBUM_PAGE, SET_LOADING } from './constants';

// The initial state of the App
export const initialState = {
  albumId: undefined,
  loading: false
};

/* eslint-disable default-case, no-param-reassign */
const albumReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ALBUM_ID:
        draft.albumId = action.payload;
        break;

      case CLEAR_ALBUM_PAGE:
        draft.albumId = undefined;
        break;

      case SET_LOADING:
        draft.loading = action.payload;
        break;
    }
  });

export default albumReducer;
