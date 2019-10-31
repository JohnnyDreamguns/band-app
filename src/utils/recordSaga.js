import { runSaga } from 'redux-saga';

export async function recordSaga(saga, initialAction) {
  const dispatched = [];

  await runSaga(
    {
      dispatch: action => dispatched.push(action),
      getState: () => {}
    },
    saga,
    initialAction
  ).done;

  return dispatched;
}
