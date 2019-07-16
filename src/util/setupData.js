import _ from "lodash";
import poundsToGrams from "./poundsToGrams";

const data = [
  {
    name: "Trim",
    parents: [],
    function: calc => {
      calc.price = calc.grams * 10 * calc.potency;
      return calc;
    }
  },
  {
    name: "Ethanol Crude",
    parents: ["Trim"],
    function: calc => {
      calc.grams = poundsToGrams(calc.pounds) * 0.2;
      calc.price = calc.grams * 3;
      return calc;
    }
  },
  {
    name: "Hydrocarbon Crude",
    parents: ["Trim"],
    function: calc => {
      calc.grams = poundsToGrams(calc.pounds) * 0.2;
      calc.price = calc.grams * 4;
      return calc;
    }
  },
  {
    name: "Dried Flower",
    parents: [],
    function: calc => {
      calc.price = calc * 1000 + 10 * calc.potency;
      return calc;
    }
  },
  {
    name: "Fresh Frozen",
    parents: [],
    function: calc => {
      calc.price = calc.pounds * 300;
      return calc;
    }
  },
  {
    name: "Cured Resin",
    parents: ["Dried Flower"],
    function: calc => {
      calc.grams = poundsToGrams(calc.pounds);
      calc.price = calc.grams * 8;
      return calc;
    }
  },
  {
    name: "Live Resin",
    parents: ["Fresh Frozen"],
    function: calc => {
      calc.grams = poundsToGrams(calc.pounds) * 0.04;
      calc.price = calc.grams * 8;
      return calc;
    }
  },
  {
    name: "Distillate",
    parents: ["Ethanol Crude"],
    function: calc => {
      calc.grams = calc.grams * 0.8;
      calc.price = calc.grams * 7;
      return calc;
    }
  },
  {
    name: "Distillate Cartridge",
    parents: ["Distillate"],
    function: calc => {
      calc.price = calc.grams * 14;
      // calc.grams = calc.grams;
      return calc;
    }
  },
  {
    name: "Sauce Cartridge",
    parents: ["Distillate", "Cured Resin", "Live Resin"],
    function: calc => {
      calc.cartridges = calc.grams * 2;
      calc.price = calc.cartridges * 18;
      return calc;
    }
  },
  {
    name: "Jarred Concentrates",
    parents: ["Cured Resin", "Live Resin"],
    function: calc => {
      // calc.grams = calc.grams;
      calc.price = calc.grams * 10;
      return calc;
    }
  },
  {
    name: "Branded Distillate Cartridge",
    parents: ["Distillate Cartridge"],
    function: calc => {
      // calc.grams = calc.grams;
      calc.price = calc.cartridges * 17;
      return calc;
    }
  },
  {
    name: "Branded Sauce Cartridge",
    parents: ["Sauce Cartridge"],
    function: calc => {
      // calc.grams = calc.grams;
      calc.price = calc.cartridges * 21;
      return calc;
    }
  },
  {
    name: "Branded Jarred Concentrates",
    parents: ["Jarred Concentrates"],
    function: calc => {
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
