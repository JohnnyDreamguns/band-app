// React
import React from 'react';
import HomePage from '../components/HomePage';
import { useHomeData } from '../hooks/useHomeData';

const HomePageContainer = () => {
  const {
    bands,
    page,
    loading,
    numOfPages,
    useFetchHomePageData,
    setNextPage,
    setPreviousPage
  } = useHomeData();

  useFetchHomePageData(page);

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
