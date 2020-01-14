import { testHook } from '../../testUtils/testHook';
import { useMessages } from '../useMessages';
import API from '../../services/api';
import { StoreProvider, initialValue } from '../../store/store';
import TestRenderer from 'react-test-renderer';

const { act } = TestRenderer;

jest.mock('../../services/api');

let hook;
beforeEach(() => {
  testHook(() => {
    hook = useMessages();
  }, StoreProvider);
  jest.clearAllMocks();
});

describe('useMessages hook', () => {
  describe('messages prop', () => {
    it('should have an initial value of empty object', () => {
      expect(hook.messages).toEqual({});
    });
  });

  describe('setError method', () => {
    it('should update messages when setError is called', () => {
      act(() => {
        hook.setError('There was an error');
      });

      expect(hook.messages).toEqual({
        error: 'There was an error'
      });
    });
  });

  describe('setErrorObject method', () => {
    it('should update messages when setError is called', () => {
      act(() => {
        hook.setErrorObject({
          message: 'There was an error'
        });
      });

      expect(hook.messages).toEqual({
        error: 'There was an error'
      });
    });
  });

  describe('setInfo method', () => {
    it('should update messages when setInfo is called', () => {
      act(() => {
        hook.setInfo('This is a message');
      });

      expect(hook.messages).toEqual({
        info: 'This is a message'
      });
    });
  });
});
