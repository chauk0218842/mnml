import { combineReducers } from 'redux';
import albums, { updateAlbums } from './albums';
import photos, { updatePhotos } from './photos';
import users, { updateUsers } from './users';

export const actions = {
  updateAlbums,
  updatePhotos,
  updateUsers,
};

const reducers = combineReducers({
  albums,
  photos,
  users,
});

export default reducers;
