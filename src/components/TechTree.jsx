import React from 'react';
import PropTypes from 'prop-types';
import Block from './Block';
// import setupData from "./util/setupData";

// <CSSTransition
//   in={item.enabled}
//   timeout={800}
//   classNames="thing"
//   key={key}
// ></CSSTransition>

// import {
//   Transition,
//   TransitionGroup,
//   CSSTransition
// } from 'react-transition-group';
// <CSSTransition
//   in={item.enabled || item.active}
//   timeout={500}
//   classNames="item"
// ></CSSTransition>

const TechTree = props => {
  const { onClickItem, data } = props;
  return (
    <div className="tech-tree">
      {data.map((item, key) => (
        <Block
          className={''}
          key={key}
          onClickItem={onClickItem}
          name={item.name}
          parents={item.parents}
          enabled={item.enabled}
          active={item.active}
        />
      ))}
    </div>
  );
};

TechTree.propTypes = {
  data: PropTypes.array,
  onClickItemTechTree: PropTypes.func
};

export default TechTree;
