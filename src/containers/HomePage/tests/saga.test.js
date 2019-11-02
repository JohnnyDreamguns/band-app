import sinon from 'sinon';
import { recordSaga } from '../../../utils/recordSaga';
import { getBandsSaga } from '../saga';
import * as req from '../../../utils/request';
import { SET_BAND_IDS, SET_LOADING } from '../../HomePage/constants';
import { SET_BANDS, SET_TOTAL_NUM_BANDS } from '../../../constants/data';
import { SET_ERROR } from '../../../constants/messages';

const stubRequest = sinon.stub(req, 'request');

const mockBands = {
  results: {
    5: {
      id: 5,
      name: 'The Band'
    },
    6: {
      id: 6,
      name: 'Another Band'
    }
  },
  totalResults: 5
};

describe('getBandByIdSaga', () => {
  it('should dispatch the correct actions if all is well', async () => {
    stubRequest
      .withArgs(`http://localhost:3001/bands?page=2`)
      .returns(mockBands);

    const dispatched = await recordSaga(getBandsSaga, { payload: 2 });

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
        },
        6: {
          id: 6,
          name: 'Another Band'
        }
      }
    });

    expect(dispatched[2]).toEqual({
      type: SET_TOTAL_NUM_BANDS,
      payload: 5
    });

    expect(dispatched[3]).toEqual({
      type: SET_BAND_IDS,
      payload: [5, 6]
    });

    expect(dispatched[4]).toEqual({
      type: SET_LOADING,
      payload: false
    });
  });

  it('should dispatch setError if something goes wrong', async () => {
    stubRequest.withArgs(`http://localhost:3001/bands?page=2`).throws();

    const dispatched = await recordSaga(getBandsSaga, { payload: 2 });

    expect(dispatched[1]).toEqual({
      type: SET_LOADING,
      payload: false
    });

    expect(dispatched[2]).toEqual({
      type: SET_ERROR,
      payload: 'There was a problem loading the home data'
    });
  });
});
