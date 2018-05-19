/**
 * Constants
 */
export const ACTION_ADD_PHOTOS = 'ADD_PHOTOS';

/**
 * Actions
 */
export const addPhotos = photos => ({
  type: ACTION_ADD_PHOTOS,
  payload: photos || [],
});

/**
 * Reducer
 */
const initialState = [];

const reducer = (state = initialState, { type, payload } = {}) => {
  if (type === ACTION_ADD_PHOTOS) {
    return [...state, ...payload];
  }

  return state;
};

export default reducer;
