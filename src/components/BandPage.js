import React from 'react';
import { Link } from 'react-router-dom';
const BandPage = ({ band, albums, loading }) => (
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

export default React.memo(BandPage);
