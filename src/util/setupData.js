import _ from 'lodash';
import poundsToGrams from './poundsToGrams';

const TRIM_ETHANOL_EXTRACTION_EFFICENCY = 0.2;
const TRIM_BUTANE_EXTRACTION_EFFICENCY = 0.2;
const BRAND_FACTOR = 1.2;
// const TRIM_RESIN_PRICE_PER_GRAM = 5;
const Ethanol_Crude_Price_From_Trim = pot => {
  return pot * 0.01 * 6 * 2.5;
};
const Ethanol_Crude_Price_From_Ethanol_Crude = pot => {
  return pot * 0.01 * 5;
};
const Hydrocarbon_Crude_Price_From_Trim = pot => {
  return pot * 0.01 * 10 * 3;
};
// const Hydrocarbon_Crude_Price_From_Hydrocarbon_Crude = pot => {
//   return pot * 0.01 * 5.5;
// };
const Trim_Price = pot => {
  return pot + 80;
};
const Dried_Flower_Price = pot => {
  return pot * 10 + 1000;
};
const Distillate_Price_From_Distillate = pot => {
  return 7 + pot * 0.01;
};
const Cured_Resin_Price_From_Dried_Flower = pot => {
  return 8 + pot * 0.01;
};
const Live_Resin_Price_From_Fresh_Frozen = pot => {
  return 8 + pot * 0.01;
};
const SAUCE_CART_PRICE = 14;
const LIVE_RESIN_PRICE_PER_GRAM = 8;
const CURED_RESIN_PRICE_PER_GRAM = 8;
// const TRIM_BULK_PRICE_PER_LBS = 100;
const PRICE_FRESH_FROZEN = 300;
const DISTILLATE_CARTRIDGE_PRICE = 14;
const CURED_RESIN_EFFICIENCY = 0.25;
const LIVE_RESIN_EFFICIENCY = 0.03;
const DISTILLATE_EFFICIENCY = 0.8;
const DISTILLATE_PRICE = 7;

// const potencyMarks = [
//   {
//     value: 0,
//     label: '0%'
//   },
//   {
//     value: 20,
//     label: '20%'
//   },
//   {
//     value: 40,
//     label: '40%'
//   },
//   {
//     value: 60,
//     label: '60%'
//   },
//   {
//     value: 80,
//     label: '80%'
//   },
//   {
//     value: 100,
//     label: '100%'
//   }
// ];

const unitsMarks = [
  {
    value: 50,
    label: '50%'
  },
  {
    value: 60,
    label: '60%'
  },
  {
    value: 70,
    label: '70%'
  },
  {
    value: 80,
    label: '80%'
  },
  {
    value: 90,
    label: '90%'
  },
  {
    value: 100,
    label: '100%'
  }
];
const crudeMarks = [
  {
    value: 50,
    label: '50%'
  },
  {
    value: 60,
    label: '60%'
  },
  {
    value: 70,
    label: '70%'
  },
  {
    value: 80,
    label: '80%'
  },
  {
    value: 90,
    label: '90%'
  }
];

const poundPotencyMarks = [
  {
    value: 0,
    label: '0%'
  },
  {
    value: 5,
    label: '5%'
  },
  {
    value: 10,
    label: '10%'
  },
  {
    value: 15,
    label: '15%'
  },
  {
    value: 20,
    label: '20%'
  },
  {
    value: 25,
    label: '25%'
  },
  {
    value: 30,
    label: '30%'
  }
];

const poundMarks = [
  { value: 0, label: '0' },
  { value: 200, label: '200' },
  { value: 400, label: '400' },
  { value: 600, label: '600' },
  { value: 800, label: '800' },
  { value: 1000, label: '1000' },
  { value: 1200, label: '1200' },
  { value: 1400, label: '1400' },
  { value: 1600, label: '1600' },
  { value: 1800, label: '1800' },
  { value: 2000, label: '2000' }
];

const tenKGramsMarks = [
  { value: 0, label: '0' },
  { value: 1000, label: '1000' },
  { value: 2000, label: '2000' },
  { value: 3000, label: '3000' },
  { value: 4000, label: '4000' },
  { value: 5000, label: '5000' },
  { value: 6000, label: '6000' },
  { value: 7000, label: '7000' },
  { value: 8000, label: '8000' },
  { value: 9000, label: '9000' },
  { value: 10000, label: '10000' }
];

const unitsDefault = {
  weightDefault: 1000,
  weightMin: 0,
  weightMax: 2000,
  weightStep: 10,
  weightMarks: poundMarks,
  potencyDefault: 75,
  potMin: 50,
  potMax: 100,
  potMarks: unitsMarks
};

const gramsDefault = {
  weightDefault: 5000,
  weightMin: 0,
  weightMax: 10000,
  weightStep: 100,
  weightMarks: tenKGramsMarks,
  potencyDefault: 75,
  potMin: 50,
  potMax: 100,
  potMarks: unitsMarks
};
const crudeDefault = {
  weightDefault: 5000,
  weightMin: 0,
  weightMax: 10000,
  weightStep: 100,
  weightMarks: tenKGramsMarks,
  potencyDefault: 70,
  potMin: 50,
  potMax: 90,
  potMarks: crudeMarks
};
const poundsDefault = {
  weightDefault: 1000,
  weightMin: 0,
  weightMax: 2000,
  weightStep: 10,
  weightMarks: poundMarks,
  potencyDefault: 15,
  potMin: 0,
  potMax: 30,
  potMarks: poundPotencyMarks
};

const data = [
  {
    name: 'Trim',
    parents: [],
    inputType: 'pounds',
    defaults: poundsDefault,
    theMath: calc => {
      calc.trimPounds = calc.input.pounds;
      calc.price = calc.trimPounds * Trim_Price(calc.potency);
      return calc;
    }
  },
  {
    name: 'Ethanol Crude',
    parents: ['Trim'],
    inputType: 'grams',
    defaults: crudeDefault,
    theMath: calc => {
      if (calc.trimPounds !== undefined) {
        calc.ethanolCrudeGrams =
          poundsToGrams(calc.trimPounds) * TRIM_ETHANOL_EXTRACTION_EFFICENCY;
        calc.price =
          calc.ethanolCrudeGrams * Ethanol_Crude_Price_From_Trim(calc.potency);
      } else {
        calc.ethanolCrudeGrams = calc.input.grams;
        calc.price =
          calc.ethanolCrudeGrams *
          Ethanol_Crude_Price_From_Ethanol_Crude(calc.potency);
      }
      return calc;
    }
  },
  {
    name: 'Hydrocarbon Crude',
    parents: ['Trim'],
    inputType: 'grams',
    defaults: crudeDefault,
    theMath: calc => {
      // if (calc.trimPounds !== undefined) {
      calc.butaneCrudeGrams =
        poundsToGrams(calc.trimPounds) * TRIM_BUTANE_EXTRACTION_EFFICENCY;
      console.log(calc.butaneCrudeGrams, 'butaneCrudeGrams');
      calc.price =
        calc.butaneCrudeGrams * Hydrocarbon_Crude_Price_From_Trim(calc.potency);
      // } else {
      //   calc.butaneCrudeGrams = calc.input.grams;
      //   calc.price =
      //     calc.butaneCrudeGrams *
      //     Hydrocarbon_Crude_Price_From_Hydrocarbon_Crude(calc.potency);
      // }
      return calc;
    }
  },
  {
    name: 'Dried Flower',
    parents: [],
    inputType: 'pounds',
    defaults: poundsDefault,
    theMath: calc => {
      calc.pounds = calc.input.pounds;
      calc.price = calc.input.pounds * Dried_Flower_Price(calc.potency);
      return calc;
    }
  },
  {
    name: 'Fresh Frozen',
    parents: [],
    inputType: 'pounds',
    defaults: poundsDefault,
    theMath: calc => {
      calc.pounds = calc.input.pounds;
      calc.price = calc.input.pounds * PRICE_FRESH_FROZEN;
      return calc;
    }
  },
  {
    name: 'Cured Resin',
    parents: ['Dried Flower'],
    inputType: 'grams',
    defaults: gramsDefault,
    theMath: calc => {
      if (calc.pounds !== undefined) {
        calc.grams = poundsToGrams(calc.pounds) * CURED_RESIN_EFFICIENCY;
        calc.price =
          calc.grams * Cured_Resin_Price_From_Dried_Flower(calc.potency);
      } else {
        calc.price = calc.input.grams * CURED_RESIN_PRICE_PER_GRAM;
      }
      return calc;
    }
  },
  {
    name: 'Live Resin',
    parents: ['Fresh Frozen'],
    inputType: 'grams',
    defaults: gramsDefault,
    theMath: calc => {
      if (calc.pounds !== undefined) {
        calc.grams = poundsToGrams(calc.pounds) * LIVE_RESIN_EFFICIENCY;
        calc.price =
          calc.grams * Live_Resin_Price_From_Fresh_Frozen(calc.potency);
        calc.oilGrams = calc.grams;
      } else {
        // calc.grams = poundsToGrams(calc.pounds) * 0.04;
        calc.price = calc.input.grams * LIVE_RESIN_PRICE_PER_GRAM;
        calc.distillateGrams = calc.input.grams;
      }
      return calc;
    }
  },
  {
    name: 'Distillate',
    parents: ['Ethanol Crude'],
    inputType: 'grams',
    defaults: gramsDefault,
    theMath: calc => {
      if (calc.ethanolCrudeGrams !== undefined) {
        calc.grams = calc.ethanolCrudeGrams * DISTILLATE_EFFICIENCY;
        calc.price = calc.grams * DISTILLATE_PRICE;
        calc.distillateGrams = calc.grams;
        calc.oilGrams = calc.distillateGrams;
      } else {
        calc.price =
          calc.input.grams * Distillate_Price_From_Distillate(calc.potency);
        calc.distillateGrams = calc.input.grams;
        calc.oilGrams = calc.distillateGrams;
      }
      return calc;
    }
  },
  {
    name: 'Distillate Cartridge',
    parents: ['Distillate'],
    inputType: 'units',
    defaults: unitsDefault,
    theMath: calc => {
      if (calc.distillateGrams !== undefined) {
        calc.units = calc.distillateGrams * 2;
        calc.price = calc.units * DISTILLATE_CARTRIDGE_PRICE;
      } else {
        calc.price = calc.input.grams * DISTILLATE_CARTRIDGE_PRICE;
      }
      return calc;
    }
  },
  {
    name: 'Sauce Cartridge',
    parents: ['Distillate', 'Cured Resin', 'Live Resin'],
    inputType: 'units',
    defaults: unitsDefault,
    theMath: calc => {
      if (calc.oilGrams !== undefined) {
        calc.units = calc.oilGrams * 2;
        calc.price = calc.units * SAUCE_CART_PRICE;
      } else {
        calc.price = calc.input.units * SAUCE_CART_PRICE;
      }
      return calc;
    }
  },
  {
    name: 'Jarred Concentrates',
    parents: ['Cured Resin', 'Live Resin'],
    inputType: 'units',
    defaults: unitsDefault,
    theMath: calc => {
      // calc.price = calc.input.grams * 10;
      calc.price = calc.input.units * 14;
      return calc;
    }
  },
  {
    name: 'Branded Distillate Cartridge',
    parents: ['Distillate Cartridge'],
    inputType: 'units',
    defaults: unitsDefault,
    theMath: calc => {
      calc.price = calc.price * BRAND_FACTOR;
      // calc.price = calc.cartridges * 17;
      return calc;
    }
  },
  {
    name: 'Branded Sauce Cartridge',
    parents: ['Sauce Cartridge'],
    inputType: 'units',
    defaults: unitsDefault,
    theMath: calc => {
      calc.price = calc.price * BRAND_FACTOR;
      return calc;
    }
  },
  {
    name: 'Branded Jarred Concentrates',
    parents: ['Jarred Concentrates'],
    inputType: 'units',
    defaults: unitsDefault,
    theMath: calc => {
      calc.price = calc.price * BRAND_FACTOR;
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
