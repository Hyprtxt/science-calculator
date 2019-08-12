import React from 'react';
import RangeInput from './RangeInput';

// const Capitalize = str => {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// };

const weightMarks = [
  { value: 0, label: '0' },
  { value: 200, label: '200' },
  { value: 400, label: '400' },
  { value: 600, label: '600' },
  { value: 800, label: '800' },
  { value: 1000, label: '1000' }
];

const WeightInput = props => {
  const { onAmountChange, currentInputType, weightMin, weightMax } = props;
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
