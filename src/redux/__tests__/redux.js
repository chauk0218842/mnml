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
        albums: [],
        photos: [],
        users: [],
      });
    });

    describe('smoke test child reducers', () => {
      test('addAlbums', () => {
        store.dispatch(actions.addAlbums([1, 2, 3]));
        expect(store.getState().albums).toEqual([1, 2, 3]);
      });

      test('addPhotos', () => {
        store.dispatch(actions.addPhotos([1, 2, 3]));
        expect(store.getState().photos).toEqual([1, 2, 3]);
      });

      test('addUsers', () => {
        store.dispatch(actions.addUsers([1, 2, 3]));
        expect(store.getState().users).toEqual([1, 2, 3]);
      });
    });
  });
});
