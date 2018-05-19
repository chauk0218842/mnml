import { combineReducers } from 'redux';
import albums, { addAlbums } from './albums';
import photos, { addPhotos } from './photos';
import users, { addUsers } from './users';

export const actions = {
  addAlbums,
  addPhotos,
  addUsers,
};

const reducers = combineReducers({
  albums,
  photos,
  users,
});

export default reducers;
