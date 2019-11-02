import sinon from 'sinon';
import * as apiStub from '../../../services/api';
import { mockStore } from '../../../utils/mockStore';
import {
  loadBands,
  setBandIds,
  setPageId,
  setLoading,
  clearHomepage
} from '../actions';
import {
  SET_BAND_IDS,
  SET_PAGE_ID,
  SET_LOADING,
  CLEAR_HOME_PAGE
} from '../constants';
import { SET_BANDS, SET_TOTAL_NUM_BANDS } from '../../../constants/data';
import { SET_ERROR } from '../../../constants/messages';

const stubRequest = sinon.stub(apiStub, 'doRequest');

describe('HomePage actions', () => {
  describe('loadBands thunk', () => {
    it('should dispatch expected actions if all is well', async () => {
      stubRequest.resolves({
        results: {
          2: {
            id: 2,
            name: 'A band'
          },
          3: {
            id: 3,
            name: 'Another band'
          }
        },
        totalResults: 3
      });

      const store = mockStore();
      await store.dispatch(loadBands(1));
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
          },
          3: {
            id: 3,
            name: 'Another band'
          }
        }
      });

      expect(actions[2]).toEqual({
        type: SET_TOTAL_NUM_BANDS,
        payload: 3
      });

      expect(actions[3]).toEqual({
        type: SET_BAND_IDS,
        payload: [2, 3]
      });

      expect(actions[4]).toEqual({
        type: SET_LOADING,
        payload: false
      });
    });

    it('should set error if there is one', async () => {
      stubRequest.rejects('There was an error');

      const store = mockStore();
      await store.dispatch(loadBands(1));
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
