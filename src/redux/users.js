/**
 * Constants
 */
export const ACTION_UPDATE_USERS = 'UPDATE_USERS';

/**
 * Actions
 */
export const updateUsers = users => ({
  type: ACTION_UPDATE_USERS,
  payload: users || {},
});

/**
 * Reducer
 */
const initialState = {};

const reducer = (state = initialState, { type, payload } = {}) => {
  if (type === ACTION_UPDATE_USERS) {
    return { ...state, ...payload };
  }

  return state;
};

export default reducer;
