import React from "react";
const Inspector = props => {
  const data = props.data;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
export default Inspector;
