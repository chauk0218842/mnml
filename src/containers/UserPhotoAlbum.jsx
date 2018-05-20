import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, mapProps } from 'recompose';
import styled from 'styled-components';

import resources from '../resources/resources';
import { actions } from '../redux/redux';

import _Album from '../components/Album';
import _Photo, { Thumbnail, Title } from '../components/Photo';
import _User from '../components/User';

const Container = styled.div`
  align-items: center;
  background: #ccc;
  display: flex;
  font-family: sans-serif;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
  width: 100%;
`;

const User = styled(_User)`
  background: ${props => (props.selected ? '#888' : 'none')}
  border-bottom: 2px solid #000;
  padding: 0.5rem 1rem;
`;

const Users = styled.div`
  border: 2px solid #000;
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 200px;
  overflow: auto;
`;

const Album = styled(_Album)`
  background: ${props => (props.selected ? '#888' : 'none')}
  border-bottom: 2px solid #000;
  padding: 0.5rem 1rem;
`;

const Albums = styled.div`
  border: 2px solid #000;
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 200px;
  overflow: auto;

  ${Album}: last-child {
    border: 0;
  }
`;

const Photo = styled(_Photo)`
  border-bottom: 2px solid #000;
`;

const Photos = styled.div`
  border: 2px solid #000;
  height: 500px;
  width: 200px;
  overflow: auto;

  ${Photo} {
    ${Thumbnail} {
      width: 100%;
    }

    ${Title} {
      padding: 0.5rem 1rem;
    }

    &:last-child {
      border: 0;
    }
  }
`;

const UserPhotoAlbum = compose(
  connect(
    ({ albums, photos, users }) => ({
      albums: _.pickBy(
        albums.list,
        ({ userId }) => userId === users.selectedUserId
      ),
      photos,
      users: users.list,
      selectedAlbumId: albums.selectedAlbumId,
      selectedUserId: users.selectedUserId,
    }),
    dispatch => ({
      fetchUsers() {
        resources
          .getUsers()
          .then(users => dispatch(actions.updateUsers(users)));
      },
      onClickAlbum(albumId) {
        dispatch(actions.selectAlbum(albumId));
        resources
          .getPhotosFromAlbumId(albumId)
          .then(photos => dispatch(actions.updatePhotos(photos)));
      },
      onClickUser(userId) {
        dispatch(actions.selectUser(userId));
        dispatch(actions.selectAlbum());
        resources
          .getAlbumsByUserId(userId)
          .then(albums => dispatch(actions.updateAlbums(albums)));
      },
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchUsers();
    },
  }),
  mapProps(
    ({
      albums,
      onClickAlbum,
      onClickUser,
      photos,
      selectedAlbumId,
      selectedUserId,
      users,
    }) => ({
      albums: _.chain(albums)
        .map((album, index) => (
          <Album
            key={`album_${index}`}
            onClickAlbum={() => onClickAlbum(album.id)}
            selected={album.id === selectedAlbumId}
            {...album}
          />
        ))
        .thru(
          children => (!!_.size(children) ? <Albums>{children}</Albums> : null)
        )
        .value(),
      photos: _.chain(photos)
        .map((photo, index) => <Photo key={`photo_${index}`} {...photo} />)
        .thru(
          children => (!!_.size(children) ? <Photos>{children}</Photos> : null)
        )
        .value(),
      users: _.chain(users)
        .map((user, index) => (
          <User
            key={`user_${index}`}
            onClickUser={() => onClickUser(user.id)}
            selected={user.id === selectedUserId}
            {...user}
          />
        ))
        .thru(
          children => (!!_.size(children) ? <Users>{children}</Users> : null)
        )
        .value(),
    })
  )
)(({ albums, className, photos, users }) => (
  <Container className={className}>
    {users}
    {albums}
    {photos}
  </Container>
));

export default UserPhotoAlbum;
