import { testHook } from '../../testUtils/testHook';
import useBandData from '../useBandData';
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
    setGlobalBands: mockSetGlobalBands
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
    hook = useBandData();
  }, StoreProvider);
  jest.clearAllMocks();
});

describe('useBandData hook', () => {
  describe('band prop', () => {
    it('should have an initial value of undefined', () => {
      expect(hook.band).toBe(undefined);
    });

    it('should update band when setBandId is called', () => {
      act(() => {
        hook.setBandId({
          results: {
            5: 'mock!'
          }
        });
      });
      expect(hook.band.name).toBe('mock band');
    });
  });

  describe('bandId prop', () => {
    it('should have an bandId prop that has an initial value', () => {
      expect(hook.bandId).toBe(initialValue.bandPage.bandId);
    });

    it('should have a setAlbumId function', () => {
      expect(hook.setBandId).toEqual(expect.any(Function));
    });

    it('should update bandId when setBandId is called', () => {
      act(() => {
        hook.setBandId({
          results: {
            5: 'mock!'
          }
        });
      });
      expect(hook.bandId).toBe(5);
    });
  });

  describe('albums prop', () => {
    it('should have an initial value of undefined', () => {
      expect(hook.albums).toEqual([]);
    });

    it('should update albums when setAlbumKeys is called', () => {
      act(() => {
        hook.setAlbumKeys({
          results: {
            2: 'mock!'
          }
        });
      });
      expect(hook.albums[0].name).toBe('mock album');
    });
  });

  describe('albumIds prop', () => {
    it('should have an initial value of undefined', () => {
      expect(hook.albumIds).toEqual([]);
    });

    it('should update albumIds when setAlbumKeys is called', () => {
      act(() => {
        hook.setAlbumKeys({
          results: {
            2: 'mock!'
          }
        });
      });
      expect(hook.albumIds).toEqual([2]);
    });
  });

  describe('loading prop', () => {
    it('should have a loading prop that has an initial value', () => {
      expect(hook.loading).toBe(initialValue.bandPage.loading);
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

  describe('clearBandId', () => {
    it('should set bandId to undefined when called', () => {
      act(() => {
        hook.setBandId({
          results: {
            5: 'mock!'
          }
        });
        hook.clearBandId();
      });

      expect(hook.bandId).toBe(undefined);
    });
  });

  describe('useFetchBandPageData', () => {
    it('should call side effect fetchBandPageData when called', () => {
      hook.fetchBandPageData = jest.fn();

      act(() => {
        testHook(hook.useFetchBandPageData);
      });

      expect(hook.fetchBandPageData).toHaveBeenCalledTimes(1);
    });

    it('should call clearBandId on unmount', async () => {
      const mockClearBandId = jest.fn();
      hook.clearBandId = mockClearBandId;
      hook.fetchBandPageData = jest.fn();

      let th;
      act(() => {
        th = testHook(hook.useFetchBandPageData);
      });

      th.unmount();

      expect(mockClearBandId).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchBandPageData', () => {
    it('should call setLoading with true and false', async () => {
      const mockSetLoading = jest.fn();
      hook.setLoading = mockSetLoading;

      await act(() => hook.fetchBandPageData(5));

      expect(mockSetLoading.mock.calls[0][0]).toBe(true);
      expect(mockSetLoading.mock.calls[1][0]).toBe(false);
    });

    it('should call doRequestMulti with correct values', async () => {
      await act(() => hook.fetchBandPageData(5));

      expect(API.doRequestMulti.mock.calls[0][0].endpoint).toBe('getBandById');
      expect(API.doRequestMulti.mock.calls[0][0].params.id).toBe(5);
      expect(API.doRequestMulti.mock.calls[0][1].endpoint).toBe(
        'getAlbumsByBandId'
      );
      expect(API.doRequestMulti.mock.calls[0][1].params.id).toBe(5);
    });

    it('should call setBandId with correct data', async () => {
      const mockSetBandId = jest.fn();
      hook.setBandId = mockSetBandId;

      await act(() => hook.fetchBandPageData(5));

      expect(mockSetBandId.mock.calls[0][0]).toEqual({
        results: { '5': 'mock band' }
      });
    });

    it('should call setAlbumKeys with correct data', async () => {
      const mockSetAlbumKeys = jest.fn();
      hook.setAlbumKeys = mockSetAlbumKeys;

      await act(() => hook.fetchBandPageData(5));

      expect(mockSetAlbumKeys.mock.calls[0][0]).toEqual({
        results: { '2': 'mock album', '3': 'another album' }
      });
    });

    it('should call setGlobalBands with correct data', async () => {
      const mockSetBandId = jest.fn();
      hook.setBandId = mockSetBandId;

      await act(() => hook.fetchBandPageData(2));

      expect(mockSetGlobalBands.mock.calls[0][0]).toEqual({
        results: { '5': 'mock band' }
      });
    });

    it('should call setGlobalAlbums with correct data', async () => {
      const mockSetBandId = jest.fn();
      hook.setBandId = mockSetBandId;

      await act(() => hook.fetchBandPageData(2));

      expect(mockSetGlobalAlbums.mock.calls[0][0]).toEqual({
        results: { '2': 'mock album', '3': 'another album' }
      });
    });

    it('should not call setBandId if an error is returned', async () => {
      API.doRequestMulti.mockRejectedValueOnce('error');
      const mockSetBandId = jest.fn();
      hook.setBandId = mockSetBandId;

      await act(() => hook.fetchBandPageData(2));

      expect(mockSetBandId.mock.calls.length).toBe(0);
      expect(mockSetGlobalAlbums.mock.calls.length).toBe(0);
      expect(mockSetGlobalBands.mock.calls.length).toBe(0);
    });

    it('should call setErrorObject with error if an error is returned', async () => {
      API.doRequestMulti.mockRejectedValueOnce('error');

      await act(() => hook.fetchBandPageData(2));

      expect(mockSetErrorObject.mock.calls[0][0]).toBe('error');
    });
  });
});
