import { useMemo, useCallback, useEffect } from 'react';
import produce from 'immer';
import { useStore } from '../store/store';
import API from '../services/api';
import { catchErrors } from '../utils/catchErrors';
import { useGlobalData } from './useGlobalData';
import { useMessages } from './useMessages';

export const useHomeData = () => {
  const { state, setState } = useStore();
  const { bandsData, totalNumBands, setGlobalBands } = useGlobalData();
  const { setErrorObject } = useMessages();

  // Properties
  const bandIds = useMemo(() => state.homePage.bands, [state.homePage.bands]);

  const bands = useMemo(
    () =>
      bandIds.filter(x => bandsData[x]).map(bandId => bandsData[`${bandId}`]),
    [bandIds, bandsData]
  );

  const page = useMemo(() => state.homePage.page, [state.homePage.page]);

  const loading = useMemo(() => state.homePage.loading, [
    state.homePage.loading
  ]);

  const numOfPages = useMemo(
    () => totalNumBands && Math.ceil(totalNumBands / 3),
    [totalNumBands]
  );

  // Functions
  const setLoading = useCallback(
    isLoading => {
      setState(
        produce(draft => {
          draft.homePage = {
            ...draft.homePage,
            loading: isLoading
          };
        })
      );
    },
    [setState]
  );

  const setBandKeys = useCallback(
    data => {
      setState(
        produce(draft => {
          draft.homePage = {
            ...draft.homePage,
            bands: Object.keys(data.results).map(x => +x)
          };
        })
      );
    },
    [setState]
  );

  const setPage = useCallback(
    page => {
      setState(
        produce(draft => {
          draft.homePage = {
            ...draft.homePage,
            page
          };
        })
      );
    },
    [setState]
  );

  const setNextPage = useCallback(
    () => () => setPage(state.homePage.page + 1),
    [state.homePage.page, setPage]
  );

  const setPreviousPage = useCallback(
    () => () => setPage(state.homePage.page - 1),
    [state.homePage.page, setPage]
  );

  const fetchHomePageData = async page => {
    exported.setLoading(true);
    const { data, error } = await catchErrors(
      API.doRequest({
        endpoint: 'getBandsByPage',
        params: { page }
      })
    );

    if (!error) {
      exported.setBandKeys(data);
      setGlobalBands(data);
    } else {
      setErrorObject(error);
    }

    exported.setLoading(false);
  };

  const useFetchHomePageData = page => {
    useEffect(() => {
      exported.fetchHomePageData(page);
    }, [page]);
  };

  const exported = {
    bandIds,
    bands,
    page,
    loading,
    numOfPages,
    setLoading,
    setBandKeys,
    setPage,
    setNextPage,
    setPreviousPage,
    fetchHomePageData,
    useFetchHomePageData
  };

  return exported;
};
