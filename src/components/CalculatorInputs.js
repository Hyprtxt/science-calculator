import React from 'react';
import RangeInput from './RangeInput';
import WeightInput from './WeightInput';

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
    weightMin,
    weightMax,
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
        weightMin={weightMin}
        weightMax={weightMax}
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
        minimumValue={0}
        maximumValue={100}
      />
    </form>
  );
};

export default CalculatorInputs;
