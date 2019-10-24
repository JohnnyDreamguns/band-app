import {
  LOAD_BANDS,
  SET_BAND_IDS,
  SET_PAGE_ID,
  SET_LOADING,
  CLEAR_HOME_PAGE
} from './constants';

export const loadBands = payload => ({
  type: LOAD_BANDS,
  payload
});

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
