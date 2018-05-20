/**
 * Constants
 */
export const ACTION_SELECT_USER = 'SELECT_USER';
export const ACTION_UPDATE_USERS = 'UPDATE_USERS';

/**
 * Actions
 */
export const selectUser = (userId = null) => ({
  type: ACTION_SELECT_USER,
  payload: userId,
});

export const updateUsers = users => ({
  type: ACTION_UPDATE_USERS,
  payload: users || {},
});

/**
 * Reducer
 */
const initialState = {
  list: {},
  selectedUserId: null,
};

const reducer = (state = initialState, { type, payload } = {}) => {
  if (type === ACTION_SELECT_USER) {
    return {
      ...state,
      selectedUserId: payload,
    };
  } else if (type === ACTION_UPDATE_USERS) {
    return {
      ...state,
      list: { ...state.list, ...payload },
    };
  }

  return state;
};

export default reducer;
