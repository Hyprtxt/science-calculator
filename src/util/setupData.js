import _ from 'lodash';
import poundsToGrams from './poundsToGrams';

const TRIM_ETHANOL_EXTRACTION_EFFICENCY = 0.2;
const TRIM_BUTANE_EXTRACTION_EFFICENCY = 0.2;
// const TRIM_RESIN_PRICE_PER_GRAM = 5;
const Ethanol_Crude_Price_From_Trim = pot => {
  return pot * 0.01 * 10 * 2.5;
};
const Ethanol_Crude_Price_From_Ethanol_Crude = pot => {
  return pot * 0.01 * 5;
};
const Hydrocarbon_Crude_Price_From_Trim = pot => {
  return pot * 0.01 * 10 * 3;
};
const Hydrocarbon_Crude_Price_From_Hydrocarbon_Crude = pot => {
  return pot * 0.01 * 5.5;
};
const Trim_Price = pot => {
  return pot + 80;
};
const Dried_Flower_Price = pot => {
  return pot * 10 + 1000;
};
const Distillate_Price_From_Distillate = pot => {
  return 7 + pot * 0.01;
};
const SAUCE_CART_PRICE = 14;
const LIVE_RESIN_PRICE_PER_GRAM = 8;
const CURED_RESIN_PRICE_PER_GRAM = 8;
const TRIM_BULK_PRICE_PER_LBS = 100;
const PRICE_FRESH_FROZEN = 300;
const DISTILLATE_CARTRIDGE_PRICE = 14;

const data = [
  {
    name: 'Trim',
    parents: [],
    inputType: 'pounds',
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
    theMath: calc => {
      // if (calc.trimPounds !== undefined) {
      //   calc.ethanolCrudeGrams =
      //     poundsToGrams(calc.trimPounds) * TRIM_ETHANOL_EXTRACTION_EFFICENCY;
      //   calc.price =
      //     calc.ethanolCrudeGrams * Ethanol_Crude_Price_From_Trim(calc.potency);
      // } else {
      calc.ethanolCrudeGrams = calc.input.grams;
      calc.price =
        calc.ethanolCrudeGrams *
        Ethanol_Crude_Price_From_Ethanol_Crude(calc.potency);
      // }
      console.log(calc);
      return calc;
    }
  },
  {
    name: 'Hydrocarbon Crude',
    parents: ['Trim'],
    inputType: 'grams',
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
    theMath: calc => {
      calc.price = calc.input.pounds * Dried_Flower_Price(calc.potency);
      return calc;
    }
  },
  {
    name: 'Fresh Frozen',
    parents: [],
    inputType: 'pounds',
    theMath: calc => {
      calc.price = calc.input.pounds * PRICE_FRESH_FROZEN;
      return calc;
    }
  },
  {
    name: 'Cured Resin',
    parents: ['Dried Flower'],
    inputType: 'grams',
    theMath: calc => {
      // calc.grams = poundsToGrams(calc.pounds);
      calc.price = calc.input.grams * CURED_RESIN_PRICE_PER_GRAM;
      return calc;
    }
  },
  {
    name: 'Live Resin',
    parents: ['Fresh Frozen'],
    inputType: 'grams',
    theMath: calc => {
      // calc.grams = poundsToGrams(calc.pounds) * 0.04;
      calc.price = calc.input.grams * LIVE_RESIN_PRICE_PER_GRAM;
      return calc;
    }
  },
  {
    name: 'Distillate',
    parents: ['Ethanol Crude'],
    inputType: 'grams',
    theMath: calc => {
      // if (calc.ethanolCrudeGrams !== undefined) {
      //   calc.grams = calc.ethanolCrudeGrams * 0.8;
      //   calc.price = calc.grams * 7;
      // } else {
      calc.price =
        calc.input.grams * Distillate_Price_From_Distillate(calc.potency);
      // }
      return calc;
    }
  },
  {
    name: 'Distillate Cartridge',
    parents: ['Distillate'],
    inputType: 'grams',
    theMath: calc => {
      calc.price = calc.input.grams * DISTILLATE_CARTRIDGE_PRICE;
      // calc.grams = calc.grams;
      return calc;
    }
  },
  {
    name: 'Sauce Cartridge',
    parents: ['Distillate', 'Cured Resin', 'Live Resin'],
    inputType: 'units',
    theMath: calc => {
      // calc.cartridges = calc.grams * 2;
      calc.price = calc.input.units * SAUCE_CART_PRICE;
      return calc;
    }
  },
  {
    name: 'Jarred Concentrates',
    parents: ['Cured Resin', 'Live Resin'],
    inputType: 'units',
    theMath: calc => {
      // calc.grams = calc.grams;
      calc.price = calc.input.grams * 10;
      return calc;
    }
  },
  {
    name: 'Branded Distillate Cartridge',
    parents: ['Distillate Cartridge'],
    inputType: 'units',
    theMath: calc => {
      // calc.grams = calc.grams;
      calc.price = calc.cartridges * 17;
      return calc;
    }
  },
  {
    name: 'Branded Sauce Cartridge',
    parents: ['Sauce Cartridge'],
    inputType: 'units',
    theMath: calc => {
      // calc.grams = calc.grams;
      calc.price = calc.cartridges * 21;
      return calc;
    }
  },
  {
    name: 'Branded Jarred Concentrates',
    parents: ['Jarred Concentrates'],
    inputType: 'units',
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
