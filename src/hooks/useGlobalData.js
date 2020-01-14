import { useMemo, useCallback } from 'react';
import produce from 'immer';
import { useStore } from '../store/store';

export const useGlobalData = () => {
  const { state, setState } = useStore();

  // Properties
  const bandsData = useMemo(() => state.data.bands, [state.data.bands]);

  const totalNumBands = useMemo(() => state.data.totalNumBands, [
    state.data.totalNumBands
  ]);

  const albumsData = useMemo(() => state.data.albums, [state.data.albums]);

  // Functions
  const setGlobalBands = useCallback(
    data => {
      setState(
        produce(draft => {
          draft.data = {
            ...draft.data,
            bands: {
              ...draft.data.bands,
              ...data.results
            },
            totalNumBands: data.totalResults
          };
        })
      );
    },
    [setState]
  );

  const setGlobalAlbums = useCallback(
    data => {
      setState(
        produce(draft => {
          draft.data = {
            ...draft.data,
            albums: {
              ...draft.data.albums,
              ...data.results
            }
          };
        })
      );
    },
    [setState]
  );

  return {
    bandsData,
    totalNumBands,
    albumsData,
    setGlobalBands,
    setGlobalAlbums
  };
};
