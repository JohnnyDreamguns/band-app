import { useMemo, useCallback } from 'react';
import produce from 'immer';
import { useStore } from '../store/store';
import { doRequest } from '../services/api';
import { catchErrors } from '../utils/catchErrors';
import { useGlobalData } from './useGlobalData';
import { useMessages } from './useMessages';

const useHomeData = () => {
  const { state, setState } = useStore();
  const { bandsData, totalNumBands, setGlobalBands } = useGlobalData();
  const { setErrorObject } = useMessages();

  // Properties
  const bandIds = useMemo(() => state.homePage.bands || [], [
    state.homePage.bands
  ]);

  const page = useMemo(() => state.homePage.page, [state.homePage.page]);

  const loading = useMemo(() => state.homePage.loading, [
    state.homePage.loading
  ]);

  const numOfPages = useMemo(
    () => totalNumBands && Math.ceil(totalNumBands / 3),
    [totalNumBands]
  );

  const bands = useMemo(
    () =>
      bandIds.filter(x => bandsData[x]).map(bandId => bandsData[`${bandId}`]),
    [bandIds, bandsData]
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

  const fetchBands = useCallback(
    async page => {
      setLoading(true);
      const { data, error } = await catchErrors(
        doRequest({
          endpoint: 'getBandsByPage',
          params: { page }
        })
      );

      if (!error) {
        setBandKeys(data);
        setGlobalBands(data);
      } else {
        setErrorObject(error);
      }

      setLoading(false);
    },
    [setLoading, setBandKeys, setGlobalBands, setErrorObject]
  );

  return {
    bands,
    page,
    loading,
    numOfPages,
    setNextPage,
    setPreviousPage,
    fetchBands
  };
};

export default useHomeData;
