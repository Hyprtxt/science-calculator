import _ from "lodash";

const data = [
  {
    name: "Trim",
    parents: [],
    function: (input, potency) => {
      return input + input * 0;
    }
  },
  {
    name: "Ethanol Crude",
    parents: ["Trim"],
    function: (input, potency) => {
      return input + input * 0.5;
    }
  },
  {
    name: "Hydrocarbon Crude",
    parents: ["Trim"],
    function: (input, potency) => {
      return input + input * 0.5;
    }
  },
  {
    name: "Dried Flower",
    parents: [],
    function: (input, potency) => {
      return input + input * 2;
    }
  },
  {
    name: "Fresh Frozen",
    parents: [],
    function: (input, potency) => {
      return input + input * 3;
    }
  },
  {
    name: "Cured Resin",
    parents: ["Dried Flower"],
    function: (input, potency) => {
      return input + 10;
    }
  },
  {
    name: "Live Resin",
    parents: ["Fresh Frozen"],
    function: (input, potency) => {
      return input + 10;
    }
  },
  {
    name: "Distillate",
    parents: ["Ethanol Crude"],
    function: (input, potency) => {
      return input + 10;
    }
  },
  {
    name: "Distillate Cartridge",
    parents: ["Distillate"],
    function: (input, potency) => {
      return input + 50;
    }
  },
  {
    name: "Sauce Cartridge",
    parents: ["Distillate", "Cured Resin", "Live Resin"],
    function: (input, potency) => {
      return input + 50;
    }
  },
  {
    name: "Jarred Concentrates",
    parents: ["Cured Resin", "Live Resin"],
    function: (input, potency) => {
      return input + 50;
    }
  },
  {
    name: "Branded Distillate Cartridge",
    parents: ["Distillate Cartridge"],
    function: (input, potency) => {
      return input + 8;
    }
  },
  {
    name: "Branded Sauce Cartridge",
    parents: ["Sauce Cartridge"],
    function: (input, potency) => {
      return input + 8;
    }
  },
  {
    name: "Branded Jarred Concentrates",
    parents: ["Jarred Concentrates"],
    function: (input, potency) => {
      return input + 8;
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
