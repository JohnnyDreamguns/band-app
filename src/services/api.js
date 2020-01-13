export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = '_API_SUCCESS';
export const API_ERROR = '_API_ERROR';

const serverUrl = 'http://localhost:3001';

export const BANDS_URL = `${serverUrl}/bands`;
export const ALBUMS_URL = `${serverUrl}/albums`;

export const doRequest = ({ endpoint, params }) => {
  const requestInfo = requests[endpoint](params);
  const { method, url } = requestInfo;

  return fetch(url, { method })
    .then(x => new Promise(resolve => setTimeout(() => resolve(x), 200)))
    .then(response => {
      if (!response.ok) {
        return response.json().then(throwError);
      }

      return response.json();
    });
};

export const throwError = data => {
  throw new Error(data.error);
};

export const doRequestMulti = (...args) => {
  return Promise.all(args.map(request => doRequest(request)));
};

export function doRequestSequence(...args) {
  let i = 0;
  let responses = [];

  const request = () => {
    let thisRequest = args[i];

    if (thisRequest.addParamsFromResponse) {
      const {
        param,
        responseIndex,
        selector
      } = thisRequest.addParamsFromResponse;
      if (!thisRequest.params) thisRequest.params = {};
      thisRequest.params[param] = selector(responses[responseIndex]);
      delete thisRequest.addParamsFromResponse;
    }

    return doRequest(args[i]).then(data => {
      responses.push(data);

      i++;
      if (i >= args.length) {
        return responses;
      }
      return request();
    });
  };
  return request();
}

export const requestSuccessful = ({ type, payload }) => {
  return {
    type: `${type}${API_SUCCESS}`,
    payload,
    meta: { type }
  };
};

export const requestError = ({ type, payload }) => ({
  type: `${type}${API_ERROR}`,
  payload: payload,
  meta: { type }
});

export const requests = {
  getBandById: params => ({
    body: null,
    method: 'GET',
    url: `${BANDS_URL}/${params.id}`
  }),
  getAllBands: () => ({
    body: null,
    method: 'GET',
    url: `${BANDS_URL}?all=true`
  }),
  getBandsByPage: params => ({
    body: null,
    method: 'GET',
    url: `${BANDS_URL}?page=${params.page}`
  }),
  getAlbumsByBandId: params => ({
    body: null,
    method: 'GET',
    url: `${BANDS_URL}/${params.id}/albums`
  }),
  getAlbumById: params => ({
    body: null,
    method: 'GET',
    url: `${ALBUMS_URL}/${params.id}`
  })
};

const API = {
  doRequest,
  doRequestMulti,
  doRequestSequence
};

export default API;
