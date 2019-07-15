import React from "react";

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
    // const parent = this.props.parent;
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

export default Block;
