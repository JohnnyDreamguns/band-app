import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createReducer from './reducers';
import { customMiddleware } from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export default function configureStore(initialState = {}, history) {
  const middlewares = [...customMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(),
    initialState,
    composeWithDevTools(...enhancers)
  );

  // Extensions
  store.injectedReducers = {};

  return store;
}
