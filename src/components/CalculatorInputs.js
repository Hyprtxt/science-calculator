import React from "react";
import RangeInput from "./RangeInput";
import WeightInput from "./WeightInput";

const CalculatorInputs = props => {
  const {
    onTrimAmountChange,
    pounds,
    grams,
    units,
    onPotencyChange,
    potency,
    currentInputType
  } = props;
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
        onTrimAmountChange={onTrimAmountChange}
        currentInputType={currentInputType}
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
