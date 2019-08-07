import React from "react";

const RangeInput = props => {
  const {
    isReadonly,
    name,
    displayValue,
    defaultValue,
    onChangeHandler
  } = props;
  let disabled = isReadonly ? { disabled: "disabled" } : {};
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
        {...disabled}
      />

      <span>{`${displayValue}%`}</span>
    </div>
  );
};

export default RangeInput;
