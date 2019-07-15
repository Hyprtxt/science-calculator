import React from "react";
import PropTypes from "prop-types";
import Block from "./Block";
import data from "./data";

class TechTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
    const names = data.map(item => {
      return item.name;
    });
    const parents = data.map(item => {
      return item.parents.map(parent => {
        return parent;
      });
    });
    console.log(names);
    console.log(parents);
    console.log(data);
  }

  render() {
    const { children } = this.props;
    return (
      <div className="tech-tree">
        {data.map((item, key) => {
          return <Block name={item.name} parents={item.parents} key={key} />;
        })}
        {children}
      </div>
    );
  }
}

TechTree.propTypes = {
  children: PropTypes.any
};

TechTree.defaultProps = {
  children: []
};

export default TechTree;
