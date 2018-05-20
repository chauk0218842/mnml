/* global describe, test, beforeEach */

import reducer, {
  ACTION_UPDATE_USERS,
  updateUsers,
  selectUser,
  ACTION_SELECT_USER,
} from '../users';

describe('#users', () => {
  describe('selectUser', () => {
    test('is a function', () => {
      expect(typeof selectUser).toEqual('function');
    });

    describe('pass in userId', () => {
      test('userId is not defined', () => {
        expect(selectUser()).toEqual({
          type: ACTION_SELECT_USER,
          payload: null,
        });

        expect(selectUser(null)).toEqual({
          type: ACTION_SELECT_USER,
          payload: null,
        });
      });

      test('userId is defined', () => {
        expect(selectUser(-168)).toEqual({
          type: ACTION_SELECT_USER,
          payload: -168,
        });

        expect(selectUser(168)).toEqual({
          type: ACTION_SELECT_USER,
          payload: 168,
        });

        expect(selectUser('ONE-SIXTY-EIGHT')).toEqual({
          type: ACTION_SELECT_USER,
          payload: 'ONE-SIXTY-EIGHT',
        });
      });
    });
  });

  describe('updateUsers', () => {
    let payload;
    beforeEach(() => {
      payload = [
        {
          id: 0,
          name: 'Name Zero',
        },
        {
          id: 1,
          name: 'Name One',
        },
        {
          id: 2,
          name: 'Name Two',
        },
      ];
    });

    test('is a function', () => {
      expect(typeof updateUsers).toEqual('function');
    });

    describe('pass in users', () => {
      test('users is not defined', () => {
        expect(updateUsers()).toEqual({
          type: ACTION_UPDATE_USERS,
          payload: {},
        });

        expect(updateUsers(null)).toEqual({
          type: ACTION_UPDATE_USERS,
          payload: {},
        });
      });

      test('users is defined', () => {
        expect(updateUsers({})).toEqual({
          type: ACTION_UPDATE_USERS,
          payload: {},
        });

        expect(updateUsers(payload)).toEqual({
          type: ACTION_UPDATE_USERS,
          payload,
        });
      });
    });
  });

  describe('reducer', () => {
    let state;
    let payload;
    let action;

    beforeEach(() => {
      state = {
        list: {
          0: {
            id: 0,
            name: 'Name Zero',
          },
          1: {
            id: 1,
            name: 'Name One',
          },
          2: {
            id: 2,
            name: 'Name Two',
          },
        },
        selectd: null,
      };

      payload = [
        {
          id: 3,
          name: 'Name Three',
        },
        {
          id: 4,
          name: 'Name Four',
        },
      ];

      action = {
        type: ACTION_UPDATE_USERS,
        payload,
      };
    });

    test('is a function', () => {
      expect(typeof reducer).toEqual('function');
    });

    describe('pass in state', () => {
      test('state is not defined', () => {
        expect(reducer()).toEqual({ list: {}, selectedUserId: null });
        expect(reducer(null)).toEqual(null);
      });

      test('state is defined', () => {
        expect(reducer(state)).toEqual(state);
      });
    });

    describe('pass in state and action', () => {
      test('state is defined and action is not defined', () => {
        expect(reducer(state)).toEqual(state);
      });

      test('state is defined and action is defined', () => {
        expect(reducer(state, action)).toEqual({
          ...state,
          list: { ...state.list, ...payload },
        });
      });
    });
  });
});
