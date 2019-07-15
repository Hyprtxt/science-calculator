const data = [
  {
    name: "Trim",
    parents: []
  },
  {
    name: "Ethanol Crude",
    parents: ["Trim"]
  },
  {
    name: "Hydrocarbon Crude",
    parents: ["Trim"]
  },
  {
    name: "Dried Flower",
    parents: []
  },
  {
    name: "Fresh Frozen",
    parents: []
  },
  {
    name: "Cured Resin",
    parents: ["Dried Flower"]
  },
  {
    name: "Live Resin",
    parents: ["Fresh Frozen"]
  },
  {
    name: "Distillate",
    parents: ["Ethanol Crude"]
  },
  {
    name: "Distillate Cartridge",
    parents: ["Distillate"]
  },
  {
    name: "Sauce Cartridge",
    parents: ["Distillate", "Cured Resin", "Live Resin"]
  },
  {
    name: "Jarred Concentrates",
    parents: ["Cured Resin", "Live Resin"]
  },
  {
    name: "Branded Distillate Cartridge",
    parents: ["Distillate Cartridge"]
  },
  {
    name: "Branded Sauce Cartridge",
    parents: ["Sauce Cartridge"]
  },
  {
    name: "Branded Jarred Concentrates",
    parents: ["Jarred Concentrates"]
  }
];

export default data;
