import React from 'react';
import RangeInput from './RangeInput';
import WeightInput from './WeightInput';
import PropTypes from 'prop-types';

const CalculatorInputs = props => {
  const {
    inputItem,
    inputValues,
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
    potency
  } = inputDefaults;
  // console.log(onAmountChange(50, currentInputType));
  // console.log(inputDefaults, 'CalculatorInputs');
  // <h2>{`currentInputType:${currentInputType} potency:${potency}`}</h2>
  let rangeInputActivated = true;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <WeightInput
        inputValues={inputValues}
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
        currentValue={potency}
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
