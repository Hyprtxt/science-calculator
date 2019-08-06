import React from "react";
import RangeInput from "./RangeInput";

const CalculatorInputs = props => {
  const {
    onTrimAmountChange,
    pounds,
    grams,
    units,
    onPotencyChange,
    potency
  } = props;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <div>
        <label htmlFor="trim">Pounds of $STUFF: </label>
        <input
          type="text"
          name="trim"
          value={pounds}
          onChange={onTrimAmountChange}
        />
        &nbsp;lbs.
      </div>
      <div>
        <label htmlFor="grams">Grams of $STUFF: </label>
        <input
          type="text"
          name="grams"
          value={grams}
          onChange={onTrimAmountChange}
        />
        &nbsp;g.
      </div>
      <div>
        <label htmlFor="units">Units of $STUFF: </label>
        <input
          type="text"
          name="units"
          value={units}
          onChange={onTrimAmountChange}
        />
        &nbsp;carts.
      </div>
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
