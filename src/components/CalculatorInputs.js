import React from 'react';
import RangeInput from './RangeInput';
import WeightInput from './WeightInput';

const CalculatorInputs = props => {
  const {
    inputItem,
    currentInputType,
    potency,
    onAmountChange,
    onPotencyChange
  } = props;
  // <h2>{`currentInputType:${currentInputType} potency:${potency}`}</h2>
  let rangeInputActivated = true;
  // console.log(inputItem !== undefined ? true : false, "thing");
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
      />
      <RangeInput
        isReadonly={!rangeInputActivated}
        name="potency"
        displayValue={potency}
        value={10}
        onChangeHandler={onPotencyChange}
      />
    </form>
  );
};

export default CalculatorInputs;
