import React, { useEffect } from 'react';
import AlbumPage from '../components/AlbumPage';
import useAlbumData from '../hooks/useAlbumData';

const AlbumPageContainer = props => {
  const {
    album,
    band,
    loading,
    fetchAlbumPageData,
    clearAlbumId
  } = useAlbumData();
  const { albumId } = props.match.params;

  useEffect(() => {
    fetchAlbumPageData(albumId);
    return () => {
      clearAlbumId();
    };
  }, [albumId, fetchAlbumPageData, clearAlbumId]);

  const componentProps = {
    album,
    band,
    loading
  };

  return <AlbumPage {...componentProps} />;
};

export default AlbumPageContainer;
