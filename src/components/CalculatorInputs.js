import React from "react";
import RangeInput from "./RangeInput";

const CalculatorInputs = props => {
  const { onTrimAmountChange, pounds, onPotencyChange, potency } = props;
  return (
    <div className="inputs">
      <h2>1. Input Starting Material</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div>
          <label htmlFor="trim">Pounds of Trim: </label>
          <input
            type="text"
            name="trim"
            value={pounds}
            onChange={onTrimAmountChange}
          />
          &nbsp;lbs.
        </div>
        <RangeInput
          name="potency"
          displayValue={potency}
          value={10}
          onChangeHandler={onPotencyChange}
        />
      </form>
    </div>
  );
};

export default CalculatorInputs;
