import React from 'react';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

const valuetext = value => {
  return `${value}°C`;
};

const marks = [
  {
    value: 0,
    label: '0%'
  },
  {
    value: 20,
    label: '20%'
  },
  {
    value: 40,
    label: '40%'
  },
  {
    value: 60,
    label: '60%'
  },
  {
    value: 80,
    label: '80%'
  },
  {
    value: 100,
    label: '100%'
  }
];

const RangeInput = props => {
  const {
    isReadonly,
    // name,
    displayValue,
    defaultValue,
    onChangeHandler
  } = props;
  const [value, setValue] = React.useState(30);
  const disabled = isReadonly ? { disabled: 'disabled' } : {};

  // const [value, setValue] = React.useState(30);
  //
  const handleSliderChange = (e, newValue) => {
    setValue(newValue);
    onChangeHandler(e, newValue);
  };
  const handleInputChange = e => {
    setValue(e.target.value === '' ? '' : Number(e.target.value));
    onChangeHandler(e, e.target.value);
  };

  const handleBlur = () => {
    console.log(value, 'BLUR');
    setValue(previousValue => {
      if (previousValue < 0) {
        return 0;
      } else if (previousValue > 100) {
        return 100;
      }
    });
  };

  return (
    <div className="range-input">
      <Grid container spacing={2} alignItems="center">
        <Grid item sm={10}>
          <label htmlFor="trim">Potency</label>
          <Slider
            value={value}
            defaultValue={defaultValue}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            marks={marks}
            onChange={handleSliderChange}
            // {...disabled}
          />
        </Grid>
        <Grid item sm={2}>
          <Input
            className={''}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            step={1}
            min={1}
            max={100}
            type={'number'}
            aria-labelledby={'input-slider'}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default RangeInput;
