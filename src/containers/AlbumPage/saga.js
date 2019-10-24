import { call, put, takeLatest, select } from 'redux-saga/effects';
import { GET_ALBUM_BY_ID } from './constants';
import { setLoading, setAlbumId } from './actions';
import { setError } from '../../actions/messages';
import { setBands, setAlbums } from '../../actions/data';
import { selectBandsData } from '../../selectors/data';

import request from '../../utils/request';

export function* getAlbumById(action) {
  const albumsURL = `http://localhost:3001/albums`;

  try {
    yield put(setLoading(true));

    const albumId = action.payload;

    const album = yield call(request, `${albumsURL}/${albumId}`);
    yield put(setAlbums(album.results));
    yield put(setAlbumId(parseInt(Object.keys(album.results)[0])));

    const bandId = album.results[albumId].band;
    const bandsData = yield select(selectBandsData);

    if (!bandsData.hasOwnProperty(bandId)) {
      yield getBandById(bandId);
    }

    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(setError('There was a problem loading the album data'));
  }
}

export function* getBandById(bandId) {
  const bandsURL = `http://localhost:3001/bands`;

  const band = yield call(request, `${bandsURL}/${bandId}`);
  yield put(setBands(band.results));
}

export default function* bandpageDataSaga() {
  yield takeLatest(GET_ALBUM_BY_ID, getAlbumById);
}
