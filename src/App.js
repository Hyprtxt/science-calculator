import React from "react";
import "./App.css";
import TechTree from "./TechTree";

function App() {
  return (
    <div className="App">
      <TechTree>
        <div className="row">
          <Block name="Trim" parents={[]} />
        </div>
        <div className="row">
          <Block name="Ethanol Crude" parents={["Trim"]} />
          <Block name="Hydrocarbon Crude" parents={["Trim"]} />
          <Block name="Dried Flower" parents={[]} />
          <Block name="Fresh Frozen" parents={[]} />
        </div>
        <div className="row">
          <Block name="Cured Resin" parents={["Dried Flower"]} />
          <Block name="Live Resin" parents={["Fresh Frozen"]} />
          <Block name="Distillate" parents={["Ethanol Crude"]} />
        </div>
        <div className="row">
          <Block name="Distillate Cartridge" parents={["Distillate"]} />
          <Block
            name="Sauce Cartridge"
            parents={["Distillate", "Cured Resin", "Live Resin"]}
          />
          <Block
            name="Jarred Concentrates"
            parents={["Cured Resin", "Live Resin"]}
          />
        </div>
        <div className="row">
          <Block
            name="Branded Distillate Cartridge"
            parents={["Distillate Cartridge"]}
          />
          <Block name="Branded Sauce Cartridge" parents={["Sauce Cartridge"]} />
          <Block
            name="Branded Jarred Concentrates"
            parents={["Jarred Concentrates"]}
          />
        </div>
      </TechTree>
    </div>
  );
}

const Item = ({ name, className, onClick }) => {
  return (
    <div className={`item ${className}`} onClick={onClick}>
      {name}
    </div>
  );
};

class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      available: false
    };
  }
  handleActiveToggle() {
    console.log("Was Click");
    this.setState({
      active: !this.state.active
    });
  }
  handleAvailableToggle() {
    console.log("Was Click");
    this.setState({
      available: !this.state.available
    });
  }
  render(props) {
    const parent = this.props.parent;
    const active = this.state.active;
    const available = this.state.available;
    let className = "";
    if (active) {
      className = "active";
    }
    if (available) {
      className = "available";
    }
    // if (parent === true) {
    //   className = "";
    // } else {
    //   className = "available";
    // }
    return (
      <Item
        onClick={() => this.handleActiveToggle()}
        className={className}
        name={this.props.name}
      />
    );
  }
}

export default App;
