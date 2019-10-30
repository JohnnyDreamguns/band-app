import { SET_ALBUM_ID, CLEAR_ALBUM_PAGE, SET_LOADING } from './constants';
import { doRequestSequence } from '../../services/api';
import { setBands, setAlbums } from '../../actions/data';
import { setError } from '../../actions/messages';
import { catchErrors } from '../../utils/catchErrors';
import { selectFirstBand } from '../../selectors/response';

export const getAlbumById = payload => {
  return async dispatch => {
    dispatch(setLoading(true));

    const { data, error } = await catchErrors(
      doRequestSequence(
        { endpoint: 'getAlbumById', params: { id: payload } },
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
      dispatch(setError(error));
    } else {
      dispatch(setAlbums(data[0].results));
      dispatch(setAlbumId(parseInt(Object.keys(data[0].results)[0])));
      dispatch(setBands(data[1].results));
    }
    dispatch(setLoading(false));
  };
};

export const setAlbumId = payload => ({
  type: SET_ALBUM_ID,
  payload
});

export const clearAlbumpage = () => ({
  type: CLEAR_ALBUM_PAGE
});

export const setLoading = payload => ({
  type: SET_LOADING,
  payload
});
