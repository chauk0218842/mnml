import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import UserPhotoAlbum from './containers/UserPhotoAlbum';
import redux from './redux/redux';

const store = createStore(
  redux,
  process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  process.env.NODE_ENV !== 'production' && applyMiddleware(logger)
);

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

const App = () => (
  <Provider store={store}>
    <UserPhotoAlbum />
  </Provider>
);

export default App;
