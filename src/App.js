import React from "react";
import setupData from "./util/setupData";
import TechTree from "./components/TechTree";
import Inspector from "./components/Inspector";
import ResetButton from "./components/ResetButton";
import CalculatorOutput from "./components/CalculatorOutput";
import CalculatorInputs from "./components/CalculatorInputs";
// import _ from "lodash";

function App() {
  return <Calculator />;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      baseMarketValue: 100,
      processedMarketValue: 1000,
      // weightInputValue: 1,
      activeItems: [],
      currentItem: "",
      inputItem: "",
      outputItem: "",
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
    const clicked = e.target.innerText;
    let newActiveItems;
    let newBlocks;
    let targetReset = false;
    // console.log(
    //   activeItems,
    //   typeof activeItems,
    //   activeItems[activeItems.length - 1]
    // );
    if (clicked === activeItems[activeItems.length - 1]) {
      newActiveItems = activeItems.splice(activeItems.length - 1, 1);
      targetReset = true;
    } else {
      newActiveItems = activeItems.concat([clicked]);
    }
    if (targetReset) {
      newBlocks = techTreeBlocks;
    } else {
      newBlocks = techTreeBlocks.map(item => {
        if (item.name === e.target.innerText) {
          item.active = true;
          item.enabled = true;
        } else {
          // item.active = false;
          item.enabled = false;
          if (item.parents.indexOf(e.target.innerText) !== -1) {
            item.enabled = true;
          }
        }
        return item;
      });
    }
    // if (typeof activeItems === "Array")
    this.setState(
      {
        activeItems: newActiveItems,
        techTreeBlocks: newBlocks
      },
      () => {
        console.log("GOTCLICK", this.state);
        this.recalculate();
      }
    );
    // }
    // Check for double Click
  };

  onClickReset = e => {
    this.setState(
      {
        techTreeBlocks: setupData(),
        activeItems: [],
        currentItem: ""
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
    // console.log("recalculate", state);
    const { calculator, activeItems, techTreeBlocks, potency } = state;

    // Put all the functions we need into an array.
    const stuff = activeItems.map(itemName => {
      return techTreeBlocks.reduce((result, element, index) => {
        if (element.name === itemName) {
          // console.log(typeof element.function, element.function, result);
          // These functions seem to be wrapped in an array that I can't get rid of.
          result.push(element.function);
        }
        return result;
      }, []);
    });
    let mutableCalc = calculator;
    let mutableCalc1 = calculator;
    // @TODO
    // Need to calculate and update the base MarketValue (baseMarketValue) here.
    // stuff;
    // Initialize processedMarketValue
    // console.log("recalculate Market Value Functions", stuff, stuff.length);
    // console.log(stuff);
    console.log(mutableCalc);
    if (stuff.length > 1) {
      stuff.forEach((thing, index) => {
        console.log(thing, typeof thing, index, calculator);
        // The [0] is cause the pushed functions get an array wrapper... magic?
        mutableCalc = thing[0](calculator, potency);
      });
      console.log(stuff[0][0], stuff[0][0](calculator, potency));
      mutableCalc1 = stuff[0][0](calculator, potency);
    }
    console.log(mutableCalc, mutableCalc1);
    this.setState({
      calculator: mutableCalc,
      processedMarketValue: calculator.price,
      weightInputValue: calculator.outputWeight
    });
  };

  render() {
    const { state, onClickItemTechTree, onClickReset } = this;
    const {
      // baseMarketValue,
      // processedMarketValue,
      inputItem,
      outputItem,
      calculator
    } = state;
    return (
      <div className="App">
        <CalculatorInputs
          onTrimAmountChange={this.onTrimAmountChange}
          pounds={calculator.pounds}
          onPotencyChange={this.onPotencyChange}
          potency={calculator.potency}
        />
        <h2>2. Select Your Process</h2>
        <TechTree
          data={state.techTreeBlocks}
          onClickItem={onClickItemTechTree}
        />
        <ResetButton onClick={onClickReset}>
          Reset Process Selection
        </ResetButton>
        <CalculatorOutput
          inputItem={inputItem}
          inputItemPrice={calculator.inputItemPrice}
          outputItem={outputItem}
          outputItemPrice={calculator.price}
        />
        <Inspector data={this.state} />
      </div>
    );
  }
}

export default App;
