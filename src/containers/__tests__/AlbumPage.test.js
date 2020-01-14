import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import AlbumPageContainer from '../AlbumPage';
import AlbumPage from '../../components/AlbumPage';

const mockUseFetchAlbumPageData = jest.fn();

jest.mock('../../hooks/useAlbumData', () => ({
  useAlbumData: () => ({
    album: 'mock album',
    albumId: 5,
    band: 'mock band',
    bandId: 2,
    loading: true,
    clearAlbumId: 'mock clearAlbumId',
    useFetchAlbumPageData: mockUseFetchAlbumPageData,
    fetchAlbumPageData: 'mock fetchAlbumPageData',
    selectFirstBand: 'mock selectFirstBand',
    setLoading: 'mock setLoading',
    setAlbumId: 'mock setAlbumId'
  })
}));

jest.mock('../../hooks/useGlobalData', () => ({
  useGlobalData: () => ({
    setGlobalAlbums: () => {},
    setGlobalBands: () => {}
  })
}));

describe('AlbumPage container', () => {
  const props = {
    match: { params: { albumId: 5 } }
  };

  const testRenderer = TestRenderer.create(
    <BrowserRouter>
      <AlbumPageContainer {...props} />
    </BrowserRouter>
  );
  const testInstance = testRenderer.root;

  it('should match the props sent to the component', () => {
    expect(testInstance.findByType(AlbumPage.type).props).toMatchSnapshot();
  });

  it('should call mockUseFetchAlbumPageData', () => {
    expect(mockUseFetchAlbumPageData).toHaveBeenCalledTimes(1);
  });
});
