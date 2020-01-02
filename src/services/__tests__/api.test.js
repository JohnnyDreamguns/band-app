import {
  doRequest,
  doRequestMulti,
  doRequestSequence,
  requests,
  throwError,
  requestSuccessful,
  requestError,
  API_SUCCESS,
  API_ERROR,
  BANDS_URL,
  ALBUMS_URL
} from '../api';

function mockFetch(data) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
}

function mockFetchError(data) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.reject({ error: 'Error' })
    })
  );
}

describe('API', () => {
  describe('doRequest', () => {
    it('should make a fetch request', async () => {
      const mockedFetch = mockFetch({ data: 'Test' });
      window.fetch = mockedFetch;

      await doRequest({ endpoint: 'getBandById', params: { id: 1 } });

      const { url, method } = requests.getBandById({ id: 1 });
      expect(mockedFetch.mock.calls[0][0]).toStrictEqual(url);
      expect(mockedFetch.mock.calls[0][1]).toStrictEqual({ method });
    });

    it('failed request should reject with an error message', async () => {
      const mockedFetch = mockFetchError({ data: 'Test' });
      window.fetch = mockedFetch;

      try {
        await doRequest({ endpoint: 'getBandById', params: { id: 1 } });
      } catch (e) {
        expect(e.error).toBe('Error');
      }
    });
  });

  describe('throwError', () => {
    it('should throw an Error object', async () => {
      try {
        throwError({ error: 'Error message' });
      } catch (e) {
        expect(e.message).toBe('Error message');
      }
    });
  });

  describe('doRequestMulti', () => {
    it('call to doRequestMulti should make multiple fetch requests', async () => {
      const mockedFetch = mockFetch({ data: 'Test' });
      window.fetch = mockedFetch;

      await doRequestMulti(
        { endpoint: 'getBandById', params: { id: 1 } },
        { endpoint: 'getAllBands' }
      );

      const { url: url1, method } = requests.getBandById({ id: 1 });
      const { url: url2 } = requests.getAllBands();

      expect(mockedFetch.mock.calls[0][0]).toStrictEqual(url1);
      expect(mockedFetch.mock.calls[0][1]).toStrictEqual({ method });
      expect(mockedFetch.mock.calls[1][0]).toStrictEqual(url2);
    });
  });

  describe('doRequestSequence', () => {
    it('should make multiple fetch requests', async () => {
      const mockedFetch = mockFetch({ data: 'Test' });
      window.fetch = mockedFetch;

      await doRequestSequence(
        { endpoint: 'getAlbumById', params: { id: 1 } },
        {
          endpoint: 'getBandById',
          addParamsFromResponse: {
            param: 'id',
            responseIndex: 0,
            selector: () => {
              return 1;
            }
          }
        }
      );

      const { url: url1, method } = requests.getAlbumById({ id: 1 });
      const { url: url2 } = requests.getBandById({ id: 1 });

      expect(mockedFetch.mock.calls[0][0]).toStrictEqual(url1);
      expect(mockedFetch.mock.calls[0][1]).toStrictEqual({ method });
      expect(mockedFetch.mock.calls[1][0]).toStrictEqual(url2);
    });
  });

  describe('doRequestSequence', () => {
    it('should make multiple fetch requests', async () => {
      const mockedFetch = mockFetch({ data: 'Test' });
      window.fetch = mockedFetch;

      await doRequestSequence(
        { endpoint: 'getAlbumById', params: { id: 1 } },
        {
          endpoint: 'getBandById',
          params: { blah: 'test' },
          addParamsFromResponse: {
            param: 'id',
            responseIndex: 0,
            selector: () => {
              return 1;
            }
          }
        }
      );

      const { url: url1, method } = requests.getAlbumById({ id: 1 });
      const { url: url2 } = requests.getBandById({ id: 1 });

      expect(mockedFetch.mock.calls[0][0]).toStrictEqual(url1);
      expect(mockedFetch.mock.calls[0][1]).toStrictEqual({ method });
      expect(mockedFetch.mock.calls[1][0]).toStrictEqual(url2);
    });
  });

  describe('requestSuccessful', () => {
    it('should return a request successful action', async () => {
      expect(requestSuccessful({ type: 'Test', payload: 'Mock!' })).toEqual({
        type: `Test${API_SUCCESS}`,
        payload: 'Mock!',
        meta: { type: 'Test' }
      });
    });
  });

  describe('requestError', () => {
    it('should return a request error action', async () => {
      expect(requestError({ type: 'Test', payload: 'Mock!' })).toEqual({
        type: `Test${API_ERROR}`,
        payload: 'Mock!',
        meta: { type: 'Test' }
      });
    });
  });

  describe('getBandById', () => {
    it('should return correct data', async () => {
      expect(requests.getBandById({ id: 2 })).toEqual({
        body: null,
        method: 'GET',
        url: `${BANDS_URL}/2`
      });
    });
  });

  describe('getAllBands', () => {
    it('should return correct data', async () => {
      expect(requests.getAllBands()).toEqual({
        body: null,
        method: 'GET',
        url: `${BANDS_URL}?all=true`
      });
    });
  });

  describe('getBandsByPage', () => {
    it('should return correct data', async () => {
      expect(requests.getBandsByPage({ page: 3 })).toEqual({
        body: null,
        method: 'GET',
        url: `${BANDS_URL}?page=3`
      });
    });
  });

  describe('getAlbumsByBandId', () => {
    it('should return correct data', async () => {
      expect(requests.getAlbumsByBandId({ id: 5 })).toEqual({
        body: null,
        method: 'GET',
        url: `${BANDS_URL}/5/albums`
      });
    });
  });

  describe('getAlbumById', () => {
    it('should return correct data', async () => {
      expect(requests.getAlbumById({ id: 2 })).toEqual({
        body: null,
        method: 'GET',
        url: `${ALBUMS_URL}/2`
      });
    });
  });
});
