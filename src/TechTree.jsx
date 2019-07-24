import React from "react";
// import PropTypes from "prop-types";
import Block from "./Block";
// import setupData from "./util/setupData";

const TechTree = props => {
  const { onClickItem, data } = props;
  return (
    <div className="tech-tree">
      {data.map((item, key) => {
        return (
          <Block
            onClickItem={e => {
              onClickItem(e);
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

// class TechTree extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render = () => {
//
//   };
// }
//
// TechTree.propTypes = {
//   data: PropTypes.any
// };
//
// TechTree.defaultProps = {
//   children: []
// };

export default TechTree;
