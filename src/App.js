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
      blocks: data
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
  onClickItem() {}
  onClickClearItems() {}
  onTrimAmountChange(e) {
    this.setState({
      trimAmount: e.target.value
    });
  }
  onPotencyChange(e) {
    this.setState({
      potency: e.target.value
    });
  }
  onRecalculate() {}

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
    const marketValueTrim = this.props.marketValueTrim;
    const marketValueDistillate = this.props.marketValueDistillate;
    return (
      <div className="App">
        <TechTree data={this.state.blocks} />
        <div className="inputs">
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
