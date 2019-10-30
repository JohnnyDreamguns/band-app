import {
  homeRoot,
  selectPage,
  selectBandIds,
  selectBands,
  selectLoading,
  selectTotalNumBands,
  selectNumOfPages
} from '../selectors';
import { initialState } from '../reducer';

const mockState = {
  homePage: {
    loading: false,
    bands: [1, 2, 3],
    page: 1
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
    },
    totalNumBands: 7
  }
};

describe('HomePage selectors', () => {
  describe('homeRoot', () => {
    it('should return the correct state', () => {
      expect(homeRoot(mockState)).toEqual(mockState.homePage);
    });

    it('should return the correct state if there is no initial state', () => {
      expect(homeRoot({ homePage: undefined })).toEqual(initialState);
    });
  });

  describe('selectPage', () => {
    it('should return the correct state', () => {
      expect(selectPage(mockState)).toEqual(mockState.homePage.page);
    });
  });

  describe('selectBandIds', () => {
    it('should return the correct state', () => {
      expect(selectBandIds(mockState)).toEqual(mockState.homePage.bands);
    });
  });

  describe('selectBands', () => {
    it('should return the correct state', () => {
      expect(selectBands(mockState)).toEqual([mockState.data.bands[2]]);
    });

    it('should return the correct state', () => {
      var newMockState = JSON.parse(JSON.stringify(mockState));
      newMockState.homePage.bands = undefined;

      expect(selectBands(newMockState)).toEqual([]);
    });
  });

  describe('selectLoading', () => {
    it('should return the correct state', () => {
      expect(selectLoading(mockState)).toEqual(mockState.homePage.loading);
    });
  });

  describe('selectTotalNumBands', () => {
    it('should return the correct state', () => {
      expect(selectTotalNumBands(mockState)).toEqual(
        mockState.data.totalNumBands
      );
    });
  });

  describe('selectNumOfPages', () => {
    it('should return the correct state', () => {
      expect(selectNumOfPages(mockState)).toEqual(3);
    });

    it('should return the correct state', () => {
      var newMockState = JSON.parse(JSON.stringify(mockState));
      newMockState.data.totalNumBands = undefined;

      expect(selectNumOfPages(newMockState)).toEqual(undefined);
    });
  });
});
