import React from "react";
import PropTypes from "prop-types";
import Block from "./Block";
import _ from "lodash";

class TechTree extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // const names = props.data.map(item => {
  //   //   return item.name;
  //   // });
  //   // const parents = _.uniq(
  //   //   props.data.flatMap((current, index, array) => {
  //   //     return current.parents;
  //   //   })
  //   // );
  //   // const startDisabled = _.difference(names, parents);
  //   // console.log(names);
  //   // console.log(parents);
  //   // console.log(startDisabled);
  //   // console.log(props.data);
  // }

  render() {
    const { data, onClickItem } = this.props;
    const names = data.map(item => {
      return item.name;
    });
    const parents = _.uniq(
      data.flatMap((current, index, array) => {
        return current.parents;
      })
    );
    const startDisabled = _.difference(names, parents);
    // console.log("startDisabled", startDisabled);
    return (
      <div className="tech-tree">
        {data.map((item, key) => {
          // let enabled = false;
          // if (startDisabled.indexOf(item.name) === -1) {
          //   enabled = true;
          // }
          // console.log(startDisabled.indexOf(item.name), item.name);
          // console.log(item.name, enabled);
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
  }
}

TechTree.propTypes = {
  children: PropTypes.any
};

TechTree.defaultProps = {
  children: []
};

export default TechTree;
