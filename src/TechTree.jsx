import React from "react";
import PropTypes from "prop-types";
import "./item.css";

class TechTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
  }

  render() {
    const { children } = this.props;
    return <div className="tech-tree">{children}</div>;
  }
}

TechTree.propTypes = {
  children: PropTypes.any
};

TechTree.defaultProps = {
  children: []
};

export default TechTree;
