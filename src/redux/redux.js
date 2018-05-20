import { combineReducers } from 'redux';
import albums, { updateAlbums } from './albums';
import photos, { updatePhotos } from './photos';
import users, { selectUser, updateUsers } from './users';

export const actions = {
  selectUser,
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
