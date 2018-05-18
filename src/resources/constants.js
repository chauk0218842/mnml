export const API_SERVER = 'https://jsonplaceholder.typicode.com';
export const API_GET_USERS = `${API_SERVER}/users`;
export const API_GET_ALBUMS_BY_USERID = userId =>
  `${API_SERVER}/albums?userId=${userId}`;
export const API_GET_PHOTOS_BY_ALBUMID = albumId =>
  `${API_SERVER}/photos?albumId=${albumId}`;
