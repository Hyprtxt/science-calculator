import _ from "lodash";

const data = [
  {
    name: "Trim",
    parents: [],
    function: input => {
      return input + 10;
    }
  },
  {
    name: "Ethanol Crude",
    parents: ["Trim"],
    function: input => {
      return input + 10;
    }
  },
  {
    name: "Hydrocarbon Crude",
    parents: ["Trim"],
    function: input => {
      return input + 10;
    }
  },
  {
    name: "Dried Flower",
    parents: [],
    function: input => {
      return input + 10;
    }
  },
  {
    name: "Fresh Frozen",
    parents: [],
    function: input => {
      return input + 10;
    }
  },
  {
    name: "Cured Resin",
    parents: ["Dried Flower"],
    function: input => {
      return input + 10;
    }
  },
  {
    name: "Live Resin",
    parents: ["Fresh Frozen"],
    function: input => {
      return input + 10;
    }
  },
  {
    name: "Distillate",
    parents: ["Ethanol Crude"],
    function: input => {
      return input + 10;
    }
  },
  {
    name: "Distillate Cartridge",
    parents: ["Distillate"],
    function: input => {
      return input + 10;
    }
  },
  {
    name: "Sauce Cartridge",
    parents: ["Distillate", "Cured Resin", "Live Resin"],
    function: input => {
      return input + 10;
    }
  },
  {
    name: "Jarred Concentrates",
    parents: ["Cured Resin", "Live Resin"],
    function: input => {
      return input + 10;
    }
  },
  {
    name: "Branded Distillate Cartridge",
    parents: ["Distillate Cartridge"],
    function: input => {
      return input + 10;
    }
  },
  {
    name: "Branded Sauce Cartridge",
    parents: ["Sauce Cartridge"],
    function: input => {
      return input + 10;
    }
  },
  {
    name: "Branded Jarred Concentrates",
    parents: ["Jarred Concentrates"],
    function: input => {
      return input + 10;
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
