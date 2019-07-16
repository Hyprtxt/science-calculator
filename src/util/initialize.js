import React from "react";

const initializeCalculator = state => {
  const trimAmount = state.trimAmount;
  const potency = state.potency;
  let input = {};
  input.outputPrice = trimAmount * (potency / 100);
  input.outputGrams = trimAmount;
  return input;
};

export default initializeCalculator;
