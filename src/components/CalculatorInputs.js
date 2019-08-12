import React from 'react';
import RangeInput from './RangeInput';
import WeightInput from './WeightInput';
import PropTypes from 'prop-types';

const potencyMarks = [
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

const CalculatorInputs = props => {
  const {
    inputItem,
    currentInputType,
    inputDefaults,
    potency,
    onAmountChange,
    onPotencyChange
  } = props;
  // <h2>{`currentInputType:${currentInputType} potency:${potency}`}</h2>
  let rangeInputActivated = true;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <WeightInput
        onAmountChange={onAmountChange}
        currentInputType={currentInputType}
        inputItem={inputItem}
        weightMin={inputDefaults.weightMin}
        weightMax={inputDefaults.weightMax}
      />
      <RangeInput
        isReadonly={!rangeInputActivated}
        name="potency"
        displayValue={potency}
        value={10}
        onChangeHandler={onPotencyChange}
        marks={potencyMarks}
        unitLabel={'%'}
        stepValue={1}
        minimumValue={inputDefaults.potMin}
        maximumValue={inputDefaults.potMax}
      />
    </form>
  );
};

CalculatorInputs.defaultProps = {
  inputDefaults: {
    weightMax: 1000,
    weightMin: 0,
    potMax: 100,
    potMin: 0
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
