import {
  bandRoot,
  selectBandId,
  selectBand,
  selectLoading,
  selectAlbumIds,
  selectAlbums
} from '../selectors';
import { initialState } from '../reducer';

const mockState = {
  bandPage: {
    loading: true,
    bandId: 2,
    albums: [3, 4]
  },
  data: {
    bands: {
      2: {
        id: 2,
        name: 'A Band'
      }
    },
    albums: {
      3: {
        id: 3,
        name: 'An Album',
        band: 2
      },
      4: {
        id: 4,
        name: 'Another Album',
        band: 3
      }
    }
  }
};

describe('BandPage selectors', () => {
  describe('bandRoot', () => {
    it('should return the correct state', () => {
      expect(bandRoot(mockState)).toEqual(mockState.bandPage);
    });

    it('should return the correct state if there is no initial state', () => {
      expect(bandRoot({ bandPage: undefined })).toEqual(initialState);
    });
  });

  describe('selectBandId', () => {
    it('should return the correct state', () => {
      expect(selectBandId(mockState)).toEqual(mockState.bandPage.bandId);
    });
  });

  describe('selectBand', () => {
    it('should return the correct state', () => {
      expect(selectBand(mockState)).toEqual(mockState.data.bands[2]);
    });

    it('should return the correct state if there is no bandId', () => {
      var newMockState = JSON.parse(JSON.stringify(mockState));
      newMockState.bandPage.bandId = undefined;
      expect(selectBand(newMockState)).toEqual(undefined);
    });
  });

  describe('selectLoading', () => {
    it('should return the correct state', () => {
      expect(selectLoading(mockState)).toEqual(mockState.bandPage.loading);
    });
  });

  describe('selectAlbumIds', () => {
    it('should return the correct state', () => {
      expect(selectAlbumIds(mockState)).toEqual(mockState.bandPage.albums);
    });
  });

  describe('selectAlbums', () => {
    it('should return the correct state', () => {
      expect(selectAlbums(mockState)).toEqual([
        mockState.data.albums[3],
        mockState.data.albums[4]
      ]);
    });

    it('should return the correct state', () => {
      var newMockState = JSON.parse(JSON.stringify(mockState));
      newMockState.bandPage.albums = undefined;

      expect(selectAlbums(newMockState)).toEqual([]);
    });
  });
});
