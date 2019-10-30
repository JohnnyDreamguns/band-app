import {
  getAlbumById,
  setAlbumId,
  clearAlbumpage,
  setLoading
} from '../actions';
import {
  GET_ALBUM_BY_ID,
  SET_ALBUM_ID,
  CLEAR_ALBUM_PAGE,
  SET_LOADING
} from '../constants';

describe('AlbumPage actions', () => {
  // describe('getAlbumById', () => {
  //   it('should return a GET_ALBUM_BY_ID action', () => {
  //     expect(getAlbumById(1)).toStrictEqual({
  //       type: GET_ALBUM_BY_ID,
  //       payload: 1
  //     });
  //   });
  // });

  describe('setAlbumId', () => {
    it('should return a SET_ALBUM_ID action', () => {
      expect(setAlbumId(2)).toStrictEqual({
        type: SET_ALBUM_ID,
        payload: 2
      });
    });
  });

  describe('clearAlbumpage', () => {
    it('should return a CLEAR_ALBUM_PAGE action', () => {
      expect(clearAlbumpage()).toStrictEqual({
        type: CLEAR_ALBUM_PAGE
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
});
