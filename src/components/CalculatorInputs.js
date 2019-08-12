import React from 'react';
import RangeInput from './RangeInput';
import WeightInput from './WeightInput';
import PropTypes from 'prop-types';

const CalculatorInputs = props => {
  const {
    inputItem,
    currentInputType,
    inputDefaults,
    onAmountChange,
    onPotencyChange
  } = props;
  const {
    weightMin,
    weightMax,
    weightMarks,
    potMin,
    potMax,
    potMarks,
    weight,
    potency
  } = inputDefaults;
  console.log(inputDefaults, 'CalculatorInputs');
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
        weightMin={weightMin}
        weightMax={weightMax}
        weightMarks={weightMarks}
      />
      <RangeInput
        isReadonly={!rangeInputActivated}
        name="potency"
        displayValue={potency}
        value={10}
        onChangeHandler={onPotencyChange}
        marks={potMarks}
        unitLabel={'%'}
        stepValue={1}
        minimumValue={potMin}
        maximumValue={potMax}
      />
    </form>
  );
};

CalculatorInputs.defaultProps = {
  inputDefaults: {
    weightMax: 100,
    weightMin: 0,
    weight: 50,
    potMax: 100,
    potMin: 0,
    potency: 50
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
