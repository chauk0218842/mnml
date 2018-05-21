/**
 * Constants
 */
export const ACTION_SELECT_PHOTO = 'SELECT_PHOTO';
export const ACTION_UPDATE_PHOTOS = 'UPDATE_PHOTOS';

/**
 * Actions
 */
export const selectPhoto = (photoId = null) => ({
  type: ACTION_SELECT_PHOTO,
  payload: photoId,
});

export const updatePhotos = photos => ({
  type: ACTION_UPDATE_PHOTOS,
  payload: photos || {},
});

/**
 * Reducer
 */
const initialState = {
  list: {},
  selectedPhotoId: null,
};

const reducer = (state = initialState, { type, payload } = {}) => {
  if (type === ACTION_SELECT_PHOTO) {
    return {
      ...state,
      selectedPhotoId: payload,
    };
  } else if (type === ACTION_UPDATE_PHOTOS) {
    return {
      ...state,
      list: { ...state.list, ...payload },
    };
  }

  return state;
};

export default reducer;
