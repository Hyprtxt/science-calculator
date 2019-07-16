import React from "react";

const Item = ({ name, onClick, active, enabled }) => {
  let extraClassName = "";
  if (active) {
    extraClassName += " active";
  }
  if (enabled) {
    extraClassName += " enabled";
  }
  return (
    <div className={`item ${extraClassName}`} onClick={onClick}>
      {name}
    </div>
  );
};

class Block extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     active: false
  //     // enabled: false
  //   };
  // }
  // handleActiveToggle(e) {
  //   // console.log("Was Click", e, this.state);
  //   if (this.props.enabled) {
  //     this.setState({
  //       active: !this.state.active
  //     });
  //   }
  // }
  // handleAvailableToggle() {
  //   console.log("Was Click");
  //   this.setState({
  //     enabled: !this.state.enabled
  //   });
  // }
  render(props) {
    const { name, enabled, active, onClickItem } = this.props;
    return (
      <Item
        onClick={e => {
          onClickItem(e);
        }}
        name={name}
        active={active}
        enabled={enabled}
      />
    );
  }
}

export default Block;
