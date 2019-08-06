import React from "react";
import setupData from "./util/setupData";
import TechTree from "./components/TechTree";
import Inspector from "./components/Inspector";
import ResetButton from "./components/ResetButton";
import CalculatorOutput from "./components/CalculatorOutput";
import CalculatorInputs from "./components/CalculatorInputs";
import _ from "lodash";

function App() {
  return <Calculator />;
}

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

  onAmountChange = (e, thing) => {
    let { calculator } = this.state;
    calculator.input[thing] = e.target.value;
    this.setState(
      {
        calculator: calculator
      },
      () => {
        this.recalculate();
      }
    );
  };

  onPotencyChange = e => {
    const { calculator } = this.state;
    calculator.potency = e.target.value;
    this.setState(
      {
        potency: e.target.value,
        calculator: calculator
      },
      () => {
        this.recalculate();
      }
    );
  };

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
    if (stuff.length > 1) {
      stuff.forEach((thing, index) => {
        // console.log(thing, typeof thing, index, calculator);
        // The [0] is cause the pushed functions get an array wrapper... magic?
        mutableCalc = thing[0](calculator, potency);
      });
    }
    if (stuff.length === 1) {
      mutableCalc.inputItemPrice = _.find(techTreeBlocks, {
        name: activeItems[0]
      }).theMath(calculator).price;
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
    return (
      <div className="App">
        <h2>1. Select Your Process</h2>
        <TechTree data={techTreeBlocks} onClickItem={onClickItemTechTree} />
        <ResetButton onClick={onClickReset}>
          Reset Process Selection
        </ResetButton>
        <div className="inputs">
          <h2>2. Input Starting Material</h2>
          <CalculatorInputs
            currentInputType={currentInputType}
            onAmountChange={onAmountChange}
            pounds={pounds}
            grams={grams}
            units={units}
            onPotencyChange={onPotencyChange}
            potency={potency}
          />
        </div>
        <CalculatorOutput
          inputItem={activeItems[0]}
          inputItemPrice={calculator.inputItemPrice}
          outputItem={activeItems[activeItems.length - 1]}
          outputItemPrice={calculator.price}
        />
        <Inspector data={state} />
      </div>
    );
  }
}

export default App;
