import {
  SET_BAND_ID,
  SET_LOADING,
  CLEAR_BAND_PAGE,
  SET_ALBUM_IDS
} from './constants';
import { doRequestMulti } from '../../services/api';
import { setBands, setAlbums, setTotalNumAlbums } from '../../actions/data';
import { setError } from '../../actions/messages';
import { catchErrors } from '../../utils/catchErrors';

export const getBandById = payload => {
  return async dispatch => {
    dispatch(setLoading(true));

    const { data, error } = await catchErrors(
      doRequestMulti(
        { endpoint: 'getBandById', params: { id: payload } },
        { endpoint: 'getAlbumsByBandId', params: { id: payload } }
      )
    );

    if (error) {
      dispatch(setError('There was a problem loading the data'));
    } else {
      dispatch(setBands(data[0].results));
      dispatch(setBandId(parseInt(Object.keys(data[0].results)[0])));

      dispatch(setAlbums(data[1].results));
      dispatch(setTotalNumAlbums(data[1].totalResults));
      dispatch(setAlbumIds(Object.keys(data[1].results).map(x => +x)));
    }

    dispatch(setLoading(false));
  };
};

export const setBandId = payload => ({
  type: SET_BAND_ID,
  payload
});

export const setAlbumIds = payload => ({
  type: SET_ALBUM_IDS,
  payload
});

export const setLoading = payload => ({
  type: SET_LOADING,
  payload
});

export const clearBandpage = () => ({
  type: CLEAR_BAND_PAGE
});
