import { makeStore } from './makeStore';

const initialValue = {
  data: {
    bands: {},
    albums: {}
  },
  homePage: {
    bands: [],
    loading: false,
    page: 1
  },
  bandPage: {
    bandId: undefined,
    loading: false,
    albums: []
  },
  albumPage: {
    albumId: undefined,
    loading: false
  },
  messages: []
};

const { StoreProvider, useStore } = makeStore(initialValue);

export { StoreProvider, useStore, initialValue };
