import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import AlbumPage from '../AlbumPage';
import BandPage from '../BandPage';
import MessageDialog from '../MessageDialog';

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
