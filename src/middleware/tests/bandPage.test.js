import sinon from 'sinon';
import {
  getBandpageData,
  getBandpageDataSuccess,
  getBandpageDataError
} from '../bandPage';
import {
  GET_BAND_BY_ID,
  SET_BAND_ID,
  SET_ALBUM_IDS
} from '../../containers/BandPage/constants';
import * as apiStub from '../../services/api';
import { requestSuccessful, API_SUCCESS, API_ERROR } from '../../services/api';
import { mockAlbums, mockBand } from '../../test/mocks';
import {
  SET_BANDS,
  SET_ALBUMS,
  SET_TOTAL_NUM_ALBUMS
} from '../../constants/data';
import { setError } from '../../actions/messages';
import { setLoading } from '../../containers/BandPage/actions';

// Store
const store = {
  getState: jest.fn(() => ({})),
  dispatch: jest.fn()
};
const next = jest.fn();

// Sinon Sandbox
let sandbox;
beforeAll(() => {
  sandbox = sinon.createSandbox();
});

afterEach(() => {
  sandbox.restore();
  store.getState.mockReset();
  store.dispatch.mockReset();
  next.mockReset();
});

describe('getBandById', () => {
  it('calls the next function', async () => {
    const action = { type: 'TEST', id: 1 };
    await getBandpageData(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('triggers requests to endpoints getBandpageData and getAlbumsByBandId', async () => {
    const spy = sandbox
      .stub(apiStub, 'doRequestMulti')
      .resolves('Request success');

    const action = { type: GET_BAND_BY_ID, payload: 2 };
    await getBandpageData(store)(next)(action);

    expect(
      spy.calledWithExactly(
        { endpoint: 'getBandById', params: { id: 2 } },
        { endpoint: 'getAlbumsByBandId', params: { id: 2 } }
      )
    ).toEqual(true);
  });

  it('should dispatch BAND_SET_LOADING action', async () => {
    sandbox.stub(apiStub, 'doRequestMulti').resolves('Request success');

    const action = { type: GET_BAND_BY_ID, payload: 2 };
    await getBandpageData(store)(next)(action);

    const expected = setLoading(true);
    expect(store.dispatch.mock.calls[0][0]).toStrictEqual(expected);
  });

  it('if no errors it should dispatch the GET_BAND_BY_ID api success action', async () => {
    const payload = 'Request success';

    sandbox.stub(apiStub, 'doRequestMulti').resolves(payload);

    const action = { type: GET_BAND_BY_ID, payload: 2 };
    await getBandpageData(store)(next)(action);

    const expected = requestSuccessful({ type: GET_BAND_BY_ID, payload });
    expect(store.dispatch.mock.calls[1][0]).toStrictEqual(expected);
  });

  it('if errors it should dispatch the GET_BAND_BY_ID api error action', async () => {
    const payload = 'Request error';

    sandbox.stub(apiStub, 'doRequestMulti').rejects(payload);

    const action = { type: GET_BAND_BY_ID, payload: 2 };
    await getBandpageData(store)(next)(action);

    expect(store.dispatch.mock.calls[1][0].type).toEqual(
      `${GET_BAND_BY_ID}${API_ERROR}`
    );
    expect(store.dispatch.mock.calls[1][0].payload.name).toEqual(payload);
  });
});

describe('getBandpageDataSuccess', () => {
  it('calls the next function', () => {
    const action = { type: 'TEST', payload: {} };
    getBandpageDataSuccess(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  const action = {
    type: `${GET_BAND_BY_ID}${API_SUCCESS}`,
    payload: [
      {
        results: {
          ...mockBand
        }
      },
      {
        results: {
          ...mockAlbums
        },
        totalResults: 7
      }
    ]
  };

  it('should dispatch a SET_BANDS action', () => {
    getBandpageDataSuccess(store)(next)(action);

    const expected = {
      type: SET_BANDS,
      payload: { ...mockBand }
    };

    expect(store.dispatch.mock.calls[0][0]).toStrictEqual(expected);
  });

  it('should dispatch a SET_BAND_ID action', () => {
    getBandpageDataSuccess(store)(next)(action);

    const payload = parseInt(Object.keys(action.payload[0].results)[0]);
    const expected = {
      type: SET_BAND_ID,
      payload
    };

    expect(store.dispatch.mock.calls[1][0]).toStrictEqual(expected);
  });

  it('should dispatch a SET_ALBUMS action', () => {
    getBandpageDataSuccess(store)(next)(action);

    const expected = {
      type: SET_ALBUMS,
      payload: { ...mockAlbums }
    };

    expect(store.dispatch.mock.calls[2][0]).toStrictEqual(expected);
  });

  it('should dispatch a SET_TOTAL_NUM_ALBUMS action', () => {
    getBandpageDataSuccess(store)(next)(action);

    const expected = {
      type: SET_TOTAL_NUM_ALBUMS,
      payload: 7
    };

    expect(store.dispatch.mock.calls[3][0]).toStrictEqual(expected);
  });

  it('should dispatch a SET_ALBUM_IDS action', () => {
    getBandpageDataSuccess(store)(next)(action);

    const payload = Object.keys(mockAlbums).map(x => +x);
    const expected = {
      type: SET_ALBUM_IDS,
      payload
    };

    expect(store.dispatch.mock.calls[4][0]).toStrictEqual(expected);
  });

  it('should dispatch ALBUM_SET_LOADING action', async () => {
    getBandpageDataSuccess(store)(next)(action);

    const expected = setLoading(false);
    expect(store.dispatch.mock.calls[5][0]).toStrictEqual(expected);
  });
});

describe('getBandpageDataError', () => {
  it('calls the next function', () => {
    const action = { type: 'TEST', payload: {} };
    getBandpageDataError(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should dispatch a SHOW_ERROR action when string error fired', () => {
    const action = {
      type: `${GET_BAND_BY_ID}${API_ERROR}`,
      payload: 'There was an error'
    };

    const expected = setError('There was an error');

    getBandpageDataError(store)(next)(action);
    expect(store.dispatch.mock.calls[0][0]).toStrictEqual(expected);
  });

  it('should dispatch a SHOW_ERROR action when error object fired', () => {
    const action = {
      type: `${GET_BAND_BY_ID}${API_ERROR}`,
      payload: new Error('There was an error')
    };

    const expected = setError('There was an error');

    getBandpageDataError(store)(next)(action);
    expect(store.dispatch.mock.calls[0][0]).toStrictEqual(expected);
  });
});
