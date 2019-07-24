import React from "react";

const RangeInput = props => {
  const name = props.name;
  const displayValue = props.displayValue;
  const defaultValue = props.defaultValue;
  const onChangeHandler = props.onChangeHandler;
  return (
    <div className="range-input">
      <label htmlFor="trim">Potency</label>
      <input
        type="range"
        min="1"
        max="100"
        step="1"
        name={name}
        defaultValue={defaultValue}
        onChange={onChangeHandler}
      />
      <span>{`${displayValue}%`}</span>
    </div>
  );
};

export default RangeInput;
