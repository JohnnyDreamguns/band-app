import { useMemo, useCallback } from 'react';
import produce from 'immer';
import { useStore } from '../store/store';
import { doRequestMulti } from '../services/api';
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
  const bandId = useMemo(() => state.bandPage.bandId || undefined, [
    state.bandPage.bandId
  ]);

  const loading = useMemo(() => state.bandPage.loading, [
    state.bandPage.loading
  ]);

  const band = useMemo(() => bandsData[`${bandId}`], [bandId, bandsData]);

  const albumIds = useMemo(() => state.bandPage.albums, [
    state.bandPage.albums
  ]);

  const albums = useMemo(
    () =>
      albumIds
        .filter(x => albumsData[x])
        .map(albumId => albumsData[`${albumId}`]),
    [albumIds, albumsData]
  );

  // Functions
  const setLoading = useCallback(
    isLoading => {
      setState(
        produce(draft => {
          draft.bandPage = {
            ...draft.bandPage,
            loading: isLoading
          };
        })
      );
    },
    [setState]
  );

  const setBandId = useCallback(
    data => {
      setState(
        produce(draft => {
          draft.bandPage = {
            ...draft.bandPage,
            bandId: parseInt(Object.keys(data.results)[0])
          };
        })
      );
    },
    [setState]
  );

  const setAlbumKeys = useCallback(
    data => {
      setState(
        produce(draft => {
          draft.bandPage = {
            ...draft.bandPage,
            albums: Object.keys(data.results).map(x => +x)
          };
        })
      );
    },
    [setState]
  );

  const clearBandId = useCallback(() => {
    setState(
      produce(draft => {
        draft.bandPage = {
          ...draft.bandPage,
          bandId: undefined
        };
      })
    );
  }, [setState]);

  const fetchBandPageData = useCallback(
    async bandId => {
      setLoading(true);
      const { data, error } = await catchErrors(
        doRequestMulti(
          { endpoint: 'getBandById', params: { id: bandId } },
          { endpoint: 'getAlbumsByBandId', params: { id: bandId } }
        )
      );

      if (!error) {
        setBandId(data[0]);
        setGlobalBands(data[0]);
        setAlbumKeys(data[1]);
        setGlobalAlbums(data[1]);
      } else {
        setErrorObject(error);
      }

      setLoading(false);
    },
    [
      setLoading,
      setBandId,
      setGlobalBands,
      setAlbumKeys,
      setGlobalAlbums,
      setErrorObject
    ]
  );

  return {
    band,
    albums,
    loading,
    fetchBandPageData,
    clearBandId
  };
};

export default useBandData;
