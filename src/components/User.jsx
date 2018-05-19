import PropTypes from 'prop-types';
import React from 'react';

const User = ({ className, id, name, onClickUser }) => (
  <div className={className} onClick={() => onClickUser(id)}>
    {name}
  </div>
);

User.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  onClickUser: PropTypes.func,
};

User.defaultProps = {
  onClickUser: id => console.log('User > onClickUser', id),
};

export default User;
