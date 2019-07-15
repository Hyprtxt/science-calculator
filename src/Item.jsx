import React from "react";
import PropTypes from "prop-types";
import "./item.css";

class Hyperspace extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return <div ref={this.myRef}>{children}</div>;
  }
}

Hyperspace.propTypes = {
  children: PropTypes.any
};

Hyperspace.defaultProps = {
  children: []
};

export default Hyperspace;
