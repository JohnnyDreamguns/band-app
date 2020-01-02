import React from 'react';
import AlbumPage from '../components/AlbumPage';
import useAlbumData from '../hooks/useAlbumData';

const AlbumPageContainer = props => {
  const { album, band, loading, useFetchAlbumPageData } = useAlbumData();
  const { albumId } = props.match.params;

  useFetchAlbumPageData(albumId);

  const componentProps = {
    album,
    band,
    loading
  };

  return <AlbumPage {...componentProps} />;
};

export default AlbumPageContainer;
