import { useMemo, useCallback } from 'react';
import produce from 'immer';
import { useStore } from '../store/store';
import { doRequestSequence } from '../services/api';
import { catchErrors } from '../utils/catchErrors';
import { useGlobalData } from './useGlobalData';
import { useMessages } from './useMessages';

export const useBandData = () => {
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

  const loading = useMemo(() => state.albumPage.loading, [
    state.albumPage.loading
  ]);

  const album = useMemo(() => albumsData[`${albumId}`], [albumId, albumsData]);

  const bandId = useMemo(() => album && album['band'], [album]);

  const band = useMemo(() => bandId && bandsData[`${bandId}`], [
    bandId,
    bandsData
  ]);

  // Functions
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

  const selectFirstBand = response =>
    response.results[Object.keys(response.results)[0]].band;

  const fetchAlbumPageData = useCallback(
    async albumId => {
      setLoading(true);

      const { data, error } = await catchErrors(
        doRequestSequence(
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
        setAlbumId(data[0]);
        setGlobalAlbums(data[0]);
        setGlobalBands(data[1]);
      } else {
        setErrorObject(error);
      }

      setLoading(false);
    },
    [setLoading, setAlbumId, setGlobalAlbums, setGlobalBands, setErrorObject]
  );

  return {
    albumId,
    album,
    band,
    loading,
    fetchAlbumPageData,
    setAlbumId,
    clearAlbumId
  };
};

export default useBandData;
