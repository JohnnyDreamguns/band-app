import sinon from 'sinon';
import {
  getAlbumById,
  setAlbumId,
  clearAlbumpage,
  setLoading
} from '../actions';
import { SET_ALBUM_ID, CLEAR_ALBUM_PAGE, SET_LOADING } from '../constants';
import { SET_BANDS, SET_ALBUMS } from '../../../constants/data';
import { SET_ERROR } from '../../../constants/messages';
import * as apiStub from '../../../services/api';
import { mockStore } from '../../../utils/mockStore';

const stubRequest = sinon.stub(apiStub, 'doRequestSequence');

describe('AlbumPage actions', () => {
  describe('getAlbumById thunk', () => {
    it('should dispatch expected actions if all is well', async () => {
      stubRequest.resolves([
        {
          results: {
            2: {
              id: 2,
              name: 'An album'
            }
          }
        },
        {
          results: {
            5: {
              id: 5,
              name: 'A band'
            }
          }
        }
      ]);

      const store = mockStore();
      await store.dispatch(getAlbumById(2));
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: SET_LOADING,
        payload: true
      });

      expect(actions[1]).toEqual({
        type: SET_ALBUMS,
        payload: {
          2: {
            id: 2,
            name: 'An album'
          }
        }
      });

      expect(actions[2]).toEqual({
        type: SET_ALBUM_ID,
        payload: 2
      });

      expect(actions[3]).toEqual({
        type: SET_BANDS,
        payload: {
          5: {
            id: 5,
            name: 'A band'
          }
        }
      });

      expect(actions[4]).toEqual({
        type: SET_LOADING,
        payload: false
      });
    });

    it('should set error if there is one', async () => {
      stubRequest.rejects('There was an error');

      const store = mockStore();
      await store.dispatch(getAlbumById(2));
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
