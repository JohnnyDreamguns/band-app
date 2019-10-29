import {
  doRequestSequence,
  requestSuccessful,
  requestError,
  API_SUCCESS,
  API_ERROR
} from '../services/api';
import { GET_ALBUM_BY_ID } from '../containers/AlbumPage/constants';
import { setLoading, setAlbumId } from '../containers/AlbumPage/actions';
import { setBands, setAlbums } from '../actions/data';
import { setError } from '../actions/messages';
import { catchErrors } from '../utils/catchErrors';
import { selectFirstBand } from '../selectors/response';

export const getAlbumpageData = ({ dispatch }) => next => async action => {
  next(action);

  if (action.type === GET_ALBUM_BY_ID) {
    dispatch(setLoading(true));

    const { data, error } = await catchErrors(
      doRequestSequence(
        { endpoint: 'getAlbumById', params: { id: action.payload } },
        {
          endpoint: 'getBandById',
          addParamsFromResponse: {
            param: 'id',
            responseIndex: 0,
            selector: selectFirstBand
          }
        }
      )
    );

    if (error) {
      dispatch(requestError({ type: GET_ALBUM_BY_ID, payload: error }));
      return;
    }
    dispatch(requestSuccessful({ type: GET_ALBUM_BY_ID, payload: data }));
  }
};

export const getAlbumpageDataSuccess = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === `${GET_ALBUM_BY_ID}${API_SUCCESS}`) {
    dispatch(setAlbums(action.payload[0].results));
    dispatch(setAlbumId(parseInt(Object.keys(action.payload[0].results)[0])));
    dispatch(setBands(action.payload[1].results));
    dispatch(setLoading(false));
  }
};

export const getAlbumpageDataError = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === `${GET_ALBUM_BY_ID}${API_ERROR}`) {
    const msg =
      typeof action.payload === 'string'
        ? action.payload
        : action.payload.message;
    dispatch(setError(msg));
    dispatch(setLoading(false));
  }
};

export default [
  getAlbumpageData,
  getAlbumpageDataSuccess,
  getAlbumpageDataError
];
