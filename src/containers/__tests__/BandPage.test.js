import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import BandPageContainer from '../BandPage';
import BandPage from '../../components/BandPage';

const mockUseFetchBandPageData = jest.fn();

jest.mock('../../hooks/useBandData', () => ({
  useBandData: () => ({
    band: 'mock band',
    albumIds: 'mock albumIds',
    albums: { map: () => 'mock album' },
    loading: true,
    setLoading: 'mock setLoading',
    setBandId: 'mock setBandId',
    setAlbumKeys: 'mock setAlbumKeys',
    clearBandId: 'mock clearBandId',
    fetchBandPageData: 'mock fetchBandPageData',
    useFetchBandPageData: mockUseFetchBandPageData
  })
}));

jest.mock('../../hooks/useGlobalData', () => ({
  useGlobalData: () => ({
    setGlobalAlbums: () => {},
    setGlobalBands: () => {}
  })
}));

describe('BandPage container', () => {
  const props = {
    match: { params: { bandId: 2 } }
  };

  const testRenderer = TestRenderer.create(
    <BrowserRouter>
      <BandPageContainer {...props} />
    </BrowserRouter>
  );
  const testInstance = testRenderer.root;

  it('should match the props sent to the component', () => {
    expect(testInstance.findByType(BandPage.type).props).toMatchSnapshot();
  });

  it('should call mockUseFetchAlbumPageData', () => {
    expect(mockUseFetchBandPageData).toHaveBeenCalledTimes(1);
  });
});
