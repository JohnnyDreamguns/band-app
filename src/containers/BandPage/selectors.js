import { initialState } from './reducer';
import { selectBandsData, selectAlbumsData } from '../../selectors/data';

export const bandRoot = state => state.bandPage || initialState;

export const selectBandId = state => bandRoot(state)['bandId'];

export const selectBand = state => {
  const bandId = selectBandId(state);
  if (!bandId) return undefined;
  return selectBandsData(state)[`${bandId}`];
};

export const selectLoading = state => bandRoot(state)['loading'];

export const selectAlbumIds = state => bandRoot(state)['albums'];

export const selectAlbums = state => {
  const albumIds = selectAlbumIds(state);
  if (!albumIds) return [];

  const albums = albumIds
    .filter(x => selectAlbumsData(state)[x])
    .map(albumId => selectAlbumsData(state)[`${albumId}`]);

  return albums;
};
