import _ from "lodash";
const poundstograms = thing => {
  return thing * 16 * 28.5;
};

const data = [
  {
    name: "Trim",
    parents: [],
    function: (input, potency) => {
      input.price = input.grams * 10 * potency;
      return input;
    }
  },
  {
    name: "Ethanol Crude",
    parents: ["Trim"],
    function: (input, potency) => {
      input.grams = poundstograms(input.pounds) * 0.2;
      input.price = input.grams * 3;
      return input;
    }
  },
  {
    name: "Hydrocarbon Crude",
    parents: ["Trim"],
    function: (input, potency) => {
      input.grams = poundstograms(input.pounds) * 0.2;
      input.price = input.grams * 4;
      return input;
    }
  },
  {
    name: "Dried Flower",
    parents: [],
    function: (input, potency) => {
      input.price = input * 1000 + 10 * potency;
      return input;
    }
  },
  {
    name: "Fresh Frozen",
    parents: [],
    function: (input, potency) => {
      input.price = input.pounds * 300;
      return input;
    }
  },
  {
    name: "Cured Resin",
    parents: ["Dried Flower"],
    function: (input, potency) => {
      input.grams = poundstograms(input.pounds);
      input.price = input.grams * 8;
      return input;
    }
  },
  {
    name: "Live Resin",
    parents: ["Fresh Frozen"],
    function: (input, potency) => {
      input.grams = poundstograms(input.pounds) * 0.04;
      input.price = input.grams * 8;
    }
  },
  {
    name: "Distillate",
    parents: ["Ethanol Crude"],
    function: (input, potency) => {
      input.grams = input.grams * 0.8;
      input.price = input.grams * 7;
      return input;
    }
  },
  {
    name: "Distillate Cartridge",
    parents: ["Distillate"],
    function: (input, potency) => {
      input.price = input.grams * 14;
      // input.grams = input.grams;
      return input;
    }
  },
  {
    name: "Sauce Cartridge",
    parents: ["Distillate", "Cured Resin", "Live Resin"],
    function: (input, potency) => {
      input.cartridges = input.grams * 2;
      input.price = input.cartridges * 18;
      return input;
    }
  },
  {
    name: "Jarred Concentrates",
    parents: ["Cured Resin", "Live Resin"],
    function: (input, potency) => {
      // input.grams = input.grams;
      input.price = input.grams * 10;
      return input;
    }
  },
  {
    name: "Branded Distillate Cartridge",
    parents: ["Distillate Cartridge"],
    function: (input, potency) => {
      // input.grams = input.grams;
      input.price = input.cartridges * 17;
      return input;
    }
  },
  {
    name: "Branded Sauce Cartridge",
    parents: ["Sauce Cartridge"],
    function: (input, potency) => {
      // input.grams = input.grams;
      input.price = input.cartridges * 21;
      return input;
    }
  },
  {
    name: "Branded Jarred Concentrates",
    parents: ["Jarred Concentrates"],
    function: (input, potency) => {
      // input.grams = input.grams;
      input.price = input.grams * 15;
      return input;
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
