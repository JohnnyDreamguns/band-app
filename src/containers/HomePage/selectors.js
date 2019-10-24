import { initialState } from './reducer';
import { selectBandsData } from '../../selectors/data';

export const homeRoot = state => state.homePage || initialState;

export const selectPage = state => homeRoot(state)['page'];

export const selectBandIds = state => homeRoot(state)['bands'];

export const selectBands = state => {
  const bandIds = selectBandIds(state);
  if (!bandIds) return [];
  return bandIds
    .filter(x => selectBandsData(state)[x])
    .map(bandId => selectBandsData(state)[`${bandId}`]);
};

export const selectLoading = state => homeRoot(state)['loading'];

export const selectTotalNumBands = state => state.data.totalNumBands;

export const selectNumOfPages = state => {
  const numBands = selectTotalNumBands(state);
  if (numBands) {
    return Math.ceil(numBands / 3);
  }
};
