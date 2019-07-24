import React from "react";

const CalculatorOutput = props => {
  const { inputItem, inputItemPrice, outputItem, outputItemPrice } = props;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });
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
        <input
          type="text"
          name="trim"
          value={formatter.format(inputItemPrice)}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="trim">
          Market Value of <strong>{outputItem}</strong>:{" "}
        </label>
        <input
          type="text"
          name="trim"
          value={formatter.format(outputItemPrice)}
          readOnly
        />
      </div>
    </form>
  );
};

export default CalculatorOutput;
