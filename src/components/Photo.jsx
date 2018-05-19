import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

export const Thumbnail = styled.img``;
export const Title = styled.div``;

const Photo = ({
  className,
  id,
  onClickPhoto,
  onLoadPhoto,
  thumbnailUrl,
  title,
  url,
}) => (
  <div className={className}>
    <Thumbnail
      alt={title}
      src={thumbnailUrl}
      onClick={() => onClickPhoto(url)}
    />
    <Title>{title}</Title>
  </div>
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
