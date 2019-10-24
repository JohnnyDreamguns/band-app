import {
  GET_BAND_BY_ID,
  SET_BAND_ID,
  SET_LOADING,
  CLEAR_BAND_PAGE,
  SET_ALBUM_IDS
} from './constants';

export const getBandById = payload => ({
  type: GET_BAND_BY_ID,
  payload
});

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
