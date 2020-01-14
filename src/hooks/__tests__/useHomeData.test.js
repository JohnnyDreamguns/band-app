import { testHook } from '../../testUtils/testHook';
import { useHomeData } from '../useHomeData';
import API from '../../services/api';
import { StoreProvider, initialValue } from '../../store/store';
import TestRenderer from 'react-test-renderer';

const { act } = TestRenderer;

const mockSetErrorObject = jest.fn();
const mockSetGlobalAlbums = jest.fn();
const mockSetGlobalBands = jest.fn();

jest.mock('../../services/api');

jest.mock('../useGlobalData', () => ({
  useGlobalData: () => ({
    albumsData: {
      2: {
        name: 'mock album',
        band: 5
      }
    },
    bandsData: {
      5: {
        name: 'mock band'
      }
    },
    setGlobalAlbums: mockSetGlobalAlbums,
    setGlobalBands: mockSetGlobalBands,
    totalNumBands: 9
  })
}));

jest.mock('../useMessages', () => ({
  useMessages: () => ({
    setErrorObject: mockSetErrorObject
  })
}));

let hook;
beforeEach(() => {
  testHook(() => {
    hook = useHomeData();
  }, StoreProvider);
  jest.clearAllMocks();
});

describe('useHomeData hook', () => {
  describe('bands prop', () => {
    it('should have an initial value of undefined', () => {
      expect(hook.bands).toEqual([]);
    });

    it('should update bands when setBandKeys is called', () => {
      act(() => {
        hook.setBandKeys({
          results: {
            5: 'mock band'
          }
        });
      });
      expect(hook.bands).toEqual([{ name: 'mock band' }]);
    });
  });

  describe('bandIds prop', () => {
    it('should have an bandIds prop that has an initial value', () => {
      expect(hook.bandIds).toEqual([]);
    });

    it('should have a setBandKeys function', () => {
      expect(hook.setBandKeys).toEqual(expect.any(Function));
    });

    it('should update bandIds when setBandKeys is called', () => {
      act(() => {
        hook.setBandKeys({
          results: {
            5: 'mock band'
          }
        });
      });
      expect(hook.bandIds).toEqual([5]);
    });
  });

  describe('page prop', () => {
    it('should have an initial value of undefined', () => {
      expect(hook.page).toBe(1);
    });

    it('should update albums when setPage is called', () => {
      act(() => {
        hook.setPage(2);
      });
      expect(hook.page).toBe(2);
    });
  });

  describe('loading prop', () => {
    it('should have a loading prop that has an initial value', () => {
      expect(hook.loading).toBe(initialValue.homePage.loading);
    });

    it('should have a setLoading function', () => {
      expect(hook.setLoading).toEqual(expect.any(Function));
    });

    it('should update loading when setLoading is called', () => {
      act(() => {
        hook.setLoading(true);
      });
      expect(hook.loading).toBe(true);
    });
  });

  describe('numOfPages prop', () => {
    it('should have a numOfPages prop that has an initial value', () => {
      expect(hook.numOfPages).toBe(3);
    });
  });

  describe('setNextPage', () => {
    it('should set page to next page when called', () => {
      act(() => {
        hook.setPage(2);
      });

      act(() => {
        hook.setNextPage()();
      });

      expect(hook.page).toBe(3);
    });
  });

  describe('setPreviousPage', () => {
    it('should set page to previous page when called', () => {
      act(() => {
        hook.setPage(2);
      });

      act(() => {
        hook.setPreviousPage()();
      });

      expect(hook.page).toBe(1);
    });
  });

  describe('useFetchHomePageData', () => {
    it('should call side effect fetchHomePageData when called', () => {
      hook.fetchHomePageData = jest.fn();

      act(() => {
        testHook(hook.useFetchHomePageData);
      });

      expect(hook.fetchHomePageData).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchHomePageData', () => {
    it('should call setLoading with true and false', async () => {
      const mockSetLoading = jest.fn();
      hook.setLoading = mockSetLoading;

      await act(() => hook.fetchHomePageData(2));

      expect(mockSetLoading.mock.calls[0][0]).toBe(true);
      expect(mockSetLoading.mock.calls[1][0]).toBe(false);
    });

    it('should call doRequestMulti with correct values', async () => {
      await act(() => hook.fetchHomePageData(2));

      expect(API.doRequest.mock.calls[0][0].endpoint).toBe('getBandsByPage');
      expect(API.doRequest.mock.calls[0][0].params.page).toBe(2);
    });

    it('should call setBandId with correct data', async () => {
      const mockSetBandKeys = jest.fn();
      hook.setBandKeys = mockSetBandKeys;

      await act(() => hook.fetchHomePageData(2));

      expect(mockSetBandKeys.mock.calls[0][0]).toEqual({
        results: { '5': 'mock band', '6': 'another band' }
      });
    });

    it('should call setGlobalBands with correct data', async () => {
      const mockSetBandKeys = jest.fn();
      hook.setBandKeys = mockSetBandKeys;

      await act(() => hook.fetchHomePageData(2));

      expect(mockSetGlobalBands.mock.calls[0][0]).toEqual({
        results: { '5': 'mock band', '6': 'another band' }
      });
    });

    it('should not call setBandKeys if an error is returned', async () => {
      API.doRequest.mockRejectedValueOnce('error');
      const mockSetBandKeys = jest.fn();
      hook.setBandKeys = mockSetBandKeys;

      await act(() => hook.fetchHomePageData(2));

      expect(mockSetBandKeys.mock.calls.length).toBe(0);
    });

    it('should call setErrorObject with error if an error is returned', async () => {
      API.doRequest.mockRejectedValueOnce('error');

      await act(() => hook.fetchHomePageData(2));

      expect(mockSetErrorObject.mock.calls[0][0]).toBe('error');
    });
  });
});
