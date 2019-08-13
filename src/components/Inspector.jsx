import React from 'react';

const Inspector = props => {
  const { data, disable } = props;
  // console.log(process.env, 'inspector');
  if (process.env.NODE_ENV === 'development') {
    if (!disable) {
      return <pre>{JSON.stringify(data, null, 2)}</pre>;
    }
  }
  return <React.Fragment />;
};
export default Inspector;
