/* global describe, test, beforeEach */

import reducer, {
  ACTION_SELECT_ALBUM,
  ACTION_UPDATE_ALBUMS,
  selectAlbum,
  updateAlbums,
} from '../albums';

describe('#albums', () => {
  describe('selectAlbum', () => {
    test('is a function', () => {
      expect(typeof selectAlbum).toEqual('function');
    });

    describe('pass in albumId', () => {
      test('albumId is not defined', () => {
        expect(selectAlbum()).toEqual({
          type: ACTION_SELECT_ALBUM,
          payload: null,
        });

        expect(selectAlbum(null)).toEqual({
          type: ACTION_SELECT_ALBUM,
          payload: null,
        });
      });

      test('albumId is defined', () => {
        expect(selectAlbum(-168)).toEqual({
          type: ACTION_SELECT_ALBUM,
          payload: -168,
        });

        expect(selectAlbum(168)).toEqual({
          type: ACTION_SELECT_ALBUM,
          payload: 168,
        });

        expect(selectAlbum('ONE-SIXTY-EIGHT')).toEqual({
          type: ACTION_SELECT_ALBUM,
          payload: 'ONE-SIXTY-EIGHT',
        });
      });
    });
  });

  describe('updateAlbums', () => {
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
      expect(typeof updateAlbums).toEqual('function');
    });

    describe('pass in albums', () => {
      test('albums is not defined', () => {
        expect(updateAlbums()).toEqual({
          type: ACTION_UPDATE_ALBUMS,
          payload: {},
        });

        expect(updateAlbums(null)).toEqual({
          type: ACTION_UPDATE_ALBUMS,
          payload: {},
        });
      });

      test('albums is defined', () => {
        expect(updateAlbums({})).toEqual({
          type: ACTION_UPDATE_ALBUMS,
          payload: {},
        });

        expect(updateAlbums(payload)).toEqual({
          type: ACTION_UPDATE_ALBUMS,
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
        type: ACTION_UPDATE_ALBUMS,
        payload,
      };
    });

    test('is a function', () => {
      expect(typeof reducer).toEqual('function');
    });

    describe('pass in state', () => {
      test('state is not defined', () => {
        expect(reducer()).toEqual({
          list: {},
          selectedAlbumId: null,
        });
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
          list: { ...state, ...payload },
        });
      });
    });
  });
});
