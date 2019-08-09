import React from 'react';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

const valuetext = value => {
  return `${value}°C`;
};

const RangeInput = props => {
  const {
    isReadonly,
    name,
    displayValue,
    defaultValue,
    onChangeHandler
  } = props;
  const [value, setValue] = React.useState(30);
  const disabled = isReadonly ? { disabled: 'disabled' } : {};

  // const [value, setValue] = React.useState(30);
  //
  // const handleSliderChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  //
  const handleInputChange = e => {
    onChangeHandler(e, e.target.value);
    setValue(e.target.value);
  };
  //
  // const handleBlur = () => {
  //   if (value < 0) {
  //     setValue(0);
  //   } else if (value > 100) {
  //     setValue(100);
  //   }
  // };

  return (
    <div className="range-input">
      <Grid container spacing={2} alignItems="center">
        <Grid item sm={10}>
          <label htmlFor="trim">Potency</label>
          <Slider
            value={displayValue}
            defaultValue={defaultValue}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            inputProps={{
              step: 1,
              min: 1,
              max: 100,
              'aria-labelledby': 'discrete-slider'
            }}
            marks
            onChange={onChangeHandler}
            {...disabled}
          />
        </Grid>
        <Grid item sm={2}>
          <Input
            className={''}
            value={displayValue}
            margin="dense"
            onChange={handleInputChange}
            // onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider'
            }}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default RangeInput;
