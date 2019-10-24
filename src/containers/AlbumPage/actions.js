import {
  GET_ALBUM_BY_ID,
  SET_ALBUM_ID,
  CLEAR_ALBUM_PAGE,
  SET_LOADING
} from './constants';

export const getAlbumById = payload => ({
  type: GET_ALBUM_BY_ID,
  payload
});

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
