import {
  setBands,
  setTotalNumBands,
  setAlbums,
  setTotalNumAlbums
} from '../data';
import {
  SET_BANDS,
  SET_TOTAL_NUM_BANDS,
  SET_ALBUMS,
  SET_TOTAL_NUM_ALBUMS
} from '../../constants/data';

const bandData = [
  {
    id: 1,
    name: 'Band 1'
  },
  {
    id: 2,
    name: 'Band 2'
  }
];

const albumData = [
  {
    id: 1,
    name: 'Album 1'
  },
  {
    id: 2,
    name: 'Album 2'
  }
];

describe('data actions', () => {
  describe('setBands', () => {
    it('should return a SET_BANDS action', () => {
      expect(setBands(bandData)).toStrictEqual({
        type: SET_BANDS,
        payload: bandData
      });
    });
  });

  describe('setTotalNumBands', () => {
    it('should return a SET_TOTAL_NUM_BANDS action', () => {
      expect(setTotalNumBands(7)).toStrictEqual({
        type: SET_TOTAL_NUM_BANDS,
        payload: 7
      });
    });
  });

  describe('setAlbums', () => {
    it('should return a SET_ALBUMS action', () => {
      expect(setAlbums(albumData)).toStrictEqual({
        type: SET_ALBUMS,
        payload: albumData
      });
    });
  });

  describe('setTotalNumAlbums', () => {
    it('should return a SET_TOTAL_NUM_ALBUMS action', () => {
      expect(setTotalNumAlbums(4)).toStrictEqual({
        type: SET_TOTAL_NUM_ALBUMS,
        payload: 4
      });
    });
  });
});
