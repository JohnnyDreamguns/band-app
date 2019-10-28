import {
  getAlbumById,
  getAlbumByIdSuccess,
  getAlbumByIdError
} from '../albumPage';
import sinon from 'sinon';
import * as apiStub from '../../services/api';
import { requestSuccessful, API_SUCCESS, API_ERROR } from '../../services/api';
import { mockAlbums, mockBands } from '../../test/mocks';
import { setError } from '../../actions/messages';
import {
  GET_ALBUM_BY_ID,
  SET_ALBUM_ID
} from '../../containers/AlbumPage/constants';
import { SET_BANDS, SET_ALBUMS } from '../../constants/data';
import { setLoading } from '../../containers/AlbumPage/actions';

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

describe('getAlbumById', () => {
  it('calls the next function', async () => {
    const action = { type: 'TEST', id: 1 };
    await getAlbumById(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('triggers sequence of api requests to endpoints getAlbumById and getBandById', async () => {
    const spy = sandbox
      .stub(apiStub, 'doRequestSequence')
      .resolves('Request success');

    const action = { type: GET_ALBUM_BY_ID, payload: 2 };
    await getAlbumById(store)(next)(action);

    expect(
      spy.calledWithExactly(
        { endpoint: 'getAlbumById', params: { id: 2 } },
        sinon.match({
          endpoint: 'getBandById',
          addParamsFromResponse: {
            param: 'id',
            responseIndex: 0
          }
        })
      )
    ).toEqual(true);
  });

  it('should dispatch SET_LOADING action', async () => {
    sandbox.stub(apiStub, 'doRequestSequence').resolves('Request success');

    const action = { type: GET_ALBUM_BY_ID, payload: 2 };
    await getAlbumById(store)(next)(action);

    const expected = setLoading(true);
    expect(store.dispatch.mock.calls[0][0]).toStrictEqual(expected);
  });

  it('if no errors it should dispatch the GET_ALBUM_BY_ID api success action', async () => {
    const payload = 'Request success';

    sandbox.stub(apiStub, 'doRequestSequence').resolves(payload);

    const action = { type: GET_ALBUM_BY_ID, payload: 2 };
    await getAlbumById(store)(next)(action);

    const expected = requestSuccessful({ type: GET_ALBUM_BY_ID, payload });
    expect(store.dispatch.mock.calls[1][0]).toStrictEqual(expected);
  });

  it('if errors it should dispatch the GET_ALBUM_BY_ID api error action', async () => {
    const payload = 'Request error';

    sandbox.stub(apiStub, 'doRequestSequence').rejects(payload);

    const action = { type: GET_ALBUM_BY_ID, payload: 2 };
    await getAlbumById(store)(next)(action);

    expect(store.dispatch.mock.calls[1][0].type).toEqual(
      `${GET_ALBUM_BY_ID}${API_ERROR}`
    );
    expect(store.dispatch.mock.calls[1][0].payload.name).toEqual(payload);
  });
});

describe('getAlbumByIdSuccess', () => {
  it('calls the next function', () => {
    const action = { type: 'TEST', payload: {} };
    getAlbumByIdSuccess(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  const action = {
    type: `${GET_ALBUM_BY_ID}${API_SUCCESS}`,
    payload: [
      {
        results: {
          ...mockAlbums
        }
      },
      {
        results: {
          ...mockBands
        }
      }
    ]
  };

  it('should dispatch a SET_ALBUMS action', () => {
    getAlbumByIdSuccess(store)(next)(action);

    const expected = {
      type: SET_ALBUMS,
      payload: { ...mockAlbums }
    };

    expect(store.dispatch.mock.calls[0][0]).toStrictEqual(expected);
  });

  it('should dispatch a SET_ALBUM_ID action', () => {
    getAlbumByIdSuccess(store)(next)(action);

    const payload = parseInt(Object.keys(action.payload[0].results)[0]);
    const expected = {
      type: SET_ALBUM_ID,
      payload
    };

    expect(store.dispatch.mock.calls[1][0]).toStrictEqual(expected);
  });

  it('should dispatch a SET_BANDS action', () => {
    getAlbumByIdSuccess(store)(next)(action);

    const expected = {
      type: SET_BANDS,
      payload: { ...mockBands }
    };

    expect(store.dispatch.mock.calls[2][0]).toStrictEqual(expected);
  });

  it('should dispatch a SET_BANDS action', () => {
    getAlbumByIdSuccess(store)(next)(action);

    const expected = {
      type: SET_BANDS,
      payload: { ...mockBands }
    };

    expect(store.dispatch.mock.calls[2][0]).toStrictEqual(expected);
  });

  it('should dispatch SET_LOADING action', async () => {
    getAlbumByIdSuccess(store)(next)(action);

    const expected = setLoading(false);
    expect(store.dispatch.mock.calls[3][0]).toStrictEqual(expected);
  });
});

describe('getAlbumByIdError', () => {
  it('calls the next function', () => {
    const action = { type: 'TEST', payload: {} };
    getAlbumByIdError(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should dispatch a SET_ERROR action when string error fired', () => {
    const action = {
      type: `${GET_ALBUM_BY_ID}${API_ERROR}`,
      payload: 'There was an error'
    };

    const expected = setError('There was an error');

    getAlbumByIdError(store)(next)(action);
    expect(store.dispatch.mock.calls[0][0]).toStrictEqual(expected);
  });

  it('should dispatch a SET_ERROR action when error object fired', () => {
    const action = {
      type: `${GET_ALBUM_BY_ID}${API_ERROR}`,
      payload: new Error('There was an error')
    };

    const expected = setError('There was an error');

    getAlbumByIdError(store)(next)(action);
    expect(store.dispatch.mock.calls[0][0]).toStrictEqual(expected);
  });
});
