/**
 * Constants
 */
export const ACTION_UPDATE_PHOTOS = 'UPDATE_PHOTOS';

/**
 * Actions
 */
export const updatePhotos = photos => ({
  type: ACTION_UPDATE_PHOTOS,
  payload: photos || {},
});

/**
 * Reducer
 */
const initialState = {};

const reducer = (state = initialState, { type, payload } = {}) => {
  if (type === ACTION_UPDATE_PHOTOS) {
    return { ...state, ...payload };
  }

  return state;
};

export default reducer;
