import React from 'react';

const Hide = props => {
  const { children } = props;
  return <div style={{ display: 'none' }}>{children}</div>;
};

export default Hide;
