import React from "react";

const ResetButton = props => {
  const { onClick, children } = props;
  return (
    <div className="clearfix">
      <button className="reset" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default ResetButton;
