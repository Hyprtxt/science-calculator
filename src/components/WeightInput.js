import React from "react";

const Capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const WeightInput = props => {
  const { onAmountChange, currentInputType } = props;
  console.log("WeightInput", currentInputType);
  let theGoods = <h1>NOTHING</h1>;
  if (currentInputType === "grams") {
    theGoods = (
      <React.Fragment>
        <label htmlFor="grams">Grams of $STUFF: </label>
        <input
          type="text"
          name="grams"
          // value={grams}
          onChange={e => {
            onAmountChange(e, "grams");
          }}
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
          // value={units}
          onChange={e => {
            onAmountChange(e, "units");
          }}
        />
        &nbsp;carts.
      </React.Fragment>
    );
  }
  if (currentInputType === "pounds") {
    theGoods = (
      <React.Fragment>
        <label htmlFor={currentInputType}>
          {`${Capitalize(currentInputType)} of $STUFF:`}
        </label>
        <input
          type="text"
          name={currentInputType}
          onChange={e => {
            onAmountChange(e, "pounds");
          }}
        />
        &nbsp;lbs.
      </React.Fragment>
    );
  }
  return <div>{theGoods}</div>;
};

export default WeightInput;
