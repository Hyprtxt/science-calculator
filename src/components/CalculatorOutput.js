import React from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import formatter from '../util/formatter';

const CalculatorOutput = props => {
  const { inputItem, inputItemPrice, outputItem, outputItemPrice } = props;

  return (
    <form
      className="outputs"
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <div>
        <label htmlFor="trim">
          Market Value of <strong>{outputItem}</strong>:{' '}
        </label>
        <Input
          className={''}
          value={formatter.format(outputItemPrice) || 0}
          margin="dense"
          type={'text'}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          readOnly
        />
      </div>
    </form>
  );
};

export default CalculatorOutput;
