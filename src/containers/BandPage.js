import React from 'react';
import BandPage from '../components/BandPage';
import { useBandData } from '../hooks/useBandData';

const BandPageContainer = props => {
  const { band, loading, albums, useFetchBandPageData } = useBandData();
  const { bandId } = props.match.params;

  useFetchBandPageData(bandId);

  const componentProps = {
    band,
    albums,
    loading
  };

  return <BandPage {...componentProps} />;
};

export default BandPageContainer;
