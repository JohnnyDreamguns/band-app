import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ bands, loading, page, numOfPages, actions }) => (
  <div>
    {loading && <div className="loader"></div>}

    {bands &&
      bands.map(band => (
        <p key={band.id}>
          <Link to={`/band/${band.id}`}>{band.name}</Link>
        </p>
      ))}

    <button onClick={actions.setPreviousPage(page)} disabled={page === 1}>
      Previous Page
    </button>
    <button onClick={actions.setNextPage(page)} disabled={page === numOfPages}>
      Next Page
    </button>
  </div>
);

export default React.memo(HomePage);
