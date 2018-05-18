/* global describe, test, beforeEach */

import _ from 'lodash';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import resources, { apiSuccessHandler, apiErrorHandler } from '../index';
import { API_SERVER } from '../constants';

global.console.error = jest.fn();

describe('#index', () => {
  describe('apiSuccessHandler', () => {
    test('is a function', () => {
      expect(typeof apiSuccessHandler).toEqual('function');
    });

    describe('pass in an object with a status property', () => {
      test('should not throw an error when status is 200', () => {
        expect(apiSuccessHandler({ status: 200 })).toEqual(undefined);
      });

      test('should throw an error when status is not 200', () => {
        expect(() => apiSuccessHandler({ status: 503 })).toThrow('503');
        expect(() =>
          apiSuccessHandler({
            status: 503,
            statuText: 'Service Unavailable',
          })
        ).toThrow('503', 'Service Unavailable');
      });
    });
  });

  describe('apiErrorHandler', () => {
    beforeEach(() => {
      global.console.error.mockReset();
    });

    test('it is a function', () => {
      expect(typeof apiErrorHandler).toEqual('function');
    });

    describe('pass in an object', () => {
      apiErrorHandler(new Error(503, 'Service Unavailable'));
      expect(global.console.error.mock.calls.length).toEqual(1);
      expect(global.console.error.mock.calls[0][0]).toEqual('API server error');
      expect(global.console.error.mock.calls[0][1]).toEqual(
        new Error(503, 'Service Unavailable')
      );
    });
  });

  describe('resources', () => {
    let getUsersResponse;
    let getAlbumsByUserIdTwoResponse;
    let getPhotosFromAlbumIdThreeResponse;
    let nockServer;

    beforeEach(() => {
      require('axios').default.host = API_SERVER;
      require('axios').defaults.adapter = httpAdapter;

      nockServer = nock(API_SERVER);

      getUsersResponse = [
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
          address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
              lat: '-37.3159',
              lng: '81.1496',
            },
          },
          phone: '1-770-736-8031 x56442',
          website: 'hildegard.org',
          company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets',
          },
        },
        {
          id: 2,
          name: 'Ervin Howell',
          username: 'Antonette',
          email: 'Shanna@melissa.tv',
          address: {
            street: 'Victor Plains',
            suite: 'Suite 879',
            city: 'Wisokyburgh',
            zipcode: '90566-7771',
            geo: {
              lat: '-43.9509',
              lng: '-34.4618',
            },
          },
          phone: '010-692-6593 x09125',
          website: 'anastasia.net',
          company: {
            name: 'Deckow-Crist',
            catchPhrase: 'Proactive didactic contingency',
            bs: 'synergize scalable supply-chains',
          },
        },
      ];

      getAlbumsByUserIdTwoResponse = [
        {
          userId: 2,
          id: 11,
          title: 'quam nostrum impedit mollitia quod et dolor',
        },
        {
          userId: 2,
          id: 12,
          title: 'consequatur autem doloribus natus consectetur',
        },
        {
          userId: 2,
          id: 13,
          title: 'ab rerum non rerum consequatur ut ea unde',
        },
        {
          userId: 2,
          id: 14,
          title: 'ducimus molestias eos animi atque nihil',
        },
      ];

      getPhotosFromAlbumIdThreeResponse = [
        {
          albumId: 3,
          id: 101,
          title: 'incidunt alias vel enim',
          url: 'http://placehold.it/600/e743b',
          thumbnailUrl: 'http://placehold.it/150/e743b',
        },
        {
          albumId: 3,
          id: 102,
          title:
            'eaque iste corporis tempora vero distinctio consequuntur nisi nesciunt',
          url: 'http://placehold.it/600/a393af',
          thumbnailUrl: 'http://placehold.it/150/a393af',
        },
        {
          albumId: 3,
          id: 103,
          title: 'et eius nisi in ut reprehenderit labore eum',
          url: 'http://placehold.it/600/35cedf',
          thumbnailUrl: 'http://placehold.it/150/35cedf',
        },
        {
          albumId: 3,
          id: 104,
          title: 'et natus vero quia totam aut et minima',
          url: 'http://placehold.it/600/313b40',
          thumbnailUrl: 'http://placehold.it/150/313b40',
        },
      ];
    });

    describe('resources.getUsers', () => {
      expect(typeof resources.getUsers).toEqual('function');

      test('return a data payload', () => {
        nockServer.get('/users').reply(200, getUsersResponse);

        return expect(resources.getUsers()).resolves.toEqual(
          _.map(getUsersResponse, ['id', 'name'])
        );
      });
    });

    describe('resources.getAlbumsByUserId', () => {
      expect(typeof resources.getAlbumsByUserId).toEqual('function');

      test('return a data payload', () => {
        nockServer
          .get('/albums?userId=2')
          .reply(200, getAlbumsByUserIdTwoResponse);

        return expect(resources.getAlbumsByUserId(2)).resolves.toEqual(
          _.map(getAlbumsByUserIdTwoResponse, ['id', 'title'])
        );
      });
    });

    describe('resources.getPhotosFromAlbumId', () => {
      expect(typeof resources.getPhotosFromAlbumId).toEqual('function');

      test('return a data payload', () => {
        nockServer
          .get('/photos?albumId=3')
          .reply(200, getPhotosFromAlbumIdThreeResponse);

        return expect(resources.getPhotosFromAlbumId(3)).resolves.toEqual(
          _.map(getPhotosFromAlbumIdThreeResponse, [
            'id',
            'url',
            'thumbnailUrl',
            'title',
          ])
        );
      });
    });
  });
});
