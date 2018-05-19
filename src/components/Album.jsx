import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Album = ({ id, onClickAlbum, title }) => (
  <Wrapper onClick={() => onClickAlbum(id)}>{title}</Wrapper>
);

Album.propTypes = {
  onClickAlbum: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
};

Album.defaultProps = {
  onClickAlbum: id => console.log('Album > onClickAlbum', id),
};

export default Album;
