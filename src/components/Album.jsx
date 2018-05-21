import PropTypes from 'prop-types';
import React from 'react';

const Album = ({ children, className, id, onClickAlbum, title }) => (
  <div className={className} onClick={() => onClickAlbum(id)}>
    {children || title}
  </div>
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
