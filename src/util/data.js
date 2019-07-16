import _ from "lodash";

const crude_yield = thing => {
  return thing * 28.5 * 16 * 0.2;
};

// const input = {
//   outputGrams: 50,
//   outputPrice: 100
// };

const data = [
  {
    name: "Trim",
    parents: [],
    function: (input, potency) => {
      input.outputPrice = input.outputGrams * 10 * potency;
      return input;
    }
  },
  {
    name: "Ethanol Crude",
    parents: ["Trim"],
    function: (input, potency) => {
      input.outputGrams = crude_yield(input.outputGrams);
      input.outputPrice = input.outputGrams * 3;
      return input;
    }
  },
  {
    name: "Hydrocarbon Crude",
    parents: ["Trim"],
    function: (input, potency) => {
      input.outputGrams = crude_yield(input.outputGrams);
      input.outputPrice = input.outputGrams * 4;
      return input;
    }
  },
  {
    name: "Dried Flower",
    parents: [],
    function: (input, potency) => {
      input.outputPrice = input * 1000 + 10 * potency;
      return input;
    }
  },
  {
    name: "Fresh Frozen",
    parents: [],
    function: (input, potency) => {
      input.outputPrice = input.outputGrams * 300;
      return input;
    }
  },
  {
    name: "Cured Resin",
    parents: ["Dried Flower"],
    function: (input, potency) => {
      input.outputPrice = input.outputGrams * 300;
      return input;
    }
  },
  {
    name: "Live Resin",
    parents: ["Fresh Frozen"],
    function: (input, potency) => {
      input.outputGrams = input.outputGrams + 16 * 28.5 * 0.04;
      input.outputPrice = input.outputGrams * 8;
    }
  },
  {
    name: "Distillate",
    parents: ["Ethanol Crude"],
    function: (input, potency) => {
      input.outputGrams = input.outputGrams * 0.8;
      input.outputPrice = input.outputGrams * 7;
      return input;
    }
  },
  {
    name: "Distillate Cartridge",
    parents: ["Distillate"],
    function: (input, potency) => {
      input.outputPrice = input.outputGrams * 14;
      // input.outputGrams = input.outputGrams;
      return input;
    }
  },
  {
    name: "Sauce Cartridge",
    parents: ["Distillate", "Cured Resin", "Live Resin"],
    function: (input, potency) => {
      input.outputGrams = input.outputGrams * 2;
      input.outputPrice = input.outputGrams * 18;
      return input;
    }
  },
  {
    name: "Jarred Concentrates",
    parents: ["Cured Resin", "Live Resin"],
    function: (input, potency) => {
      // input.outputGrams = input.outputGrams;
      input.outputPrice = input.outputGrams * 13;
      return input;
    }
  },
  {
    name: "Branded Distillate Cartridge",
    parents: ["Distillate Cartridge"],
    function: (input, potency) => {
      // input.outputGrams = input.outputGrams;
      input.outputPrice = input.outputGrams * 17;
      return input;
    }
  },
  {
    name: "Branded Sauce Cartridge",
    parents: ["Sauce Cartridge"],
    function: (input, potency) => {
      // input.outputGrams = input.outputGrams;
      input.outputPrice = input.outputGrams * 21;
      return input;
    }
  },
  {
    name: "Branded Jarred Concentrates",
    parents: ["Jarred Concentrates"],
    function: (input, potency) => {
      // input.outputGrams = input.outputGrams;
      input.outputPrice = input.outputGrams * 18;
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
