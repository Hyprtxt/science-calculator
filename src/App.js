import React from "react";
import TechTree from "./TechTree";
import RangeInput from "./RangeInput";
import Inspector from "./Inspector";
import setupData from "./data";
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
      activeItems: [],
      currentItem: "",
      inputItem: "",
      outputItem: "",
      blocks: setupData()
    };
    // console.log(names, parent, startDisable, data);
  }
  onClickItem = e => {
    const {
      trimAmount,
      inputItem,
      // outputItem,
      activeItems,
      currentItem,
      marketValueOutput,
      blocks
    } = this.state;
    if (currentItem === e.target.innerText) {
      // Clicked Active Item
      // Do Nothing
      return;
      // Should Probably Reverse Click Action Here
    }
    console.log(blocks, activeItems);
    // const here = this;
    // e.persist();
    // console.log("onClickItem", e, e.target.innerText);

    // const names = blocks.map(item => {
    //   return item.name;
    // });
    // const parents = _.uniq(
    //   blocks.flatMap((current, index, array) => {
    //     return current.parents;
    //   })
    // );
    // const startDisabled = _.difference(names, parents);
    // let enabled = false;
    // if (startDisabled.indexOf(item.name) === -1) {
    //   enabled = true;
    // }
    // console.log(startDisabled.indexOf(item.name), item.name);
    // console.log(item.name, enabled);

    // Reverse Current Selection...
    // if (e.target.innerText === activeItems[0]) {
    //   this.setState({
    //     activeItems: [],
    //     currentItem: ""
    //   });
    // } else {
    // }

    // Set or Keep inputItem value
    let inputItemValue;
    if (inputItem === "") {
      inputItemValue = e.target.innerText;
    } else {
      inputItemValue = inputItem;
    }

    const stuff = activeItems.concat([e.target.innerText]).map(itemName => {
      return blocks.reduce((result, element) => {
        if (element.name === itemName) {
          result.push(element.function);
        }
        return result;
      }, []);
    });
    let newMarketValueOutput = marketValueOutput;
    if (stuff.length > 0) {
      stuff.forEach((item, index) => {
        console.log(item, index, newMarketValueOutput);
        newMarketValueOutput = item[0](newMarketValueOutput);
      });
    }

    console.log("NOTHING", stuff);
    this.setState({
      activeItems: activeItems.concat([e.target.innerText]),
      currentItem: e.target.innerText,
      inputItem: inputItemValue,
      marketValueInput: 10,
      marketValueOutput: newMarketValueOutput,
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
    });
  };
  onClickReset = e => {
    this.setState({
      blocks: setupData(),
      activeItems: [],
      currentItem: ""
    });
  };
  onTrimAmountChange = e => {
    this.setState({
      trimAmount: e.target.value
    });
  };
  onPotencyChange = e => {
    this.setState({
      potency: e.target.value
    });
  };
  recalculate = e => {
    console.log("recalculate");
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
    const { marketValueInput, marketValueOutput } = state;
    return (
      <div className="App">
        <h2>2. Select Your Process</h2>
        <TechTree data={this.state.blocks} onClickItem={onClickItem} />
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
          <div>
            <button onClick={onClickReset}>Reset Process Selection</button>
          </div>
        </div>
        <form
          className="outputs"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div>
            <label htmlFor="trim">
              Market Value of <strong>input</strong>:{" "}
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
              Market Value of <strong>output</strong>:{" "}
            </label>
            <input
              type="text"
              name="trim"
              value={`$${marketValueOutput}`}
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
