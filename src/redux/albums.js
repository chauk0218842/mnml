/**
 * Constants
 */
export const ACTION_ADD_ALBUMS = 'ADD_ALBUMS';

/**
 * Actions
 */
export const addAlbums = albums => ({
  type: ACTION_ADD_ALBUMS,
  payload: albums || [],
});

/**
 * Reducer
 */
const initialState = [];

const reducer = (state = initialState, { type, payload } = {}) => {
  if (type === ACTION_ADD_ALBUMS) {
    return [...state, ...payload];
  }

  return state;
};

export default reducer;
