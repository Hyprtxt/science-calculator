import React from "react";
import TechTree from "./TechTree";
import RangeInput from "./RangeInput";
import Inspector from "./Inspector";
import data from "./data";
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
      marketValueTrim: 100,
      marketValueDistillate: 1000,
      activeItems: [],
      inputItem: "",
      outputItem: "",
      blocks: data.map(item => {
        item.active = false;
        item.enabled = false;
        return item;
      })
    };
    // const names = data.map(item => {
    //   return item.name;
    // });
    // const parents = _.uniq(
    //   data.flatMap((current, index, array) => {
    //     return current.parents;
    //   })
    // );
    // const startDisabled = _.difference(names, parents);
    // console.log(names);
    // console.log(parents);
    // console.log(startDisabled);
    // console.log(data);
  }
  onClickItem = e => {
    const { activeItems, inputItem, blocks } = this.state;
    console.log(blocks);
    // const here = this;
    // e.persist();
    // console.log("onClickItem", e, e.target.innerText);

    if (e.target.innerText === activeItems[0]) {
      this.setState({
        activeItems: [],
        inputItem: ""
      });
    } else {
      this.setState({
        activeItems: [e.target.innerText],
        inputItem: e.target.innerText,
        blocks: blocks.map(item => {
          if (item.name === e.target.innerText) {
            item.active = true;
            item.enabled = true;
          } else {
            if (item.parents.indexOf(e.target.innerText) !== -1) {
              item.enabled = true;
            }
          }
          return item;
        })
      });
    }
  };
  onClickReset = e => {
    console.log("onClickReset", e);
  };
  onClickClearItems = e => {};
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
  onRecalculate = e => {};

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
    const { props, onClickItem, onClickReset } = this;
    const { marketValueTrim, marketValueDistillate } = props;
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
              value={`$${marketValueTrim}`}
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
              value={`$${marketValueDistillate}`}
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
