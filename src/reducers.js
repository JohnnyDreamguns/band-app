import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';
//import globalReducer from './containers/App/reducer';
import dataReducer from './reducers/data';
import messagesReducer from './reducers/messages';
//import languageProviderReducer from 'containers/LanguageProvider/reducer';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    data: dataReducer,
    messages: messagesReducer,
    //global: globalReducer,
    //language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers
  });

  return rootReducer;
}
