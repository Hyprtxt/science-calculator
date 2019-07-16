import React from "react";
import TechTree from "./TechTree";
import RangeInput from "./RangeInput";
import Inspector from "./Inspector";
import setupData from "./util/data";
import initializeCalculator from "./util/initialize";
// import _ from "lodash";

function App() {
  return <Calculator />;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trimAmount: 10,
      trimUnit: "pounds",
      potency: 25,
      marketValueInput: 100,
      marketValueOutput: 1000,
      marketWeight: 1,
      activeItems: [],
      currentItem: "",
      inputItem: "",
      outputItem: "",
      blocks: setupData()
    };
    // console.log(names, parent, startDisable, data);
  }
  onClickItem = e => {
    const { state } = this;
    const {
      trimAmount,
      inputItem,
      // outputItem,
      activeItems,
      currentItem,
      // marketValueOutput,
      potency,
      blocks
    } = state;
    if (currentItem === e.target.innerText) {
      // Clicked Active Item
      // Do Nothing
      return;
      // Should Probably Reverse Click Action Here
    }
    // console.log(blocks, activeItems);
    // e.persist();

    // Set or Keep inputItem value
    let inputItemValue;
    if (inputItem === "") {
      inputItemValue = e.target.innerText;
    } else {
      inputItemValue = inputItem;
    }
    // Set outputItem Value
    let outputItemValue;
    if (inputItem !== "") {
      outputItemValue = e.target.innerText;
    }

    this.setState(
      {
        activeItems: activeItems.concat([e.target.innerText]),
        currentItem: e.target.innerText,
        inputItem: inputItemValue,
        outputItem: outputItemValue,
        // marketValueInput: 10,
        // marketValueOutput: newMarketValueOutput,
        // blocks.map(item => {
        //   return item.function(trimAmount)
        // })
        blocks: blocks.map(item => {
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
        })
      },
      () => {
        this.recalculate();
      }
    );
  };
  onClickReset = e => {
    this.setState(
      {
        blocks: setupData(),
        activeItems: [],
        currentItem: ""
      },
      () => {
        this.recalculate();
      }
    );
  };
  onTrimAmountChange = e => {
    this.setState(
      {
        trimAmount: e.target.value
      },
      () => {
        this.recalculate();
      }
    );
  };
  onPotencyChange = e => {
    this.setState(
      {
        potency: e.target.value
      },
      () => {
        this.recalculate();
      }
    );
  };
  recalculate = () => {
    const { currentItem } = this.state;
    // currentItem
    const { state } = this;
    const { activeItems, blocks, trimAmount, potency } = state;
    const stuff = activeItems.concat([currentItem]).map(itemName => {
      return blocks.reduce((result, element) => {
        if (element.name === itemName) {
          result.push(element.function);
        }
        return result;
      }, []);
    });
    // Initialize MarketValueOutput
    let input = initializeCalculator(state);
    // console.log("recalculate Market Value Functions", stuff, stuff.length);
    if (stuff.length > 1) {
      stuff.forEach((item, index) => {
        // console.log(item, index, input);
        input = item[0](input, potency);
      });
    }
    this.setState({
      marketValueOutput: input.price,
      marketWeight: input.outputWeight
    });
  };

  render() {
    // const { children } = this.props;
    // return (
    //   <div className="tech-tree">
    //     {data.map((item, key) => {
    //       return <Block name={item.name} parents={item.parents} key={key} />;
    //     })}
    //     {children}
    //   </div>
    // );
    const { state, onClickItem, onClickReset } = this;
    const {
      marketValueInput,
      marketValueOutput,
      inputItem,
      outputItem
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
                value={this.state.trimAmount}
                onChange={e => {
                  this.onTrimAmountChange(e);
                }}
              />
              &nbsp;lbs.
            </div>
            <RangeInput
              name="potency"
              displayValue={this.state.potency}
              value={10}
              onChangeHandler={e => {
                this.onPotencyChange(e);
              }}
            />
          </form>
        </div>
        <h2>2. Select Your Process</h2>
        <TechTree data={this.state.blocks} onClickItem={onClickItem} />
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
              value={`$${marketValueInput}`}
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
              value={`$${marketValueOutput.price}`}
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
