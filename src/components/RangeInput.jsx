import React from 'react';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';

const RangeInput = props => {
  const {
    currentValue,
    name,
    marks,
    unitLabel,
    onChangeHandler,
    maximumValue,
    minimumValue,
    stepValue
  } = props;
  const [value, setValue] = React.useState(7);
  // console.log(value, onChangeHandler);
  // const disabled = isReadonly ? { disabled: 'disabled' } : {};
  // const debounce  = (newValue) => {
  //     value={value}
  // }
  // const updateParent = value => {
  //   // console.log('PARENT UPDATE BOUNCE SUCCESS');
  //   onChangeHandler(value);
  //   // updateParentDebounced.cancel();
  // };
  // const updateParentDebounced = _.debounce(updateParent, 1200);

  const updateComboSlider = newValue => {
    setValue(newValue);
  };

  const handleSliderChange = (e, newValue) => {
    setValue(newValue === '' ? '' : Number(newValue));
    onChangeHandler(newValue);
    // console.log('DEBOUNCE HERE');
    // updateParent(newValue);
  };

  const handleInputChange = e => {
    setValue(e.target.value === '' ? '' : Number(e.target.value));
    // _.debounce(() => {    }, 500);
    onChangeHandler(e.target.value);
  };

  const handleBlur = e => {
    // console.log('BLUR', e.target.value);

    setValue(
      previousValue => {
        if (previousValue < minimumValue) {
          return minimumValue;
        } else if (previousValue > maximumValue) {
          return maximumValue;
        }
      },
      () => {
        onChangeHandler(e.target.value);
      }
    );
  };

  return (
    <div className="range-input">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={10}>
          <label htmlFor="trim">{name}</label>
          <Slider
            name={`${name}-slider`}
            value={value}
            valueLabelDisplay="auto"
            marks={marks}
            onChange={handleSliderChange}
            step={stepValue}
            min={minimumValue}
            max={maximumValue}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Input
            name={`${name}-input`}
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
