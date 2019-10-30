import { selectBandsData, selectAlbumsData } from '../data';

const mockState = {
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

describe('data selectors', () => {
  describe('selectBandsData', () => {
    it('should return the correct state', () => {
      expect(selectBandsData(mockState)).toEqual(mockState.data.bands);
    });
  });

  describe('selectAlbumsData', () => {
    it('should return the correct state', () => {
      expect(selectAlbumsData(mockState)).toEqual(mockState.data.albums);
    });
  });
});
