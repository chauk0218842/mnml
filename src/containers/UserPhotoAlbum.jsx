import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import {
  compose,
  lifecycle,
  mapProps,
  withProps,
  withHandlers,
  withState,
} from 'recompose';
import styled from 'styled-components';

import _Menu from '../components/Menu';
import _Album from '../components/Album';
import _Introduction, { Button, Quote } from '../components/Introduction';
import _Photo, { Thumbnail, Title } from '../components/Photo';
import _User from '../components/User';
import resources from '../resources/resources';
import { actions } from '../redux/redux';

const FlexRow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  font-family: sans-serif;
  height: 100%;
  width: 100%;
`;

const Menu = styled(_Menu)`
  align-items: center;
  box-shadow: -1px 0px 10px #263238;
  background: #263238;
  color: #ddd;
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.5rem;
  height: 5rem;
  padding-left: 3.5rem;
  position: absolute;
  text-transform: uppercase;
  top: 0;
  width: 100%;
  z-index: 10000;

  button {
    background: transparent;
    border: 0;
    color: #ddd;
    font-family: 'Roboto', sans-serif;
    font-size: 1.1rem;
    letter-spacing: 0.5rem;
    margin-left: 0.5rem;
    padding: 0;
    text-transform: uppercase;

    &:focus {
      outline: 0;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-top: 5rem;
`;

const Introduction = styled(_Introduction)`
  background: #fff176;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.3rem;
  letter-spacing: 0.05rem;
  height: calc(100% - 5.0rem);
  overflow: auto
  padding: 1.5rem 4.0rem 1.5rem 3.0rem;;
  width: 100%;
  
  ${Button} {
    background: none;
    border: 2px solid #000;
    font-family: 'Roboto', sans-serif;
    margin: 7.0rem 0;
    padding: 1.0rem 2.0rem;
    text-transform: uppercase;
    
    &:focus { 
      outline: 0; 
    }
  }
  
  ${Quote} {
    font-size: 2.0rem;
    font-style: italic;
    margin: 3.0rem 0;
  }
  
  h1 {
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
  }
  
  p {
    margin-left: 3.0rem;
  }
  
  hr {
    border: none;
  }
  
  ul {
    list-style-type: square;
    margin-left: 1.0rem;
  }
`;

const User = styled(_User)`
  background: ${props => (props.selected ? '#888' : '#F8F8F8')}
  border-bottom: 1px solid #E1E2E1;
  padding: 1.5rem 4.0rem 1.5rem 3.0rem;
  
  &:hover {
    background: #E1E2E1;
    cursor: pointer;
  }
`;

const Users = styled.div`
  background: #fff;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  letter-spacing: 0.05rem;
  height: calc(100% - 5rem);
  overflow: auto;
  text-transform: uppercase;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

const Album = styled(_Album)`
  background: ${props => (props.selected ? '#888' : '#F8F8F8')}
  border-bottom: 1px solid #E1E2E1;
  padding: 1.5rem 4.0rem 1.5rem 3.0rem;
  
  &:hover {
    background: #E1E2E1;
    cursor: pointer;
  }
`;

const Albums = styled.div`
  background: #fff;
  display: flex;
  font-family: 'Roboto', sans-serif;
  flex: 1 1 auto;
  flex-direction: column;
  height: calc(100% - 5rem);
  overflow: auto;
  position: absolute;
  text-transform: uppercase;
  width: 100%;
  z-index: 2;
`;

const Photo = styled(_Photo)`
  margin-bottom: 3rem;
`;

const Photos = styled.div`
  background: #f5f5f6;
  flex: 1 1 auto;
  height: calc(100% - 5rem);
  overflow: auto;
  position: absolute;
  width: 100%;
  z-index: 3;

  ${Photo} {
    display: flex;
    flex-direction: column;

    ${Thumbnail} {
      width: 100%;
    }

    ${Title} {
      font-family: 'Open Sans', sans-serif;
      font-size: 1.3rem;
      padding: 2rem 3rem 1rem 3rem;
      text-transform: capitalize;
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
      photos: _.pickBy(
        photos.list,
        ({ albumId }) => albumId === albums.selectedAlbumId
      ),
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
      onClickHome() {
        dispatch(actions.selectAlbum());
        dispatch(actions.selectUser());
      },
      onClickUser(userId) {
        dispatch(actions.selectAlbum());
        dispatch(actions.selectUser(userId));
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
  withState('isRoot', 'onClickMenu', true),
  withHandlers({
    onClickMenu: ({ isRoot, onClickMenu }) => () => onClickMenu(!isRoot),
  }),
  withProps(
    ({
      isRoot,
      onClickAlbum,
      onClickHome,
      onClickMenu,
      onClickUser,
      selectedAlbumId,
      selectedUserId,
    }) => {
      return {
        introduction: (
          <Introduction
            onClickGetStarted={() => onClickMenu() && onClickHome()}
          />
        ),
        menu: _.chain([])
          .thru(list => {
            if (!isRoot) {
              list = list.concat({
                displayName: 'Usrs',
                name: 'users',
                onClickEvent: onClickHome,
              });
            }

            if (selectedUserId) {
              list = list.concat({
                displayName: 'Albms',
                name: 'albums',
                onClickEvent: () => onClickUser(selectedUserId),
              });
            }

            if (selectedAlbumId) {
              list = list.concat({
                displayName: 'Phtos',
                name: 'photos',
                onClickEvent: () => onClickAlbum(selectedAlbumId),
              });
            }

            return list;
          })
          .map(({ displayName, onClickEvent }, index) => (
            <button key={`menu_${index}`} onClick={onClickEvent}>
              {' '}
              &gt;{displayName}
            </button>
          ))
          .thru(items => (
            <div>
              <button onClick={onClickMenu}>MNML</button>
              {items}.
            </div>
          ))
          .value(),
      };
    }
  ),
  mapProps(props => {
    const {
      albums,
      isRoot,
      onClickAlbum,
      onClickUser,
      photos,
      selectedAlbumId,
      selectedUserId,
      users,
    } = props;

    if (isRoot) {
      return {
        ...props,
        albums: null,
        photos: null,
        users: null,
      };
    }

    return {
      ...props,
      albums: _.chain(albums)
        .map((album, index) => (
          <Album
            key={`album_${index}`}
            onClickAlbum={() => onClickAlbum(album.id)}
            selected={album.id === selectedAlbumId}
            {...album}
          >
            <FlexRow>{album.title}</FlexRow>
          </Album>
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
          >
            <FlexRow>{user.name}</FlexRow>
          </User>
        ))
        .thru(
          children => (!!_.size(children) ? <Users>{children}</Users> : null)
        )
        .value(),
    };
  })
)(
  ({
    albums,
    className,
    introduction,
    menu,
    photos,
    selectedAlbumId,
    selectedUserId,
    users,
  }) => (
    <Container className={className}>
      <Menu>{menu}</Menu>
      <Content>
        {introduction}
        {users}
        {albums}
        {photos}
      </Content>
    </Container>
  )
);

export default UserPhotoAlbum;
