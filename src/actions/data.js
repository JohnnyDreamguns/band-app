import {
  SET_BANDS,
  SET_TOTAL_NUM_BANDS,
  SET_ALBUMS,
  SET_TOTAL_NUM_ALBUMS
} from '../constants/data';

export const setBands = payload => ({
  type: SET_BANDS,
  payload
});

export const setTotalNumBands = payload => ({
  type: SET_TOTAL_NUM_BANDS,
  payload
});

export const setAlbums = payload => ({
  type: SET_ALBUMS,
  payload
});

export const setTotalNumAlbums = payload => ({
  type: SET_TOTAL_NUM_ALBUMS,
  payload
});
