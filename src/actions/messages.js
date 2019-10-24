import {
  SET_ERROR,
  SET_ERROR_OBJECT,
  SET_MESSAGE
} from '../constants/messages';

export const setError = payload => ({
  type: SET_ERROR,
  payload
});

export const setErrorObject = payload => ({
  type: SET_ERROR_OBJECT,
  payload
});

export const setMessage = payload => ({
  type: SET_MESSAGE,
  payload
});
