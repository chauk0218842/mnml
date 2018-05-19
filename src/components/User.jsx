import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const User = ({ id, name, onClickUser }) => (
  <Wrapper onClick={() => onClickUser(id)}>{name}</Wrapper>
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
