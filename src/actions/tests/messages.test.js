import { setError, setErrorObject, setMessage } from '../messages';
import {
  SET_ERROR,
  SET_ERROR_OBJECT,
  SET_MESSAGE
} from '../../constants/messages';

const errorObj = {
  message: 'There was an error'
};

describe('messages actions', () => {
  describe('setError', () => {
    it('should return a SET_ERROR action', () => {
      expect(setError('There was an error')).toStrictEqual({
        type: SET_ERROR,
        payload: 'There was an error'
      });
    });
  });

  describe('setErrorObject', () => {
    it('should return a SET_ERROR_OBJECT action', () => {
      expect(setErrorObject(errorObj)).toStrictEqual({
        type: SET_ERROR_OBJECT,
        payload: errorObj
      });
    });
  });

  describe('setMessage', () => {
    it('should return a SET_MESSAGE action', () => {
      expect(setMessage('This is a message')).toStrictEqual({
        type: SET_MESSAGE,
        payload: 'This is a message'
      });
    });
  });
});
