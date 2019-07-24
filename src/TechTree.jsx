import React from "react";
import PropTypes from "prop-types";
import Block from "./Block";

class TechTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItems: []
    };
  }
  onClickItemTechTree = e => {
    const { activeItems } = this.state;
    const clicked = e.target.innerText;
    let newActiveItems;
    console.log(
      activeItems,
      typeof activeItems,
      activeItems[activeItems.length - 1]
    );
    if (clicked === activeItems[activeItems.length - 1]) {
      newActiveItems = activeItems.splice(activeItems.length - 1, 1);
    } else {
      newActiveItems = activeItems.concat([clicked]);
    }
    // if (typeof activeItems === "Array") {
    this.setState(
      {
        activeItems: newActiveItems
      },
      () => {
        console.log("GOTCLICK", this.state);
      }
    );
    // }
    // Check for double Click
  };
  render = () => {
    const { props } = this;
    const { data, onClickItem } = props;
    return (
      <div className="tech-tree">
        {data.map((item, key) => {
          return (
            <Block
              onClickItem={e => {
                onClickItem(e);
                this.onClickItemTechTree(e);
              }}
              name={item.name}
              parents={item.parents}
              key={key}
              enabled={item.enabled}
              active={item.active}
            />
          );
        })}
      </div>
    );
  };
}

TechTree.propTypes = {
  data: PropTypes.any
};

TechTree.defaultProps = {
  children: []
};

export default TechTree;
