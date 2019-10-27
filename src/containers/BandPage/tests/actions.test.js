import {
  getBandById,
  setBandId,
  setAlbumIds,
  setLoading,
  clearBandpage
} from '../actions';
import {
  GET_BAND_BY_ID,
  SET_BAND_ID,
  SET_LOADING,
  CLEAR_BAND_PAGE,
  SET_ALBUM_IDS
} from '../constants';

describe('BandPage actions', () => {
  describe('getBandById', () => {
    it('should return a GET_BAND_BY_ID action', () => {
      expect(getBandById(2)).toStrictEqual({
        type: GET_BAND_BY_ID,
        payload: 2
      });
    });
  });

  describe('setBandId', () => {
    it('should return a SET_BAND_ID action', () => {
      expect(setBandId(3)).toStrictEqual({
        type: SET_BAND_ID,
        payload: 3
      });
    });
  });

  describe('setAlbumIds', () => {
    it('should return a SET_ALBUM_IDS action', () => {
      expect(setAlbumIds([1, 2, 3])).toStrictEqual({
        type: SET_ALBUM_IDS,
        payload: [1, 2, 3]
      });
    });
  });

  describe('setLoading', () => {
    it('should return a SET_LOADING action', () => {
      expect(setLoading(false)).toStrictEqual({
        type: SET_LOADING,
        payload: false
      });
    });
  });

  describe('clearBandpage', () => {
    it('should return a CLEAR_BAND_PAGE action', () => {
      expect(clearBandpage()).toStrictEqual({
        type: CLEAR_BAND_PAGE
      });
    });
  });
});
