import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import HomePageContainer from '../HomePage';
import HomePage from '../../components/HomePage';

const mockUseFetchHomePageData = jest.fn();

jest.mock('../../hooks/useHomeData', () => ({
  useHomeData: () => ({
    bandIds: 'mock bandIds',
    bands: { map: () => 'mock bands' },
    page: 2,
    loading: true,
    numOfPages: 3,
    setLoading: 'mock setLoading',
    setBandKeys: 'mock setBandKeys',
    setPage: 'mock setPage',
    fetchHomePageData: 'mock fetchHomePageData',
    useFetchHomePageData: mockUseFetchHomePageData,
    setNextPage: () => 'mock setNextPage',
    setPreviousPage: () => 'mock setPreviousPage'
  })
}));

jest.mock('../../hooks/useGlobalData', () => ({
  useGlobalData: () => ({
    setGlobalAlbums: () => {},
    setGlobalBands: () => {}
  })
}));

describe('HomePage container', () => {
  const testRenderer = TestRenderer.create(
    <BrowserRouter>
      <HomePageContainer />
    </BrowserRouter>
  );
  const testInstance = testRenderer.root;

  it('should match the props sent to the component', () => {
    expect(testInstance.findByType(HomePage.type).props).toMatchSnapshot();
  });

  it('should call mockUseFetchAlbumPageData', () => {
    expect(mockUseFetchHomePageData).toHaveBeenCalledTimes(1);
  });
});
