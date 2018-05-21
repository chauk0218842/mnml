import _ from 'lodash';
import axios from 'axios';

import {
  API_GET_USERS,
  API_GET_ALBUMS_BY_USERID,
  API_GET_PHOTOS_BY_ALBUMID,
} from './constants';

/**
 * API success handler - axios.get success wrapper
 * @param status
 * @param statusText
 * @param data
 * @returns {*}
 */
export const apiSuccessHandler = ({ status, statusText, data } = {}) => {
  if (status === 200) {
    return data;
  }

  throw new Error(status, statusText);
};

/**
 * API error handler - axios error wrapper
 * @param error
 */
export const apiErrorHandler = error =>
  console.error('API server error', error);

const getFromApi = url =>
  axios
    .get(url)
    .then(apiSuccessHandler)
    .catch(apiErrorHandler);

/**
 * Fetch users from a given end point
 * @returns {Promise.<string>}
 */
const getUsers = () =>
  getFromApi(API_GET_USERS).then(data =>
    _.reduce(
      data,
      (results, { id, name }) => ({
        ...results,
        [id]: { id, name },
      }),
      {}
    )
  );

/**
 * Fetch albums by user id
 * @param userId
 */
const getAlbumsByUserId = userId =>
  getFromApi(API_GET_ALBUMS_BY_USERID(userId)).then(data =>
    _.reduce(
      data,
      (results, { id, title, userId }) => ({
        ...results,
        [id]: { id, title, userId },
      }),
      {}
    )
  );

/**
 * Fetch photos by album id
 * @param albumId
 */
const getPhotosFromAlbumId = albumId =>
  getFromApi(API_GET_PHOTOS_BY_ALBUMID(albumId)).then(data =>
    _.reduce(
      data,
      (results, { albumId, id, thumbnailUrl, title, url }) => ({
        ...results,
        [id]: { albumId, id, thumbnailUrl, title, url },
      }),
      {}
    )
  );

const resources = {
  getUsers,
  getAlbumsByUserId,
  getPhotosFromAlbumId,
};

export default resources;
