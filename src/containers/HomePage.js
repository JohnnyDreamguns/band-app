// React
import React, { useEffect } from 'react';
import HomePage from '../components/HomePage';
import useHomeData from '../hooks/useHomeData';

const HomePageContainer = () => {
  const {
    bands,
    page,
    loading,
    numOfPages,
    fetchBands,
    setNextPage,
    setPreviousPage
  } = useHomeData();

  useEffect(() => {
    fetchBands(page);
  }, [fetchBands, page]);

  const componentProps = {
    bands,
    page,
    loading,
    numOfPages,
    actions: {
      setNextPage,
      setPreviousPage
    }
  };

  return <HomePage {...componentProps} />;
};

export default HomePageContainer;
