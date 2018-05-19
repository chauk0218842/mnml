/**
 * Constants
 */
export const ACTION_ADD_USERS = 'ADD_USERS';

/**
 * Actions
 */
export const addUsers = users => ({
  type: ACTION_ADD_USERS,
  payload: users || [],
});

/**
 * Reducer
 */
const initialState = [];

const reducer = (state = initialState, { type, payload } = {}) => {
  if (type === ACTION_ADD_USERS) {
    return [...state, ...payload];
  }

  return state;
};

export default reducer;
