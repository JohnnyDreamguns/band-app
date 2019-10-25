import {
  doRequest,
  requestSuccessful,
  requestError,
  API_SUCCESS,
  API_ERROR
} from '../services/api';
import { LOAD_BANDS } from '../containers/HomePage/constants';
import { setLoading, setBandIds } from '../containers/HomePage/actions';
import { setBands, setTotalNumBands } from '../actions/data';
import { setError } from '../actions/messages';
import { catchErrors } from '../utils/catchErrors';

export const getHomepageData = ({ dispatch }) => next => async action => {
  next(action);

  if (action.type === LOAD_BANDS) {
    dispatch(setLoading(true));

    const { data, error } = await catchErrors(
      doRequest({
        endpoint: 'getBandsByPage',
        params: { page: action.payload }
      })
    );

    if (error) {
      dispatch(requestError({ type: LOAD_BANDS, payload: error }));
      return;
    }
    dispatch(requestSuccessful({ type: LOAD_BANDS, payload: data }));
  }
};

export const getHomepageDataSuccess = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === `${LOAD_BANDS} ${API_SUCCESS}`) {
    dispatch(setBands(action.payload.results));
    dispatch(setTotalNumBands(action.payload.totalResults));
    dispatch(setBandIds(Object.keys(action.payload.results).map(x => +x)));
    dispatch(setLoading(false));
  }
};

export const getHomepageDataError = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === `${LOAD_BANDS} ${API_ERROR}`) {
    const msg =
      typeof action.payload === 'string'
        ? action.payload
        : action.payload.message;
    dispatch(setError(msg));
    dispatch(setLoading(false));
  }
};

export default [getHomepageData, getHomepageDataSuccess, getHomepageDataError];
