import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './containers/HomePage';
import AlbumPage from './containers/AlbumPage';
import BandPage from './containers/BandPage';
import MessageDialog from './containers/MessageDialog';

const App = () => {
  return (
    <React.Fragment>
      <MessageDialog />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/band/:bandId" component={BandPage} />
        <Route path="/album/:albumId" component={AlbumPage} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
