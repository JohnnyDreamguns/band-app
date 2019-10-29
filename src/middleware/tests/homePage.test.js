import sinon from 'sinon';
import {
  getHomepageData,
  getHomepageDataSuccess,
  getHomepageDataError
} from '../homePage';
import { LOAD_BANDS, SET_BAND_IDS } from '../../containers/HomePage/constants';
import * as apiStub from '../../services/api';
import { requestSuccessful, API_SUCCESS, API_ERROR } from '../../services/api';
import { mockBands } from '../../test/mocks';
import { SET_BANDS, SET_TOTAL_NUM_BANDS } from '../../constants/data';
import { setError } from '../../actions/messages';
import { setLoading } from '../../containers/HomePage/actions';

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

describe('getHomepageData', () => {
  it('calls the next function', async () => {
    const action = { type: 'TEST', page: 1 };
    await getHomepageData(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('triggers request to endpoint getBandsByPage', async () => {
    const spy = sandbox.stub(apiStub, 'doRequest').resolves('Request success');

    const action = { type: LOAD_BANDS, payload: 1 };
    await getHomepageData(store)(next)(action);

    expect(
      spy.calledWithExactly({ endpoint: 'getBandsByPage', params: { page: 1 } })
    ).toEqual(true);
  });

  it('should dispatch HOME_SET_LOADING action', async () => {
    sandbox.stub(apiStub, 'doRequest').resolves('Request success');

    const action = { type: LOAD_BANDS, payload: 1 };
    await getHomepageData(store)(next)(action);

    const expected = setLoading(true);
    expect(store.dispatch.mock.calls[0][0]).toStrictEqual(expected);
  });

  it('if no errors it should dispatch the LOAD_BANDS api success action', async () => {
    const payload = 'Request success';

    sandbox.stub(apiStub, 'doRequest').resolves(payload);

    const action = { type: LOAD_BANDS, payload: 1 };
    await getHomepageData(store)(next)(action);

    const expected = requestSuccessful({ type: LOAD_BANDS, payload });
    expect(store.dispatch.mock.calls[1][0]).toStrictEqual(expected);
  });

  it('if errors it should dispatch the GET_BAND_BY_ID api error action', async () => {
    const payload = 'Request error';

    sandbox.stub(apiStub, 'doRequest').rejects(payload);

    const action = { type: LOAD_BANDS, payload: 1 };
    await getHomepageData(store)(next)(action);

    expect(store.dispatch.mock.calls[1][0].type).toEqual(
      `${LOAD_BANDS}${API_ERROR}`
    );
    expect(store.dispatch.mock.calls[1][0].payload.name).toEqual(payload);
  });
});

describe('getHomepageDataSuccess', () => {
  it('calls the next function', async () => {
    const action = { type: 'TEST', payload: 1 };
    await getHomepageDataSuccess(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  const action = {
    type: `${LOAD_BANDS}${API_SUCCESS}`,
    payload: {
      results: {
        ...mockBands
      },
      totalResults: 7
    }
  };

  it('should dispatch a SET_BANDS action', () => {
    getHomepageDataSuccess(store)(next)(action);

    const expected = {
      type: SET_BANDS,
      payload: { ...mockBands }
    };

    expect(store.dispatch.mock.calls[0][0]).toStrictEqual(expected);
  });

  it('should dispatch a SET_TOTAL_NUM_BANDS action', () => {
    getHomepageDataSuccess(store)(next)(action);

    const expected = {
      type: SET_TOTAL_NUM_BANDS,
      payload: 7
    };

    expect(store.dispatch.mock.calls[1][0]).toStrictEqual(expected);
  });

  it('should dispatch a SET_BAND_IDS action', () => {
    getHomepageDataSuccess(store)(next)(action);

    const payload = Object.keys(mockBands).map(x => +x);
    const expected = {
      type: SET_BAND_IDS,
      payload
    };

    expect(store.dispatch.mock.calls[2][0]).toStrictEqual(expected);
  });

  it('should dispatch HOME_SET_LOADING action', async () => {
    getHomepageDataSuccess(store)(next)(action);

    const expected = setLoading(false);
    expect(store.dispatch.mock.calls[3][0]).toStrictEqual(expected);
  });
});

describe('getHomepageDataError', () => {
  it('calls the next function', () => {
    const action = { type: 'TEST', payload: {} };
    getHomepageDataError(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should dispatch a SHOW_ERROR action when string error fired', () => {
    const action = {
      type: `${LOAD_BANDS}${API_ERROR}`,
      payload: 'There was an error'
    };

    const expected = setError('There was an error');

    getHomepageDataError(store)(next)(action);
    expect(store.dispatch.mock.calls[0][0]).toStrictEqual(expected);
  });

  it('should dispatch a SHOW_ERROR action when error object fired', () => {
    const action = {
      type: `${LOAD_BANDS}${API_ERROR}`,
      payload: new Error('There was an error')
    };

    const expected = setError('There was an error');

    getHomepageDataError(store)(next)(action);
    expect(store.dispatch.mock.calls[0][0]).toStrictEqual(expected);
  });
});
