/* global describe, test */

import {
  API_SERVER,
  API_GET_USERS,
  API_GET_ALBUMS_BY_USERID,
  API_GET_PHOTOS_BY_ALBUMID,
} from '../constants';

describe('#constants', () => {
  describe('API_SERVER', () => {
    test('is a string', () => {
      expect(API_SERVER).toEqual('https://jsonplaceholder.typicode.com');
    });
  });

  describe('API_GET_USERS', () => {
    test('is a string', () => {
      expect(API_GET_USERS).toEqual(
        'https://jsonplaceholder.typicode.com/users'
      );
    });
  });

  describe('API_GET_ALBUMS_BY_USERID', () => {
    test('is a function', () => {
      expect(typeof API_GET_ALBUMS_BY_USERID).toEqual('function');
    });

    test('return a string', () => {
      expect(API_GET_ALBUMS_BY_USERID()).toEqual(
        'https://jsonplaceholder.typicode.com/albums?userId=undefined'
      );
      expect(API_GET_ALBUMS_BY_USERID('some-user-id')).toEqual(
        'https://jsonplaceholder.typicode.com/albums?userId=some-user-id'
      );
    });
  });

  describe('API_GET_PHOTOS_BY_ALBUMID', () => {
    test('is a function', () => {
      expect(typeof API_GET_PHOTOS_BY_ALBUMID).toEqual('function');
    });

    test('return a string', () => {
      expect(API_GET_PHOTOS_BY_ALBUMID()).toEqual(
        'https://jsonplaceholder.typicode.com/photos?albumId=undefined'
      );
      expect(API_GET_PHOTOS_BY_ALBUMID('some-album-id')).toEqual(
        'https://jsonplaceholder.typicode.com/photos?albumId=some-album-id'
      );
    });
  });
});
