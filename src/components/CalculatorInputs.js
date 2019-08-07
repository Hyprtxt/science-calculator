import React from "react";
import RangeInput from "./RangeInput";
import WeightInput from "./WeightInput";

const CalculatorInputs = props => {
  const {
    inputItem,
    currentInputType,
    pounds,
    grams,
    units,
    potency,
    onAmountChange,
    onPotencyChange
  } = props;
  // <h2>{`currentInputType:${currentInputType} potency:${potency}`}</h2>
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <WeightInput
        pounds={pounds}
        grams={grams}
        units={units}
        onAmountChange={onAmountChange}
        currentInputType={currentInputType}
        inputItem={inputItem}
      />
      <RangeInput
        name="potency"
        displayValue={potency}
        value={10}
        onChangeHandler={onPotencyChange}
      />
    </form>
  );
};

export default CalculatorInputs;
