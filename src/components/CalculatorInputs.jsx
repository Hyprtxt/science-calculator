import React from 'react';
import RangeInput from 'components/RangeInput';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import formatter from 'util/formatter';
import PropTypes from 'prop-types';

const CalculatorInputs = props => {
  const {
    inputItem,
    inputItemPrice,
    inputValues,
    inputDefaults,
    onAmountChange,
    onPotencyChange,
    currentInputType,
    potency
  } = props;
  const {
    weightMin,
    weightMax,
    weightMarks,
    weightStep,
    potMin,
    potMax,
    potMarks,
    potencyStep
  } = inputDefaults;

  // console.log("WeightInput", currentInputType);
  const className = 'weight-input';
  let theHelperText;
  //  = <h1>NOTHING</h1>;
  if (currentInputType === 'grams') {
    theHelperText = '\u00A0g.';
  }
  if (currentInputType === 'units') {
    theHelperText = '\u00A0carts.';
  }
  if (currentInputType === 'pounds') {
    theHelperText = '\u00A0lbs.';
  }
  if (currentInputType !== undefined) {
    let rangeInputActivated = true;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div className={className}>
          <RangeInput
            isReadonly={false}
            name={currentInputType}
            value={inputValues[currentInputType]}
            minimumValue={weightMin}
            maximumValue={weightMax}
            stepValue={weightStep || 1}
            onChangeHandler={(value, source) => {
              onAmountChange(value, source, currentInputType);
            }}
            marks={weightMarks}
            unitLabel={theHelperText}
          />
        </div>

        <RangeInput
          isReadonly={!rangeInputActivated}
          name="potency"
          value={potency}
          onChangeHandler={onPotencyChange}
          marks={potMarks}
          unitLabel={'%'}
          stepValue={potencyStep || 1}
          minimumValue={potMin}
          maximumValue={potMax}
        />

        <div>
          <label htmlFor="trim">
            Market Value of <strong>{inputItem}</strong>:{' '}
          </label>
          <Input
            className={''}
            value={formatter.format(inputItemPrice) || 0}
            margin="dense"
            type={'text'}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            readOnly
          />
        </div>
      </form>
    );
  } else {
    return <div className={className}>{theHelperText}</div>;
  }
};

CalculatorInputs.defaultProps = {
  inputDefaults: {
    weightMax: 100,
    weightMin: 0,
    weightDefault: 50,
    weightMarks: [],
    potMax: 100,
    potMin: 0,
    potencyDefault: 50,
    potMarks: []
  }
};

CalculatorInputs.propTypes = {
  inputDefaults: PropTypes.shape({
    weightMax: PropTypes.number,
    weightMin: PropTypes.number,
    potMax: PropTypes.number,
    potMin: PropTypes.number
  })
};
export default CalculatorInputs;
