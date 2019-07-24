import React from "react";

const CalculatorOutput = props => {
  const { inputItem, inputItemPrice, outputItem, outputItemPrice } = props;
  return (
    <form
      className="outputs"
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <div>
        <label htmlFor="trim">
          Market Value of <strong>{inputItem}</strong>:{" "}
        </label>
        <input type="text" name="trim" value={`$${inputItemPrice}`} readOnly />
      </div>
      <div>
        <label htmlFor="trim">
          Market Value of <strong>{outputItem}</strong>:{" "}
        </label>
        <input type="text" name="trim" value={`$${outputItemPrice}`} readOnly />
      </div>
    </form>
  );
};

export default CalculatorOutput;
