import React, { useEffect } from 'react';
import BandPage from '../components/BandPage';
import useBandData from '../hooks/useBandData';

const BandPageContainer = props => {
  const {
    band,
    loading,
    albums,
    fetchBandPageData,
    clearBandId
  } = useBandData();
  const { bandId } = props.match.params;

  useEffect(() => {
    fetchBandPageData(bandId);
    return () => {
      clearBandId();
    };
  }, [fetchBandPageData, bandId, clearBandId]);

  const componentProps = {
    band,
    albums,
    loading
  };

  return <BandPage {...componentProps} />;
};

export default BandPageContainer;
