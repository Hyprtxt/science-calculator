import React from 'react';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

const RangeInput = props => {
  const {
    // isReadonly,
    name,
    marks,
    unitLabel,
    // displayValue,
    defaultValue,
    onChangeHandler,
    maximumValue,
    minimumValue,
    stepValue
  } = props;
  const [value, setValue] = React.useState(30);
  // const disabled = isReadonly ? { disabled: 'disabled' } : {};

  const handleSliderChange = (e, newValue) => {
    setValue(newValue);
    onChangeHandler(newValue);
  };

  const handleInputChange = e => {
    setValue(e.target.value === '' ? '' : Number(e.target.value));
    onChangeHandler(e.target.value);
  };

  const handleBlur = () => {
    console.log(value, 'BLUR');
    setValue(previousValue => {
      if (previousValue < minimumValue) {
        return minimumValue;
      } else if (previousValue > maximumValue) {
        return maximumValue;
      }
    });
  };

  return (
    <div className="range-input">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={10}>
          <label htmlFor="trim">{name}</label>
          <Slider
            value={value}
            defaultValue={defaultValue}
            valueLabelDisplay="auto"
            marks={marks}
            onChange={handleSliderChange}
            step={stepValue}
            min={minimumValue}
            max={maximumValue}
            // {...disabled}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Input
            className={''}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
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
