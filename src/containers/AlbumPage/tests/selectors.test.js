import {
  albumRoot,
  selectAlbumId,
  selectAlbum,
  selectLoading,
  selectBandId,
  selectBand
} from '../selectors';
import { initialState } from '../reducer';

const mockState = {
  albumPage: {
    loading: true,
    albumId: 3
  },
  data: {
    bands: {
      1: {
        id: 1,
        name: 'A Band'
      }
    },
    albums: {
      3: {
        id: 3,
        name: 'An Album',
        band: 1
      }
    }
  }
};

describe('AlbumPage selectors', () => {
  describe('albumRoot', () => {
    it('should return the correct state', () => {
      expect(albumRoot(mockState)).toEqual(mockState.albumPage);
    });

    it('should return the correct state if there is no initial state', () => {
      expect(albumRoot({ albumPage: undefined })).toEqual(initialState);
    });
  });

  describe('selectAlbumId', () => {
    it('should return the correct state', () => {
      expect(selectAlbumId(mockState)).toEqual(mockState.albumPage.albumId);
    });
  });

  describe('selectAlbum', () => {
    it('should return the correct state', () => {
      expect(selectAlbum(mockState)).toEqual(mockState.data.albums[3]);
    });

    it('should return the correct state if there is no albumId', () => {
      var newMockState = JSON.parse(JSON.stringify(mockState));
      newMockState.albumPage.albumId = undefined;
      expect(selectAlbum(newMockState)).toEqual(undefined);
    });
  });

  describe('selectLoading', () => {
    it('should return the correct state', () => {
      expect(selectLoading(mockState)).toEqual(mockState.albumPage.loading);
    });
  });

  describe('selectBandId', () => {
    it('should return the correct state', () => {
      expect(selectBandId(mockState)).toEqual(mockState.data.albums[3].band);
    });

    it('should return the correct state if there is no albumId', () => {
      var newMockState = JSON.parse(JSON.stringify(mockState));
      newMockState.albumPage.albumId = undefined;
      expect(selectBandId(newMockState)).toEqual(undefined);
    });
  });

  describe('selectBand', () => {
    it('should return the correct state', () => {
      expect(selectBand(mockState)).toEqual(mockState.data.bands[1]);
    });

    it('should return the correct state if there is no albumId', () => {
      var newMockState = JSON.parse(JSON.stringify(mockState));
      newMockState.albumPage.albumId = undefined;
      expect(selectBand(newMockState)).toEqual(undefined);
    });
  });
});
