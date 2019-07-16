import React from "react";
import PropTypes from "prop-types";
import Block from "./Block";

const TechTree = props => {
  const { data, onClickItem } = props;
  return (
    <div className="tech-tree">
      {data.map((item, key) => {
        return (
          <Block
            onClickItem={onClickItem}
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

TechTree.propTypes = {
  data: PropTypes.any
};

TechTree.defaultProps = {
  children: []
};

export default TechTree;
