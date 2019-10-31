import { recordSaga } from '../../../utils/recordSaga';
import { getAlbumByIdSaga, getBandByIdSaga } from '../saga';
import * as req from '../../../utils/request';
import * as dataSelector from '../../../selectors/data';
import {
  SET_LOADING,
  SET_ALBUM_ID,
  GET_BAND_BY_ID
} from '../../AlbumPage/constants';
import { SET_ALBUMS, SET_BANDS } from '../../../constants/data';
import { SET_ERROR } from '../../../constants/messages';

jest.spyOn(req, 'request');
jest.spyOn(dataSelector, 'selectBandsData');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('getAlbumByIdSaga', () => {
  it('should dispatch the correct actions if all is well', async () => {
    req.request.mockImplementation(() => ({
      results: {
        2: {
          band: 5
        }
      }
    }));

    dataSelector.selectBandsData.mockImplementation(() => ({
      5: {
        id: 5,
        name: 'The Band'
      }
    }));

    const dispatched = await recordSaga(getAlbumByIdSaga, { payload: 2 });

    expect(dispatched[0]).toEqual({
      type: SET_LOADING,
      payload: true
    });

    expect(dispatched[1]).toEqual({
      type: SET_ALBUMS,
      payload: {
        '2': {
          band: 5
        }
      }
    });

    expect(dispatched[2]).toEqual({
      type: SET_ALBUM_ID,
      payload: 2
    });

    expect(dispatched[3]).toEqual({
      type: SET_LOADING,
      payload: false
    });
  });

  it('should dispatch getBandById if band data needs to be loaded', async () => {
    req.request.mockImplementation(() => ({
      results: {
        2: {
          band: 5
        }
      }
    }));

    dataSelector.selectBandsData.mockImplementation(() => ({}));

    const dispatched = await recordSaga(getAlbumByIdSaga, { payload: 2 });

    expect(dispatched[3]).toEqual({
      type: GET_BAND_BY_ID,
      payload: 5
    });
  });

  it('should dispatch setError if something goes wrong', async () => {
    req.request.mockImplementation(() => {
      throw new Error('test');
    });

    const dispatched = await recordSaga(getAlbumByIdSaga, { payload: 2 });

    expect(dispatched[1]).toEqual({
      type: SET_LOADING,
      payload: false
    });

    expect(dispatched[2]).toEqual({
      type: SET_ERROR,
      payload: 'There was a problem loading the album data'
    });
  });
});

describe('getBandByIdSaga', () => {
  it('should dispatch the correct actions if all is well', async () => {
    req.request.mockImplementation(() => ({
      results: {
        5: {
          id: 5,
          name: 'The Band'
        }
      }
    }));

    const dispatched = await recordSaga(getBandByIdSaga, { payload: 5 });

    expect(dispatched[0]).toEqual({
      type: SET_BANDS,
      payload: {
        5: {
          id: 5,
          name: 'The Band'
        }
      }
    });
  });
});
