import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadBands, setPageId, clearHomepage } from './actions';
import { useInjectReducer } from '../../utils/injectReducer';
import {
  selectBands,
  selectLoading,
  selectPage,
  selectNumOfPages
} from './selectors';
import reducer from './reducer';

const key = 'homePage';

export const HomePage = ({
  loadBands,
  bands,
  loading,
  page,
  numOfPages,
  setPreviousPage,
  setNextPage,
  clearHomepage
}) => {
  useInjectReducer({ key, reducer });

  useEffect(() => {
    loadBands(page);

    return () => {
      clearHomepage();
    };
  }, [loadBands, clearHomepage, page]);

  return (
    <div>
      {loading && <div className="loader"></div>}

      {bands.map(band => (
        <p key={band.id}>
          <Link to={`/band/${band.id}`}>{band.name}</Link>
        </p>
      ))}

      <button onClick={setPreviousPage(page)} disabled={page === 1}>
        Previous Page
      </button>
      <button onClick={setNextPage(page)} disabled={page === numOfPages}>
        Next Page
      </button>
    </div>
  );
};

export const mapStateToProps = state => {
  return {
    bands: selectBands(state),
    loading: selectLoading(state),
    page: selectPage(state),
    numOfPages: selectNumOfPages(state)
  };
};

export const mapDispatchToProps = dispatch => ({
  loadBands: page => dispatch(loadBands(page)),
  setPreviousPage: page => () => dispatch(setPageId(page - 1)),
  setNextPage: page => () => dispatch(setPageId(page + 1)),
  clearHomepage: () => dispatch(clearHomepage())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
