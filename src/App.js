import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import UserPhotoAlbum from './containers/UserPhotoAlbum';
import redux from './redux/redux';

const store = createStore(
  redux,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(logger)
);

const App = () => (
  <Provider store={store}>
    <UserPhotoAlbum />
  </Provider>
);

export default App;
