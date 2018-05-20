/**
 * Constants
 */
export const ACTION_SELECT_ALBUM = 'SELECT_ALBUM';
export const ACTION_UPDATE_ALBUMS = 'UPDATE_ALBUMS';

/**
 * Actions
 */
export const selectAlbum = (albumId = null) => ({
  type: ACTION_SELECT_ALBUM,
  payload: albumId,
});

export const updateAlbums = albums => ({
  type: ACTION_UPDATE_ALBUMS,
  payload: albums || {},
});

/**
 * Reducer
 */
const initialState = {
  list: {},
  selectedAlbumId: null,
};

const reducer = (state = initialState, { type, payload } = {}) => {
  if (type === ACTION_SELECT_ALBUM) {
    return {
      ...state,
      selectedAlbumId: payload,
    };
  } else if (type === ACTION_UPDATE_ALBUMS) {
    return {
      ...state,
      list: { ...state.list, ...payload },
    };
  }

  return state;
};

export default reducer;
