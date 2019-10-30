import {
  loadBands,
  setBandIds,
  setPageId,
  setLoading,
  clearHomepage
} from '../actions';
import {
  LOAD_BANDS,
  SET_BAND_IDS,
  SET_PAGE_ID,
  SET_LOADING,
  CLEAR_HOME_PAGE
} from '../constants';

describe('HomePage actions', () => {
  // describe('loadBands', () => {
  //   it('should return a LOAD_BANDS action', () => {
  //     expect(loadBands(2)).toStrictEqual({
  //       type: LOAD_BANDS,
  //       payload: 2
  //     });
  //   });
  // });

  describe('setBandIds', () => {
    it('should return a SET_BAND_IDS action', () => {
      expect(setBandIds([4, 5, 6])).toStrictEqual({
        type: SET_BAND_IDS,
        payload: [4, 5, 6]
      });
    });
  });

  describe('setPageId', () => {
    it('should return a SET_PAGE_ID action', () => {
      expect(setPageId(2)).toStrictEqual({
        type: SET_PAGE_ID,
        payload: 2
      });
    });
  });

  describe('setLoading', () => {
    it('should return a SET_LOADING action', () => {
      expect(setLoading(true)).toStrictEqual({
        type: SET_LOADING,
        payload: true
      });
    });
  });

  describe('clearHomepage', () => {
    it('should return a CLEAR_HOME_PAGE action', () => {
      expect(clearHomepage()).toStrictEqual({
        type: CLEAR_HOME_PAGE
      });
    });
  });
});
