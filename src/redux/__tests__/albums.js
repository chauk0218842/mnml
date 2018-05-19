/* global describe, test, beforeEach */

import reducer, { ACTION_ADD_ALBUMS, addAlbums } from '../albums';

describe('#albums', () => {
  describe('addAlbums', () => {
    let payload;
    beforeEach(() => {
      payload = [
        {
          id: 0,
          title: 'Album Title Zero',
          userId: 0,
        },
        {
          id: 1,
          title: 'Album Title One',
          userId: 1,
        },
        {
          id: 2,
          title: 'Album Title Two',
          userId: 1,
        },
      ];
    });

    test('is a function', () => {
      expect(typeof addAlbums).toEqual('function');
    });

    describe('pass in albums', () => {
      test('albums is not defined', () => {
        expect(addAlbums()).toEqual({
          type: ACTION_ADD_ALBUMS,
          payload: [],
        });

        expect(addAlbums(null)).toEqual({
          type: ACTION_ADD_ALBUMS,
          payload: [],
        });
      });

      test('albums is defined', () => {
        expect(addAlbums([])).toEqual({
          type: ACTION_ADD_ALBUMS,
          payload: [],
        });

        expect(addAlbums(payload)).toEqual({
          type: ACTION_ADD_ALBUMS,
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
          title: 'Album Title Zero',
          userId: 0,
        },
        {
          id: 1,
          title: 'Album Title One',
          userId: 1,
        },
        {
          id: 2,
          title: 'Album Title Two',
          userId: 1,
        },
      ];

      payload = [
        {
          id: 3,
          title: 'Album Title One',
          userId: 0,
        },
        {
          id: 4,
          title: 'Album Title Three',
          userId: 1,
        },
        {
          id: 5,
          title: 'Album Title Four',
          userId: 1,
        },
        {
          id: 6,
          title: 'Album Title Two',
          userId: 0,
        },
      ];

      action = {
        type: ACTION_ADD_ALBUMS,
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
