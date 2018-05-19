import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;
const Thumbnail = styled.img``;
const Title = styled.div``;

const Photo = ({ id, onClickPhoto, onLoadPhoto, thumbnailUrl, title, url }) => (
  <Wrapper>
    <Thumbnail
      alt={title}
      src={thumbnailUrl}
      onClick={() => onClickPhoto(url)}
    />
    <Title>{title}</Title>
  </Wrapper>
);

Photo.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClickPhoto: PropTypes.func,
  thumbnailUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  url: PropTypes.string.isRequired,
};

Photo.defaultProps = {
  onClickPhoto: url => console.log('Photo > onClickPhoto', url),
};

export default Photo;
