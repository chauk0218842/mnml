/* global describe, test, beforeEach */

import reducer, { ACTION_ADD_PHOTOS, addPhotos } from '../photos';

describe('#photos', () => {
  describe('addPhotos', () => {
    let payload;
    beforeEach(() => {
      payload = [
        {
          albumId: 0,
          id: 0,
          title: 'Photo Zero',
          url: 'http://photos.io/assets/photo0.jpg',
          thumbnailUrl: 'http://photos.io/assets/photo_thumbnail0.jpg',
        },
        {
          albumId: 0,
          id: 1,
          title: 'Photo One',
          url: 'http://photos.io/assets/photo1.jpg',
          thumbnailUrl: 'http://photos.io/assets/photo_thumbnail1.jpg',
        },
        {
          albumId: 1,
          id: 2,
          title: 'Photo Two',
          url: 'http://photos.io/assets/photo2.jpg',
          thumbnailUrl: 'http://photos.io/assets/photo_thumbnail2.jpg',
        },
      ];
    });

    test('is a function', () => {
      expect(typeof addPhotos).toEqual('function');
    });

    describe('pass in photos', () => {
      test('photos is not defined', () => {
        expect(addPhotos()).toEqual({
          type: ACTION_ADD_PHOTOS,
          payload: [],
        });

        expect(addPhotos(null)).toEqual({
          type: ACTION_ADD_PHOTOS,
          payload: [],
        });
      });

      test('photos is defined', () => {
        expect(addPhotos([])).toEqual({
          type: ACTION_ADD_PHOTOS,
          payload: [],
        });

        expect(addPhotos(payload)).toEqual({
          type: ACTION_ADD_PHOTOS,
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
          albumId: 0,
          id: 0,
          title: 'Photo Zero',
          url: 'http://photos.io/assets/photo0.jpg',
          thumbnailUrl: 'http://photos.io/assets/photo_thumbnail0.jpg',
        },
        {
          albumId: 0,
          id: 1,
          title: 'Photo One',
          url: 'http://photos.io/assets/photo1.jpg',
          thumbnailUrl: 'http://photos.io/assets/photo_thumbnail1.jpg',
        },
        {
          albumId: 1,
          id: 2,
          title: 'Photo Two',
          url: 'http://photos.io/assets/photo2.jpg',
          thumbnailUrl: 'http://photos.io/assets/photo_thumbnail2.jpg',
        },
      ];

      payload = [
        {
          albumId: 1,
          id: 3,
          title: 'Photo Three',
          url: 'http://photos.io/assets/photo3.jpg',
          thumbnailUrl: 'http://photos.io/assets/photo_thumbnail3.jpg',
        },
        {
          albumId: 1,
          id: 4,
          title: 'Photo Four',
          url: 'http://photos.io/assets/photo4.jpg',
          thumbnailUrl: 'http://photos.io/assets/photo_thumbnail4.jpg',
        },
        {
          albumId: 0,
          id: 2,
          title: 'Photo Five',
          url: 'http://photos.io/assets/photo5.jpg',
          thumbnailUrl: 'http://photos.io/assets/photo_thumbnail5.jpg',
        },
      ];

      action = {
        type: ACTION_ADD_PHOTOS,
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
