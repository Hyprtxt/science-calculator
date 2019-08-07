import React from "react";

const Capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const WeightInput = props => {
  const { onAmountChange, currentInputType, inputItem } = props;
  console.log("WeightInput", currentInputType);
  let theHelperText = <h1>NOTHING</h1>;
  if (currentInputType === "grams") {
    theHelperText = "\u00A0g.";
  }
  if (currentInputType === "units") {
    theHelperText = "\u00A0carts.";
  }
  if (currentInputType === "pounds") {
    theHelperText = "\u00A0lbs.";
  }
  if (currentInputType !== undefined) {
    return (
      <div>
        <label htmlFor={currentInputType}>
          {`${Capitalize(currentInputType)} of ${inputItem}:`}
        </label>
        <input
          type="text"
          name={currentInputType}
          onChange={e => {
            onAmountChange(e, currentInputType);
          }}
        />
        {theHelperText}
      </div>
    );
  } else {
    return <div> {theHelperText}</div>;
  }
};

export default WeightInput;
