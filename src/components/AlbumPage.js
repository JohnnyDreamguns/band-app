import React from 'react';
import { Link } from 'react-router-dom';

const AlbumPage = ({ loading, album, band }) => (
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

export default AlbumPage;
