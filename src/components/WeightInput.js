import React from "react";

const WeightInput = props => {
  const { pounds, grams, units, onTrimAmountChange, currentInputType } = props;
  if (currentInputType === "grams") {
    return (
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
    );
  }
  if (currentInputType === "units") {
    return (
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
    );
  }
  if (currentInputType === "trim") {
    return (
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
    );
  }
  return <h1>NOTHING</h1>;
};

export default WeightInput;
