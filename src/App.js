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
      calculator: {
        inputItemPrice: 0,
        price: 0,
        grams: 0,
        cartridges: 0,
        pounds: 10,
        potency: 25
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
    // let targetReset = false;
    if (clickedItemString === activeItems[activeItems.length - 1]) {
      console.log("ACTIVE ITEM CLICK - STEP BACK", newActiveItems, activeItems);
      newActiveItems = activeItems;
      resetBlockString = activeItems.splice(activeItems.length - 1, 1)[0];
      activeBlockString = activeItems[activeItems.length - 1];
      // targetReset = true;
      console.log("ACTIVE ITEM CLICK - STEP BACK", newActiveItems, activeItems);
    } else {
      newActiveItems = activeItems.concat([clickedItemString]);
      activeBlockString = clickedItemString;
    }
    console.log(
      // targetReset,
      clickedItemString,
      resetBlockString,
      activeBlockString,
      "targetReset",
      newActiveItems,
      activeItems
    );
    // } else {
    console.log("resetBlockString", resetBlockString);
    newBlocks = techTreeBlocks.map(item => {
      if (resetBlockString !== undefined) {
        if (item.name === clickedItemString) {
          item.active = false;
          item.enabled = true;
        } else if (item.name === activeBlockString) {
          item.active = true;
          item.enabled = true;
        } else {
          // item.active = false;
          item.enabled = false;
          if (item.parents.indexOf(activeBlockString) !== -1) {
            item.enabled = true;
          }
        }
      } else {
        if (item.name === clickedItemString) {
          item.active = true;
          item.enabled = true;
        } else {
          // item.active = false;
          item.enabled = false;
          if (item.parents.indexOf(activeBlockString) !== -1) {
            item.enabled = true;
          }
        }
      }
      return item;
    });
    // if (resetBlockString !== "") {
    //   newBlocks = newBlocks.map(item => {
    //
    //     //
    //     //     if (item.name === resetBlockString) {
    //     //       item.active = false;
    //     //       item.enabled = false;
    //     //     } else {
    //     //       // item.active = false;
    //     //       item.enabled = false;
    //     //       if (item.parents.indexOf(activeBlockString) !== -1) {
    //     //         item.enabled = true;
    //     //       }
    //     //     }
    //     return item;
    //   });
    // }
    // }
    this.setState(
      {
        activeItems: newActiveItems,
        techTreeBlocks: newBlocks
      },
      () => {
        this.recalculate();
      }
    );
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

  onTrimAmountChange = e => {
    const { calculator } = this.state;
    calculator.pounds = e.target.value;
    this.setState(
      {
        trimAmount: e.target.value,
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
      onTrimAmountChange,
      onPotencyChange
    } = this;
    const { techTreeBlocks, activeItems, calculator } = state;
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
            onTrimAmountChange={onTrimAmountChange}
            pounds={calculator.pounds}
            onPotencyChange={onPotencyChange}
            potency={calculator.potency}
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
