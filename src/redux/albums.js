/**
 * Constants
 */
export const ACTION_UPDATE_ALBUMS = 'UPDATE_ALBUMS';

/**
 * Actions
 */
export const updateAlbums = albums => ({
  type: ACTION_UPDATE_ALBUMS,
  payload: albums || {},
});

/**
 * Reducer
 */
const initialState = {};

const reducer = (state = initialState, { type, payload } = {}) => {
  if (type === ACTION_UPDATE_ALBUMS) {
    return { ...state, ...payload };
  }

  return state;
};

export default reducer;
