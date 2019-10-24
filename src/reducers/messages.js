import produce from 'immer';
import {
  SET_ERROR,
  SET_ERROR_OBJECT,
  SET_MESSAGE
} from '../constants/messages';

// The initial state of the App
export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const messagesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ERROR:
        draft.error = action.payload;
        break;

      case SET_ERROR_OBJECT:
        draft.error = action.payload.message;
        break;

      case SET_MESSAGE:
        draft.info = action.payload;
        break;
    }
  });

export default messagesReducer;
