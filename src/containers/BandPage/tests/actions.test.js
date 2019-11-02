import sinon from 'sinon';
import * as apiStub from '../../../services/api';
import { mockStore } from '../../../utils/mockStore';
import {
  getBandById,
  setBandId,
  setAlbumIds,
  setLoading,
  clearBandpage
} from '../actions';
import {
  SET_BAND_ID,
  SET_LOADING,
  CLEAR_BAND_PAGE,
  SET_ALBUM_IDS
} from '../constants';
import {
  SET_BANDS,
  SET_ALBUMS,
  SET_TOTAL_NUM_ALBUMS
} from '../../../constants/data';
import { SET_ERROR } from '../../../constants/messages';

const stubRequest = sinon.stub(apiStub, 'doRequestMulti');

describe('BandPage actions', () => {
  describe('getBandById thunk', () => {
    it('should dispatch expected actions if all is well', async () => {
      stubRequest.resolves([
        {
          results: {
            2: {
              id: 2,
              name: 'A band'
            }
          }
        },
        {
          results: {
            5: {
              id: 5,
              name: 'An album'
            }
          },
          totalResults: 7
        }
      ]);

      const store = mockStore();
      await store.dispatch(getBandById(2));
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: SET_LOADING,
        payload: true
      });

      expect(actions[1]).toEqual({
        type: SET_BANDS,
        payload: {
          2: {
            id: 2,
            name: 'A band'
          }
        }
      });

      expect(actions[2]).toEqual({
        type: SET_BAND_ID,
        payload: 2
      });

      expect(actions[3]).toEqual({
        type: SET_ALBUMS,
        payload: {
          5: {
            id: 5,
            name: 'An album'
          }
        }
      });

      expect(actions[4]).toEqual({
        type: SET_TOTAL_NUM_ALBUMS,
        payload: 7
      });

      expect(actions[5]).toEqual({
        type: SET_ALBUM_IDS,
        payload: [5]
      });

      expect(actions[6]).toEqual({
        type: SET_LOADING,
        payload: false
      });
    });

    it('should set error if there is one', async () => {
      stubRequest.rejects('There was an error');

      const store = mockStore();
      await store.dispatch(getBandById(2));
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: SET_LOADING,
        payload: true
      });

      expect(actions[1].type).toEqual(SET_ERROR);

      expect(actions[2]).toEqual({
        type: SET_LOADING,
        payload: false
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
