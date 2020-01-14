import { testHook } from '../../testUtils/testHook';
import { useGlobalData } from '../useGlobalData';
import API from '../../services/api';
import { StoreProvider, initialValue } from '../../store/store';
import TestRenderer from 'react-test-renderer';

const { act } = TestRenderer;

jest.mock('../../services/api');

jest.mock('../useMessages', () => ({
  useMessages: () => ({
    setErrorObject: mockSetErrorObject
  })
}));

let hook;
beforeEach(() => {
  testHook(() => {
    hook = useGlobalData();
  }, StoreProvider);
  jest.clearAllMocks();
});

describe('useGlobalData hook', () => {
  describe('bandsData prop', () => {
    it('should have an initial value of empty object', () => {
      expect(hook.bandsData).toEqual({});
    });
  });

  describe('setGlobalBands method', () => {
    it('should update bandsData when setGlobalBands is called', () => {
      act(() => {
        hook.setGlobalBands({
          results: {
            5: 'mock band 1',
            6: 'mock band 2'
          },
          totalResults: 2
        });
      });

      expect(hook.bandsData).toEqual({
        5: 'mock band 1',
        6: 'mock band 2'
      });
    });

    it('should update totalNumBands when setGlobalBands is called', () => {
      act(() => {
        hook.setGlobalBands({
          totalResults: 2
        });
      });

      expect(hook.totalNumBands).toBe(2);
    });
  });

  describe('albumsData prop', () => {
    it('should have an initial value of empty object', () => {
      expect(hook.albumsData).toEqual({});
    });
  });

  describe('setGlobalAlbums method', () => {
    it('should update albumsData when setGlobalAlbums is called', () => {
      act(() => {
        hook.setGlobalAlbums({
          results: {
            2: 'mock album 1',
            3: 'mock album 2'
          },
          totalResults: 2
        });
      });

      expect(hook.albumsData).toEqual({
        2: 'mock album 1',
        3: 'mock album 2'
      });
    });
  });
});
