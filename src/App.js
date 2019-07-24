import React from "react";
import TechTree from "./TechTree";
import RangeInput from "./RangeInput";
import Inspector from "./Inspector";
import initializeCalculator from "./util/initializeCalculator";
import setupData from "./util/setupData";
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
      marketWeight: 1,
      activeItems: [],
      techTreeBlocks: setupData(),
      currentItem: "",
      inputItem: "",
      outputItem: "",
      calculator: initializeCalculator({
        trimAmount: 10,
        potency: 25
      })
    };
    // console.log(names, parent, startDisable, data);
  }

  onClickItemTechTree = e => {
    const { activeItems, techTreeBlocks } = this.state;
    const clicked = e.target.innerText;
    let newActiveItems;
    let newBlocks;
    let targetReset = false;
    console.log(
      activeItems,
      typeof activeItems,
      activeItems[activeItems.length - 1]
    );
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
    // @TODO
    // Need to calculate and update the base MarketValue (baseMarketValue) here.
    // stuff;
    // Initialize processedMarketValue
    // console.log("recalculate Market Value Functions", stuff, stuff.length);
    // console.log(stuff);
    if (stuff.length > 1) {
      stuff.forEach((thing, index) => {
        // console.log(thing, typeof thing, index, calculator);
        // The [0] is cause the pushed functions get an array wrapper... magic?
        mutableCalc = thing[0](calculator, potency);
      });
    }
    this.setState({
      calculator: mutableCalc,
      processedMarketValue: calculator.price,
      marketWeight: calculator.outputWeight
    });
  };

  render() {
    const { state, onClickItem, onClickReset } = this;
    const {
      baseMarketValue,
      // processedMarketValue,
      inputItem,
      outputItem,
      calculator
    } = state;
    return (
      <div className="App">
        <div className="inputs">
          <h2>1. Input Starting Material</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <div>
              <label htmlFor="trim">Pounds of Trim: </label>
              <input
                type="text"
                name="trim"
                value={calculator.pounds}
                onChange={e => {
                  this.onTrimAmountChange(e);
                }}
              />
              &nbsp;lbs.
            </div>
            <RangeInput
              name="potency"
              displayValue={calculator.potency}
              value={10}
              onChangeHandler={e => {
                this.onPotencyChange(e);
              }}
            />
          </form>
        </div>
        <h2>2. Select Your Process</h2>
        <TechTree
          data={this.state.techTreeBlocks}
          onClickItem={this.onClickItemTechTree}
        />
        <div className="clearfix">
          <button className="reset" onClick={onClickReset}>
            Reset Process Selection
          </button>
        </div>
        <form
          className="outputs"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div>
            <label htmlFor="trim">
              Market Value of <strong>{inputItem}</strong>:{" "}
            </label>
            <input
              type="text"
              name="trim"
              value={`$${baseMarketValue}`}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="trim">
              Market Value of <strong>{outputItem}</strong>:{" "}
            </label>
            <input
              type="text"
              name="trim"
              value={`$${calculator.price}`}
              readOnly
            />
          </div>
        </form>
        <Inspector data={this.state} />
      </div>
    );
  }
}

export default App;
