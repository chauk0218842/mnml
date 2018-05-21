import { createStore, combineReducers } from 'redux';
import reducers, { actions } from '../redux';

describe('#reducers', () => {
  describe('reducer', () => {
    let store;

    beforeEach(() => {
      store = createStore(reducers);
    });

    test('is a function', () => {
      expect(typeof reducers).toEqual('function');
    });

    test('contains only these states', () => {
      expect(store.getState()).toEqual({
        albums: {
          list: {},
          selectedAlbumId: null,
        },
        photos: {
          list: {},
          selectedPhotoId: null,
        },
        users: {
          list: {},
          selectedUserId: null,
        },
      });
    });

    describe('smoke test child reducers', () => {
      test('updateAlbums', () => {
        store.dispatch(
          actions.updateAlbums({
            1: { id: 1 },
            2: { id: 2 },
            3: { id: 3 },
          })
        );
        expect(store.getState().albums).toEqual({
          list: {
            1: { id: 1 },
            2: { id: 2 },
            3: { id: 3 },
          },
          selectedAlbumId: null,
        });
      });

      test('updatePhotos', () => {
        store.dispatch(
          actions.updatePhotos({ 1: { id: 1 }, 2: { id: 2 }, 3: { id: 3 } })
        );
        expect(store.getState().photos).toEqual({
          list: {
            1: { id: 1 },
            2: { id: 2 },
            3: { id: 3 },
          },
          selectedPhotoId: null,
        });
      });

      test('updateUsers', () => {
        store.dispatch(
          actions.updateUsers({
            1: { id: 1, name: 'Name One' },
            2: { id: 2, name: 'Name Two' },
            3: { id: 3, name: 'Name Three' },
          })
        );

        expect(store.getState().users).toEqual({
          list: {
            1: { id: 1, name: 'Name One' },
            2: { id: 2, name: 'Name Two' },
            3: { id: 3, name: 'Name Three' },
          },
          selectedUserId: null,
        });
      });
    });
  });
});
