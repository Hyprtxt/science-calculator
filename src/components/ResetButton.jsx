import React from 'react';
import Button from '@material-ui/core/Button';

const ResetButton = props => {
  const { onClick, children } = props;
  return (
    <div className="clearfix">
      <Button
        variant="contained"
        color="primary"
        className="reset"
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
};

export default ResetButton;
