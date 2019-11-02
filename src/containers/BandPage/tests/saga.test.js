import sinon from 'sinon';
import { recordSaga } from '../../../utils/recordSaga';
import { getBandByIdSaga } from '../saga';
import * as req from '../../../utils/request';
import {
  SET_LOADING,
  SET_BAND_ID,
  SET_ALBUM_IDS
} from '../../BandPage/constants';
import {
  SET_ALBUMS,
  SET_BANDS,
  SET_TOTAL_NUM_ALBUMS
} from '../../../constants/data';
import { SET_ERROR } from '../../../constants/messages';

const stubRequest = sinon.stub(req, 'request');

const mockBand = {
  results: {
    5: {
      id: 5,
      name: 'The Band'
    }
  }
};

const mockAlbums = {
  results: {
    2: {
      id: 2,
      name: 'The Album'
    }
  },
  totalResults: 5
};

describe('getBandByIdSaga', () => {
  it('should dispatch the correct actions if all is well', async () => {
    stubRequest.withArgs(`http://localhost:3001/bands/5`).returns(mockBand);

    stubRequest
      .withArgs(`http://localhost:3001/bands/5/albums`)
      .returns(mockAlbums);

    const dispatched = await recordSaga(getBandByIdSaga, { payload: 5 });

    expect(dispatched[0]).toEqual({
      type: SET_LOADING,
      payload: true
    });

    expect(dispatched[1]).toEqual({
      type: SET_BANDS,
      payload: {
        5: {
          id: 5,
          name: 'The Band'
        }
      }
    });

    expect(dispatched[2]).toEqual({
      type: SET_BAND_ID,
      payload: 5
    });

    expect(dispatched[3]).toEqual({
      type: SET_ALBUMS,
      payload: {
        2: {
          id: 2,
          name: 'The Album'
        }
      }
    });

    expect(dispatched[4]).toEqual({
      type: SET_TOTAL_NUM_ALBUMS,
      payload: 5
    });

    expect(dispatched[5]).toEqual({
      type: SET_ALBUM_IDS,
      payload: [2]
    });

    expect(dispatched[6]).toEqual({
      type: SET_LOADING,
      payload: false
    });
  });

  it('should dispatch setError if something goes wrong', async () => {
    stubRequest.withArgs(`http://localhost:3001/bands/5`).throws();

    const dispatched = await recordSaga(getBandByIdSaga, { payload: 5 });

    expect(dispatched[1]).toEqual({
      type: SET_LOADING,
      payload: false
    });

    expect(dispatched[2]).toEqual({
      type: SET_ERROR,
      payload: 'There was a problem loading the band data'
    });
  });
});
