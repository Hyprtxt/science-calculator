import React from 'react';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

const RangeInput = props => {
  const {
    value,
    name,
    marks,
    unitLabel,
    onChangeHandler,
    maximumValue,
    minimumValue,
    stepValue
  } = props;
  return (
    <div className="range-input">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={10}>
          <label htmlFor="trim">{name}</label>
          <Slider
            name={`${name}-slider`}
            value={Number(value) || 0}
            valueLabelDisplay="auto"
            marks={marks}
            onChange={(e, newValue) => {
              onChangeHandler(newValue, 'slider');
            }}
            step={stepValue}
            min={minimumValue}
            max={maximumValue}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Input
            name={`${name}-input`}
            className={''}
            value={Number(value) || 0}
            margin="dense"
            onChange={e => {
              onChangeHandler(Number(e.target.value), 'input');
            }}
            onBlur={e => {
              onChangeHandler(Number(e.target.value), 'input-blur');
            }}
            step={stepValue}
            min={minimumValue}
            max={maximumValue}
            type={'number'}
            aria-labelledby={'input-slider'}
            endAdornment={
              <InputAdornment position="end">{unitLabel}</InputAdornment>
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default RangeInput;
