import { initialState } from './reducer';
import { selectBandsData, selectAlbumsData } from '../../selectors/data';

export const albumRoot = state => state.albumPage || initialState;

export const selectAlbumId = state => albumRoot(state)['albumId'];

export const selectAlbum = state => {
  const albumId = selectAlbumId(state);
  if (!albumId) return undefined;
  return selectAlbumsData(state)[`${albumId}`];
};

export const selectLoading = state => albumRoot(state)['loading'];

export const selectBandId = state => {
  const album = selectAlbum(state);
  if (!album) return undefined;
  return album['band'];
};

export const selectBand = state => {
  const bandId = selectBandId(state);
  if (!bandId) return undefined;
  return selectBandsData(state)[`${bandId}`];
};
