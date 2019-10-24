import produce from 'immer';
import {
  SET_BAND_IDS,
  SET_PAGE_ID,
  SET_LOADING,
  CLEAR_HOME_PAGE
} from './constants';

// The initial state of the App
export const initialState = {
  bands: [],
  loading: false,
  page: 1
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_BAND_IDS:
        draft.bands = action.payload;
        break;

      case SET_PAGE_ID:
        draft.page = action.payload;
        break;

      case SET_LOADING:
        draft.loading = action.payload;
        break;

      case CLEAR_HOME_PAGE:
        draft.bands = [];
        break;
    }
  });

export default homeReducer;
