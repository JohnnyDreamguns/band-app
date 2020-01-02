import React, { useMemo, useState } from 'react';
import { testHook } from '../../testUtils/testHook';
import useAlbumData from '../useAlbumData';
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
    hook = useAlbumData();
  }, StoreProvider);
  jest.clearAllMocks();
});

describe('useAlbumData hook', () => {
  describe('album prop', () => {
    it('should have an initial value of undefined', () => {
      expect(hook.album).toBe(undefined);
    });

    it('should update album when setAlbumId is called', () => {
      act(() => {
        hook.setAlbumId({
          results: {
            2: 'mock!'
          }
        });
      });
      expect(hook.album.name).toBe('mock album');
      expect(hook.album.band).toBe(5);
    });
  });

  describe('albumId prop', () => {
    it('should have an albumId prop that has an initial value', () => {
      expect(hook.albumId).toBe(initialValue.albumPage.albumId);
    });

    it('should have a setAlbumId function', () => {
      expect(hook.setAlbumId).toEqual(expect.any(Function));
    });

    it('should update albumId when setAlbumId is called', () => {
      act(() => {
        hook.setAlbumId({
          results: {
            2: 'mock!'
          }
        });
      });
      expect(hook.albumId).toBe(2);
    });
  });

  describe('band prop', () => {
    it('should have an initial value of undefined', () => {
      expect(hook.band).toBe(undefined);
    });

    it('should update band when setAlbumId is called', () => {
      act(() => {
        hook.setAlbumId({
          results: {
            2: 'mock!'
          }
        });
      });
      expect(hook.band.name).toBe('mock band');
    });
  });

  describe('bandId prop', () => {
    it('should have an initial value of undefined', () => {
      expect(hook.bandId).toBe(undefined);
    });

    it('should update band when setAlbumId is called', () => {
      act(() => {
        hook.setAlbumId({
          results: {
            2: 'mock!'
          }
        });
      });
      expect(hook.bandId).toBe(5);
    });
  });

  describe('loading prop', () => {
    it('should have a loading prop that has an initial value', () => {
      expect(hook.loading).toBe(initialValue.albumPage.loading);
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

  describe('clearAlbumId', () => {
    it('should set albumId to undefined when called', () => {
      act(() => {
        hook.setAlbumId({
          results: {
            2: 'mock!'
          }
        });
        hook.clearAlbumId();
      });

      expect(hook.albumId).toBe(undefined);
    });
  });

  describe('selectFirstBand', () => {
    it('should should return first band in response', () => {
      const mockResponse = {
        results: {
          7: {
            band: 'mock band'
          }
        }
      };
      expect(hook.selectFirstBand(mockResponse)).toBe('mock band');
    });
  });

  describe('useFetchAlbumPageData', () => {
    it('should call side effect fetchAlbumPageData when called', () => {
      hook.fetchAlbumPageData = jest.fn();

      act(() => {
        testHook(hook.useFetchAlbumPageData);
      });

      expect(hook.fetchAlbumPageData).toHaveBeenCalledTimes(1);
    });

    it('should call clearAlbumId on unmount', async () => {
      const mockClearAlbumId = jest.fn();
      hook.clearAlbumId = mockClearAlbumId;

      let th;
      act(() => {
        th = testHook(hook.useFetchAlbumPageData, StoreProvider);
      });

      th.unmount();

      expect(mockClearAlbumId).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchAlbumPageData', () => {
    it('should call setLoading with true and false', async () => {
      const mockSetLoading = jest.fn();
      hook.setLoading = mockSetLoading;

      await act(() => hook.fetchAlbumPageData(2));

      expect(mockSetLoading.mock.calls[0][0]).toBe(true);
      expect(mockSetLoading.mock.calls[1][0]).toBe(false);
    });

    it('should call doRequestSequence with correct values', async () => {
      await act(() => hook.fetchAlbumPageData(2));

      expect(API.doRequestSequence.mock.calls[0][0].endpoint).toBe(
        'getAlbumById'
      );
      expect(API.doRequestSequence.mock.calls[0][0].params.id).toBe(2);
      expect(API.doRequestSequence.mock.calls[0][1].endpoint).toBe(
        'getBandById'
      );
      expect(
        API.doRequestSequence.mock.calls[0][1].addParamsFromResponse.param
      ).toBe('id');
      expect(
        API.doRequestSequence.mock.calls[0][1].addParamsFromResponse
          .responseIndex
      ).toBe(0);
    });

    it('should call setAlbumId with correct data', async () => {
      const mockSetAlbumId = jest.fn();
      hook.setAlbumId = mockSetAlbumId;

      await act(() => hook.fetchAlbumPageData(2));

      expect(mockSetAlbumId.mock.calls[0][0]).toEqual({
        results: { '2': 'mock album' }
      });
    });

    it('should call setGlobalAlbums with correct data', async () => {
      const mockSetAlbumId = jest.fn();
      hook.setAlbumId = mockSetAlbumId;

      await act(() => hook.fetchAlbumPageData(2));

      expect(mockSetGlobalAlbums.mock.calls[0][0]).toEqual({
        results: { '2': 'mock album' }
      });
    });

    it('should call setGlobalBands with correct data', async () => {
      const mockSetAlbumId = jest.fn();
      hook.setAlbumId = mockSetAlbumId;

      await act(() => hook.fetchAlbumPageData(2));

      expect(mockSetGlobalBands.mock.calls[0][0]).toEqual({
        results: { '5': 'mock band' }
      });
    });

    it('should not call setAlbumId if an error is returned', async () => {
      API.doRequestSequence.mockRejectedValueOnce('error');
      const mockSetAlbumId = jest.fn();
      hook.setAlbumId = mockSetAlbumId;

      await act(() => hook.fetchAlbumPageData(2));

      expect(mockSetAlbumId.mock.calls.length).toBe(0);
      expect(mockSetGlobalAlbums.mock.calls.length).toBe(0);
      expect(mockSetGlobalBands.mock.calls.length).toBe(0);
    });

    it('should call setErrorObject with error if an error is returned', async () => {
      API.doRequestSequence.mockRejectedValueOnce('error');

      await act(() => hook.fetchAlbumPageData(2));

      expect(mockSetErrorObject.mock.calls[0][0]).toBe('error');
    });
  });
});
