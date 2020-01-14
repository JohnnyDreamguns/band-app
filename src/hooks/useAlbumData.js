import { useMemo, useCallback, useEffect } from 'react';
import produce from 'immer';
import { useStore } from '../store/store';
import API from '../services/api';
import { catchErrors } from '../utils/catchErrors';
import { useGlobalData } from './useGlobalData';
import { useMessages } from './useMessages';

export const useAlbumData = () => {
  const { state, setState } = useStore();

  const {
    bandsData,
    albumsData,
    setGlobalBands,
    setGlobalAlbums
  } = useGlobalData();

  const { setErrorObject } = useMessages();

  // Properties
  const albumId = useMemo(() => state.albumPage.albumId || undefined, [
    state.albumPage.albumId
  ]);

  const album = useMemo(() => albumsData[`${albumId}`], [albumId, albumsData]);

  const bandId = useMemo(() => album && album['band'], [album]);

  const band = useMemo(() => bandId && bandsData[`${bandId}`], [
    bandId,
    bandsData
  ]);

  const loading = useMemo(() => state.albumPage.loading, [
    state.albumPage.loading
  ]);

  // Functions
  const clearAlbumId = useCallback(() => {
    setState(
      produce(draft => {
        draft.albumPage = {
          ...draft.albumPage,
          albumId: undefined
        };
      })
    );
  }, [setState]);

  const setLoading = useCallback(
    isLoading => {
      setState(
        produce(draft => {
          draft.albumPage = {
            ...draft.albumPage,
            loading: isLoading
          };
        })
      );
    },
    [setState]
  );

  const setAlbumId = useCallback(
    data => {
      setState(
        produce(draft => {
          draft.albumPage = {
            ...draft.albumPage,
            albumId: parseInt(Object.keys(data.results)[0])
          };
        })
      );
    },
    [setState]
  );

  const fetchAlbumPageData = async albumId => {
    exported.setLoading(true);

    const { data, error } = await catchErrors(
      API.doRequestSequence(
        { endpoint: 'getAlbumById', params: { id: albumId } },
        {
          endpoint: 'getBandById',
          addParamsFromResponse: {
            param: 'id',
            responseIndex: 0,
            selector: selectFirstBand
          }
        }
      )
    );

    if (!error) {
      exported.setAlbumId(data[0]);
      setGlobalAlbums(data[0]);
      setGlobalBands(data[1]);
    } else {
      setErrorObject(error);
    }

    exported.setLoading(false);
  };

  const useFetchAlbumPageData = albumId => {
    useEffect(() => {
      exported.fetchAlbumPageData(albumId);
      return () => {
        exported.clearAlbumId();
      };
    }, [albumId]);
  };

  const selectFirstBand = response =>
    response.results[Object.keys(response.results)[0]].band;

  const exported = {
    album,
    albumId,
    band,
    bandId,
    loading,
    clearAlbumId,
    useFetchAlbumPageData,
    fetchAlbumPageData,
    selectFirstBand,
    setLoading,
    setAlbumId
  };

  return exported;
};
