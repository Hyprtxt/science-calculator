import React from "react";

const WeightInput = props => {
  const { pounds, grams, units, onTrimAmountChange, currentInputType } = props;
  console.log("WeightInput", currentInputType);
  let theGoods = <h1>NOTHING</h1>;
  if (currentInputType === "grams") {
    theGoods = (
      <React.Fragment>
        <label htmlFor="grams">Grams of $STUFF: </label>
        <input
          type="text"
          name="grams"
          value={grams}
          onChange={onTrimAmountChange}
        />
        &nbsp;g.
      </React.Fragment>
    );
  }
  if (currentInputType === "units") {
    theGoods = (
      <React.Fragment>
        <label htmlFor="units">Units of $STUFF: </label>
        <input
          type="text"
          name="units"
          value={units}
          onChange={onTrimAmountChange}
        />
        &nbsp;carts.
      </React.Fragment>
    );
  }
  if (currentInputType === "pounds") {
    theGoods = (
      <React.Fragment>
        <label htmlFor="trim">Pounds of $STUFF: </label>
        <input
          type="text"
          name="trim"
          value={pounds}
          onChange={onTrimAmountChange}
        />
        &nbsp;lbs.
      </React.Fragment>
    );
  }
  return <div>{theGoods}</div>;
};

export default WeightInput;
