import _ from "lodash";
import poundsToGrams from "./poundsToGrams";
const TRIM_EXTRACTION_EFFICENCY = 0.05;
const TRIM_RESIN_PRICE_PER_GRAM = 10;
const data = [
  {
    name: "Trim",
    parents: [],
    inputType: "pounds",
    theMath: calc => {
      const grams_o_resin =
        poundsToGrams(calc.input.pounds * TRIM_EXTRACTION_EFFICENCY) *
        calc.potency;
      calc.grams = grams_o_resin;
      calc.price = poundsToGrams(grams_o_resin) * TRIM_RESIN_PRICE_PER_GRAM;
      return calc;
    }
  },
  {
    name: "Ethanol Crude",
    parents: ["Trim"],
    inputType: "grams",
    theMath: calc => {
      if (calc.grams !== undefined) {
        calc.price = calc.grams * 3.5;
      } else {
        calc.price = calc.input.grams * 0.3 * calc.potency;
      }
      return calc;
    }
  },
  {
    name: "Hydrocarbon Crude",
    parents: ["Trim"],
    inputType: "grams",
    theMath: calc => {
      calc.grams = poundsToGrams(calc.pounds) * 0.2;
      calc.price = calc.grams * 4;
      return calc;
    }
  },
  {
    name: "Dried Flower",
    parents: [],
    inputType: "grams",
    theMath: calc => {
      calc.price = calc * 1000 + 10 * calc.potency;
      return calc;
    }
  },
  {
    name: "Fresh Frozen",
    parents: [],
    inputType: "pounds",
    theMath: calc => {
      calc.price = calc.pounds * 300;
      return calc;
    }
  },
  {
    name: "Cured Resin",
    parents: ["Dried Flower"],
    inputType: "grams",
    theMath: calc => {
      calc.grams = poundsToGrams(calc.pounds);
      calc.price = calc.grams * 8;
      return calc;
    }
  },
  {
    name: "Live Resin",
    parents: ["Fresh Frozen"],
    inputType: "pounds",
    theMath: calc => {
      calc.grams = poundsToGrams(calc.pounds) * 0.04;
      calc.price = calc.grams * 8;
      return calc;
    }
  },
  {
    name: "Distillate",
    parents: ["Ethanol Crude"],
    inputType: "grams",
    theMath: calc => {
      calc.grams = calc.grams * 0.8;
      calc.price = calc.grams * 7;
      return calc;
    }
  },
  {
    name: "Distillate Cartridge",
    parents: ["Distillate"],
    inputType: "grams",
    theMath: calc => {
      calc.price = calc.grams * 14;
      // calc.grams = calc.grams;
      return calc;
    }
  },
  {
    name: "Sauce Cartridge",
    parents: ["Distillate", "Cured Resin", "Live Resin"],
    inputType: "units",
    theMath: calc => {
      calc.cartridges = calc.grams * 2;
      calc.price = calc.cartridges * 18;
      return calc;
    }
  },
  {
    name: "Jarred Concentrates",
    parents: ["Cured Resin", "Live Resin"],
    inputType: "units",
    theMath: calc => {
      // calc.grams = calc.grams;
      calc.price = calc.grams * 10;
      return calc;
    }
  },
  {
    name: "Branded Distillate Cartridge",
    parents: ["Distillate Cartridge"],
    inputType: "units",
    theMath: calc => {
      // calc.grams = calc.grams;
      calc.price = calc.cartridges * 17;
      return calc;
    }
  },
  {
    name: "Branded Sauce Cartridge",
    parents: ["Sauce Cartridge"],
    inputType: "units",
    theMath: calc => {
      // calc.grams = calc.grams;
      calc.price = calc.cartridges * 21;
      return calc;
    }
  },
  {
    name: "Branded Jarred Concentrates",
    parents: ["Jarred Concentrates"],
    inputType: "units",
    theMath: calc => {
      // calc.grams = calc.grams;
      calc.price = calc.grams * 15;
      return calc;
    }
  }
];

const setupData = () => {
  const names = data.map(item => {
    return item.name;
  });
  const parents = _.uniq(
    data.flatMap((current, index, array) => {
      return current.parents;
    })
  );
  const startDisabled = _.difference(names, parents);
  return data.map(item => {
    if (startDisabled.indexOf(item.name) !== -1) {
      item.enabled = false;
    } else {
      item.enabled = true;
    }
    item.active = false;
    return item;
  });
};

export default setupData;
