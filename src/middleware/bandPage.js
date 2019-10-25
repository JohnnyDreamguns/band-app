import {
  doRequestMulti,
  requestSuccessful,
  requestError,
  API_SUCCESS,
  API_ERROR
} from '../services/api';
import { GET_BAND_BY_ID } from '../containers/BandPage/constants';
import {
  setLoading,
  setBandId,
  setAlbumIds
} from '../containers/BandPage/actions';
import { setBands, setAlbums, setTotalNumAlbums } from '../actions/data';
import { setError } from '../actions/messages';
import { catchErrors } from '../utils/catchErrors';

export const getBandpageData = ({ dispatch }) => next => async action => {
  next(action);

  if (action.type === GET_BAND_BY_ID) {
    dispatch(setLoading(true));

    const { data, error } = await catchErrors(
      doRequestMulti(
        { endpoint: 'getBandById', params: { id: action.payload } },
        { endpoint: 'getAlbumsByBandId', params: { id: action.payload } }
      )
    );

    if (error) {
      dispatch(requestError({ type: GET_BAND_BY_ID, payload: error }));
      return;
    }
    dispatch(requestSuccessful({ type: GET_BAND_BY_ID, payload: data }));
  }
};

export const getBandpageDataSuccess = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === `${GET_BAND_BY_ID} ${API_SUCCESS}`) {
    dispatch(setBands(action.payload[0].results));
    dispatch(setBandId(parseInt(Object.keys(action.payload[0].results)[0])));

    dispatch(setAlbums(action.payload[1].results));
    dispatch(setTotalNumAlbums(action.payload[1].totalResults));
    dispatch(setAlbumIds(Object.keys(action.payload[1].results).map(x => +x)));

    dispatch(setLoading(false));
  }
};

export const getBandpageDataError = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === `${GET_BAND_BY_ID} ${API_ERROR}`) {
    const msg =
      typeof action.payload === 'string'
        ? action.payload
        : action.payload.message;
    dispatch(setError(msg));
    dispatch(setLoading(false));
  }
};

export default [getBandpageData, getBandpageDataSuccess, getBandpageDataError];
