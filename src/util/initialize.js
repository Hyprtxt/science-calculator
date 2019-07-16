import React from "react";

// Potency is an integer from 1-100
// Trim amount is input number
const poundstograms = thing => {
  return thing * 16 * 28.5;
};
const initializeCalculator = state => {
  const trimAmount = state.trimAmount;
  const potency = state.potency;
  let calculator = {
    price: 0,
    grams: 0,
    cartridges: 0,
    pounds: trimAmount,
    potency: potency
  };
  const poundstograms = thing => {
    return thing * 16 * 28.5;
  };
  return calculator;
};

export default initializeCalculator;
