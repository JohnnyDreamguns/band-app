import { useMemo, useCallback } from 'react';
import produce from 'immer';
import { useStore } from '../store/store';

export const useMessages = () => {
  const { state, setState } = useStore();

  // Properties
  const messages = useMemo(() => state.messages, [state.messages]);

  // Functions
  const setError = useCallback(
    payload => {
      setState(
        produce(draft => {
          draft.messages = {
            error: payload
          };
        })
      );
    },
    [setState]
  );

  const setErrorObject = useCallback(
    payload => {
      setState(
        produce(draft => {
          draft.messages = {
            error: payload.message
          };
        })
      );
    },
    [setState]
  );

  const setInfo = useCallback(
    payload => {
      setState(
        produce(draft => {
          draft.messages = {
            info: payload
          };
        })
      );
    },
    [setState]
  );

  return {
    messages,
    setError,
    setErrorObject,
    setInfo
  };
};

export default useMessages;
