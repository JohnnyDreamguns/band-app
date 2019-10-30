import produce from 'immer';
import messagesReducer from '../messages';
import {
  SET_ERROR,
  SET_ERROR_OBJECT,
  SET_MESSAGE
} from '../../constants/messages';

/* eslint-disable default-case, no-param-reassign */
describe('messages reducer', () => {
  let state;
  beforeEach(() => {
    state = {};
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(messagesReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the SET_ERROR action', () => {
    const val = 'There was an error';

    const expectedResult = produce(state, draft => {
      draft.error = val;
    });

    expect(
      messagesReducer(state, {
        type: SET_ERROR,
        payload: val
      })
    ).toEqual(expectedResult);
  });

  it('should handle the SET_ERROR_OBJECT action', () => {
    const val = {
      message: 'There was an error'
    };

    const expectedResult = produce(state, draft => {
      draft.error = val.message;
    });

    expect(
      messagesReducer(state, {
        type: SET_ERROR_OBJECT,
        payload: val
      })
    ).toEqual(expectedResult);
  });

  it('should handle the SET_MESSAGE action', () => {
    const val = 'This is a message';

    const expectedResult = produce(state, draft => {
      draft.info = val;
    });

    expect(
      messagesReducer(state, {
        type: SET_MESSAGE,
        payload: val
      })
    ).toEqual(expectedResult);
  });
});
