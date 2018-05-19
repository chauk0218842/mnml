/* global describe, test, beforeEach */

import reducer, { ACTION_ADD_USERS, addUsers } from '../users';

describe('#users', () => {
  describe('addUsers', () => {
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
      expect(typeof addUsers).toEqual('function');
    });

    describe('pass in users', () => {
      test('users is not defined', () => {
        expect(addUsers()).toEqual({
          type: ACTION_ADD_USERS,
          payload: [],
        });

        expect(addUsers(null)).toEqual({
          type: ACTION_ADD_USERS,
          payload: [],
        });
      });

      test('users is defined', () => {
        expect(addUsers([])).toEqual({
          type: ACTION_ADD_USERS,
          payload: [],
        });

        expect(addUsers(payload)).toEqual({
          type: ACTION_ADD_USERS,
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
      state = [
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
        type: ACTION_ADD_USERS,
        payload,
      };
    });

    test('is a function', () => {
      expect(typeof reducer).toEqual('function');
    });

    describe('pass in state', () => {
      test('state is not defined', () => {
        expect(reducer()).toEqual([]);
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
        expect(reducer(state, action)).toEqual([...state, ...payload]);
      });
    });
  });
});
