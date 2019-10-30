import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAlbumById, clearAlbumpage } from './actions';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import { selectLoading, selectAlbum, selectBand } from './selectors';
import saga from './saga';
import reducer from './reducer';

const key = 'albumPage';

export const AlbumPage = ({
  albumId,
  loading,
  album,
  band,
  getAlbumById,
  clearAlbumpage
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getAlbumById(albumId);

    return () => {
      clearAlbumpage();
    };
  }, [getAlbumById, clearAlbumpage, albumId]);

  return (
    <div>
      {loading && <div className="loader"></div>}

      {album && band && (
        <div>
          <h2>{album.name}</h2>
          <p>Released: {album.released}</p>

          <p>
            Back to <Link to={`/band/${band.id}`}>{band.name}</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export const mapStateToProps = (state, ownProps) => {
  const { albumId } = ownProps.match.params;

  return {
    albumId,
    loading: selectLoading(state),
    album: selectAlbum(state),
    band: selectBand(state)
  };
};

export const mapDispatchToProps = dispatch => ({
  getAlbumById: albumId => dispatch(getAlbumById(albumId)),
  clearAlbumpage: () => dispatch(clearAlbumpage())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumPage);
