import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBandById, clearBandpage } from './actions';
import { useInjectReducer } from '../../utils/injectReducer';
import { selectLoading, selectBand, selectAlbums } from './selectors';
import reducer from './reducer';

const key = 'bandPage';

export const BandPage = ({
  band,
  albums,
  bandId,
  getBandById,
  clearBandpage,
  loading
}) => {
  useInjectReducer({ key, reducer });

  useEffect(() => {
    getBandById(bandId);

    return () => {
      clearBandpage();
    };
  }, [getBandById, clearBandpage, bandId]);

  return (
    <div>
      {loading && <div className="loader"></div>}

      {band && (
        <div>
          <h2>{band.name}</h2>
          <p>{band.bio}</p>
          <p>Formed: {band.formed}</p>
          <br />

          <h3>Albums</h3>
          {albums &&
            albums.map(album => (
              <p key={album.id}>
                <Link to={`/album/${album.id}`}>{album.name}</Link>
              </p>
            ))}

          <br />
          <p>
            Back to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export const mapStateToProps = (state, ownProps) => {
  const { bandId } = ownProps.match.params;

  return {
    bandId,
    loading: selectLoading(state),
    band: selectBand(state),
    albums: selectAlbums(state)
  };
};

export const mapDispatchToProps = dispatch => ({
  getBandById: bandId => dispatch(getBandById(bandId)),
  clearBandpage: () => dispatch(clearBandpage())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BandPage);
