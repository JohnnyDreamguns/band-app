import { call, put, takeLatest, all } from 'redux-saga/effects';
import { GET_BAND_BY_ID } from './constants';
import { setLoading, setBandId, setAlbumIds } from './actions';
import { setError } from '../../actions/messages';
import { setBands, setAlbums, setTotalNumAlbums } from '../../actions/data';

import { request } from '../../utils/request';

export function* getBandByIdSaga(action) {
  const requestURL = `http://localhost:3001/bands`;

  try {
    yield put(setLoading(true));

    const bandId = action.payload;

    const [band, albums] = yield all([
      call(request, `${requestURL}/${bandId}`),
      call(request, `${requestURL}/${bandId}/albums`)
    ]);

    yield put(setBands(band.results));
    yield put(setBandId(parseInt(Object.keys(band.results)[0])));

    yield put(setAlbums(albums.results));
    yield put(setTotalNumAlbums(albums.totalResults));
    yield put(setAlbumIds(Object.keys(albums.results).map(x => +x)));

    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(setError('There was a problem loading the band data'));
  }
}

export default function* bandpageDataSaga() {
  yield takeLatest(GET_BAND_BY_ID, getBandByIdSaga);
}
