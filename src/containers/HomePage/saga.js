import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_BANDS } from './constants';
import { setBandIds, setLoading } from './actions';
import { setError } from '../../actions/messages';
import { setBands, setTotalNumBands } from '../../actions/data';

import request from '../../utils/request';

export function* getBands(action) {
  const requestURL = `http://localhost:3001/bands`;

  try {
    yield put(setLoading(true));
    const bands = yield call(request, `${requestURL}?page=${action.payload}`);

    yield put(setBands(bands.results));
    yield put(setTotalNumBands(bands.totalResults));
    yield put(setBandIds(Object.keys(bands.results).map(x => +x)));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(setError('There was a problem loading the home data'));
  }
}

export default function* homepageDataSaga() {
  yield takeLatest(LOAD_BANDS, getBands);
}
