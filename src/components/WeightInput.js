import React from 'react';
import RangeInput from './RangeInput';

// const Capitalize = str => {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// };

const WeightInput = props => {
  const {
    onAmountChange,
    currentInputType,
    weightMin,
    weightMax,
    weightMarks
  } = props;
  // console.log("WeightInput", currentInputType);
  const className = 'weight-input';
  let theHelperText = <h1>NOTHING</h1>;
  if (currentInputType === 'grams') {
    theHelperText = '\u00A0g.';
  }
  if (currentInputType === 'units') {
    theHelperText = '\u00A0carts.';
  }
  if (currentInputType === 'pounds') {
    theHelperText = '\u00A0lbs.';
  }
  if (currentInputType !== undefined) {
    return (
      <div className={className}>
        <RangeInput
          isReadonly={false}
          name={currentInputType}
          displayValue={10}
          value={10}
          minimumValue={weightMin}
          maximumValue={weightMax}
          stepValue={1}
          onChangeHandler={value => {
            onAmountChange(value, currentInputType);
          }}
          marks={weightMarks}
          unitLabel={theHelperText}
        />
      </div>
    );
  } else {
    return <div className={className}>{theHelperText}</div>;
  }
};

export default WeightInput;

// <label htmlFor={currentInputType}>
//   {`${Capitalize(currentInputType)} of ${inputItem}:`}
// </label>
// <input
//   type="text"
//   name={currentInputType}
//   onChange={e => {
//     onAmountChange(e.target.value, currentInputType);
//   }}
// />
// {theHelperText}
