export const doRequest = ({ endpoint }) => {
  return Promise.resolve(requests[endpoint]());
};

export const doRequestMulti = (...args) => {
  return Promise.all(args.map(request => doRequest(request)));
};

export function doRequestSequence(...args) {
  let i = 0;
  let responses = [];

  const request = () => {
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

export const requests = {
  getBandById: () => ({
    results: {
      5: 'mock band'
    }
  }),
  getAllBands: () => ({
    results: {
      5: 'mock band',
      6: 'another band'
    }
  }),
  getBandsByPage: params => ({
    results: {
      5: 'mock band',
      6: 'another band'
    }
  }),
  getAlbumsByBandId: params => ({
    results: {
      2: 'mock album',
      3: 'another album'
    }
  }),
  getAlbumById: () => ({
    results: {
      2: 'mock album'
    }
  })
};

const API = {
  doRequest: jest.fn(doRequest),
  doRequestMulti: jest.fn(doRequestMulti),
  doRequestSequence: jest.fn(doRequestSequence)
};

export default API;
