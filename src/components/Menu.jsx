import React from 'react';

const Menu = ({ className, children, title }) => (
  <div className={className}>{children || title}</div>
);

export default Menu;
