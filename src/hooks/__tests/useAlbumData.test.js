import React, { useMemo, useState } from 'react';
import { testHook } from '../../testUtils/testHook';
import TestRenderer from 'react-test-renderer';
import useAlbumData from '../useAlbumData';
import API from '../../services/api';
import { StoreProvider, initialValue } from '../../store/store';

const { act } = TestRenderer;

jest.mock('../../services/api');

let hook;
beforeEach(() => {
  testHook(() => {
    hook = useAlbumData();
  }, StoreProvider);
  jest.clearAllMocks();
});

describe('useAlbumData hook', () => {
  it('should have an albumId prop that has an initial value', () => {
    expect(hook.albumId).toBe(initialValue.albumPage.albumId);
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
