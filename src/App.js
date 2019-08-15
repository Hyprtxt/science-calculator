import React from 'react';
import _ from 'lodash';
import setupData from './util/setupData';
// import TechTree from './components/TechTree';
import Inspector from './components/Inspector';
import ResetButton from './components/ResetButton';
import CalculatorOutput from './components/CalculatorOutput';
import CalculatorInputs from './components/CalculatorInputs';
import Hide from './components/Hide';
import FlowChart from './components/FlowChart';
import 'array-flat-polyfill';

const DEBOUNCE_TIME = 5;

const App = () => {
  return <Calculator />;
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItems: [],
      currentInputType: undefined, // string
      calculator: {
        inputItemPrice: 0,
        price: 0,
        grams: 0,
        cartridges: 0,
        potency: 25,
        input: {
          pounds: 10,
          grams: 10,
          units: 10
        }
      },
      techTreeBlocks: setupData()
    };
    // console.log(names, parent, startDisable, data);
  }

  setupDefaults = (techTreeBlocks, clickedItemString) => {
    const currentInputDefaults = _.find(techTreeBlocks, {
      name: clickedItemString
    });
    // console.log(
    //   'First Tech Tree Click, Setup Default State Controls',
    //   // _.find(techTreeBlocks, {
    //   //   name: clickedItemString
    //   // }).defaults
    //   currentInputDefaults.defaults.weightDefault,
    //   currentInputDefaults.defaults.potencyDefault,
    //   currentInputDefaults.inputType,
    //   clickedItemString
    // );
    this.onAmountChange(
      currentInputDefaults.defaults.weightDefault,
      'code-trigger',
      currentInputDefaults.inputType
    );
    this.onPotencyChange(currentInputDefaults.defaults.potencyDefault);
    return;
  };

  onClickItemTechTree = e => {
    const { activeItems, techTreeBlocks } = this.state;
    const clickedItemString = e.target.innerText;
    let newActiveItems;
    let newBlocks;
    let resetBlockString;
    let activeBlockString;
    let theInputType;
    // check if (this) TechTree is empty, need to setupData() to get START_DISABLED stuff
    if (clickedItemString === activeItems[activeItems.length - 1]) {
      // console.log("ACTIVE ITEM CLICK - STEP BACK", newActiveItems, activeItems);
      newActiveItems = activeItems;
      resetBlockString = activeItems.splice(activeItems.length - 1, 1)[0];
      activeBlockString = activeItems[activeItems.length - 1];
      // console.log("ACTIVE ITEM CLICK - STEP BACK", newActiveItems, activeItems);
      if (activeItems.length === 0) {
        // RESET GRID FULLY && BAIL
        this.setState(
          {
            currentInputType: undefined,
            activeItems: [],
            techTreeBlocks: setupData()
          },
          () => {
            this.recalculate();
          }
        );
        return;
      }
    } else {
      if (activeItems.length === 0) {
        this.setupDefaults(techTreeBlocks, clickedItemString);
      }
      newActiveItems = activeItems.concat([clickedItemString]);
      activeBlockString = clickedItemString;
    }
    // console.log(
    //   // targetReset,
    //   clickedItemString,
    //   resetBlockString,
    //   activeBlockString,
    //   "targetReset",
    //   newActiveItems,
    //   activeItems
    // );
    // console.log("resetBlockString", resetBlockString);
    newBlocks = techTreeBlocks.map(item => {
      if (item.name === newActiveItems[0]) {
        theInputType = item.inputType;
      }
      if (item.name === clickedItemString && resetBlockString !== undefined) {
        // If Re Click, Setting CURRENT as Child
        item.active = false;
        item.enabled = true;
      } else if (
        item.name === activeBlockString &&
        resetBlockString !== undefined
      ) {
        // If Re Click, Setting Parent as CURRENT
        item.active = true;
        item.enabled = true;
      } else if (
        item.name === clickedItemString &&
        resetBlockString === undefined
      ) {
        // If New Click, Setting CURRENT as CURRENT
        item.active = true;
        item.enabled = true;
      } else {
        // Everything Else
        // item.active = false;
        item.enabled = false;
        if (item.parents.indexOf(activeBlockString) !== -1) {
          // If parent is CURRENT, ENABLE
          item.enabled = true;
        }
      }
      return item;
    });
    this.setState(
      {
        currentInputType: theInputType,
        activeItems: newActiveItems,
        techTreeBlocks: newBlocks
      },
      () => {
        this.recalculate();
      }
    );
    return;
  };

  onClickReset = e => {
    // @TODO Inputs & Sliders Don't Get Hidden
    this.setState(
      {
        techTreeBlocks: setupData(),
        activeItems: []
      },
      () => {
        this.recalculate();
      }
    );
  };

  onAmountChange = _.debounce((newValue, source, currentInputType) => {
    // console.log('onAmountChange', newValue, source, currentInputType);
    let { calculator } = this.state;
    calculator.input[currentInputType] = newValue;
    this.setState(
      {
        calculator: calculator
      },
      () => {
        this.recalculate();
      }
    );
  }, DEBOUNCE_TIME);

  onPotencyChange = _.debounce(newValue => {
    let { calculator } = this.state;
    calculator.potency = newValue;
    this.setState(
      {
        calculator: calculator
      },
      () => {
        this.recalculate();
      }
    );
  }, DEBOUNCE_TIME);

  // const [value, setValue] = React.useState(7);
  // // const disabled = isReadonly ? { disabled: 'disabled' } : {};
  //
  // const handleSliderChange = (e, newValue) => {
  //   setValue(newValue === '' ? '' : Number(newValue));
  //   onChangeHandler(newValue);
  //   // console.log('DEBOUNCE HERE');
  //   // updateParent(newValue);
  // };
  //
  // const handleInputChange = e => {
  //   setValue(e.target.value === '' ? '' : Number(e.target.value));
  //   // _.debounce(() => {    }, 500);
  //   onChangeHandler(e.target.value);
  // };
  //
  // const handleBlur = e => {
  //   // console.log('BLUR', e.target.value);
  //
  //   setValue(
  //     previousValue => {
  //       if (previousValue < minimumValue) {
  //         return minimumValue;
  //       } else if (previousValue > maximumValue) {
  //         return maximumValue;
  //       }
  //     },
  //     () => {
  //       onChangeHandler(e.target.value);
  //     }
  //   );
  // };

  recalculate = () => {
    const { state } = this;
    const { calculator, activeItems, techTreeBlocks, potency } = state;
    // Put all the functions we need into an array.
    const stuff = activeItems.map(itemName => {
      return techTreeBlocks.reduce((result, element, index) => {
        if (element.name === itemName) {
          // console.log(typeof element.theMath, element.theMath, result);
          // These functions seem to be wrapped in an array that I can't get rid of.
          result.push(element.theMath);
        }
        return result;
      }, []);
    });
    let mutableCalc = calculator;
    let inputPriceCalculator = {};

    if (stuff.length > 1) {
      stuff.forEach((thing, index) => {
        // console.log(thing, typeof thing, index, calculator);
        // The [0] is cause the pushed functions get an array wrapper... magic?
        mutableCalc = thing[0](calculator, potency);
      });
    }
    // Shuck off non-input values to simulate first run and (re)calculate inputItemPrice
    inputPriceCalculator.input = calculator.input;
    inputPriceCalculator.potency = calculator.potency;
    if (stuff.length >= 1) {
      mutableCalc.inputItemPrice = _.find(techTreeBlocks, {
        name: activeItems[0]
      }).theMath(inputPriceCalculator).price;
    }
    this.setState({
      calculator: mutableCalc
    });
  };

  render() {
    const {
      state,
      onClickItemTechTree,
      onClickReset,
      onAmountChange,
      onPotencyChange
    } = this;
    const { calculator, techTreeBlocks, activeItems, currentInputType } = state;
    const { input, potency } = calculator;
    const { pounds, grams, units } = input;
    let inputDefaults = _.find(techTreeBlocks, {
      name: activeItems[0]
    });
    if (inputDefaults !== undefined) {
      inputDefaults = _.find(techTreeBlocks, {
        name: activeItems[0]
      }).defaults;
    }
    // console.log(inputDefaults, 'inputDefaults');
    let HelperText;
    switch (activeItems.length) {
      case 0:
        HelperText = <p>Please select your input material above.</p>;
        break;
      case 1:
        HelperText = (
          <p>Adjust the amount and potencty of your starting material.</p>
        );
        break;
      case 2:
        HelperText = <p>Profit!</p>;
        break;
      default:
        HelperText = <React.Fragment />;
        break;
    }
    let scrollableStyle = { marginBottom: '70px' };
    if (document.querySelector('.fixed-bottom') !== null) {
      scrollableStyle.marginBottom =
        document.querySelector('.fixed-bottom').scrollHeight + 'px';
      // console.log(document.querySelector('.fixed-bottom').scrollHeight);
    }
    return (
      <div className="wordpress">
        <div className="App">
          {/* <h2>1. Select Your Process</h2> */}
          <div className="scrollable" style={scrollableStyle}>
            <FlowChart
              data={techTreeBlocks}
              onClickItem={onClickItemTechTree}
            />
            {/* <TechTree data={techTreeBlocks} onClickItem={onClickItemTechTree} /> */}
            <div className="clearfix"></div>
          </div>
          <div className="fixed-bottom">
            <div className="inputs">
              {/* <h2>2. Input Starting Material</h2> */}
              {HelperText}

              <CalculatorInputs
                inputItem={activeItems[0]}
                currentInputType={currentInputType}
                onAmountChange={onAmountChange}
                onPotencyChange={onPotencyChange}
                pounds={pounds}
                grams={grams}
                units={units}
                potency={potency}
                inputDefaults={inputDefaults}
                inputValues={input}
                inputItemPrice={calculator.inputItemPrice}
              />
            </div>
            <CalculatorOutput
              activeItemsLength={activeItems.length}
              outputItem={activeItems[activeItems.length - 1]}
              outputItemPrice={calculator.price}
            />
          </div>

          <Hide>
            <br />
            <ResetButton onClick={onClickReset}>
              Reset Process Selection
            </ResetButton>
            <Inspector data={state} disable={true} />
          </Hide>
        </div>
      </div>
    );
  }
}

export default App;
