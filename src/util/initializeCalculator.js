// Potency is an integer from 1-100
// Trim amount is input number

const initializeCalculator = init => {
  const trimAmount = init.trimAmount;
  const potency = init.potency;
  let calculator = {
    inputItemPrice: 0,
    price: 0,
    grams: 0,
    cartridges: 0,
    pounds: trimAmount,
    potency: potency
  };
  return calculator;
};

export default initializeCalculator;
