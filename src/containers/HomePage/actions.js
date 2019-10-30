import {
  SET_BAND_IDS,
  SET_PAGE_ID,
  SET_LOADING,
  CLEAR_HOME_PAGE
} from './constants';
import { doRequest } from '../../services/api';
import { setBands, setTotalNumBands } from '../../actions/data';
import { setError } from '../../actions/messages';
import { catchErrors } from '../../utils/catchErrors';

export const loadBands = payload => {
  return async dispatch => {
    dispatch(setLoading(true));

    const { data, error } = await catchErrors(
      doRequest({
        endpoint: 'getBandsByPage',
        params: { page: payload }
      })
    );

    if (error) {
      dispatch(setError(error));
    } else {
      dispatch(setBands(data.results));
      dispatch(setTotalNumBands(data.totalResults));
      dispatch(setBandIds(Object.keys(data.results).map(x => +x)));
    }
    dispatch(setLoading(false));
  };
};

export const setBandIds = payload => ({
  type: SET_BAND_IDS,
  payload
});

export const setPageId = payload => ({
  type: SET_PAGE_ID,
  payload
});

export const setLoading = payload => ({
  type: SET_LOADING,
  payload
});

export const clearHomepage = () => ({
  type: CLEAR_HOME_PAGE
});
