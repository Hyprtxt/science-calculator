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

const Block = props => {
  const { name, enabled, active, onClickItem } = props;
  return (
    <Item
      onClick={e => {
        if (enabled) {
          onClickItem(e);
        }
      }}
      name={name}
      active={active}
      enabled={enabled}
    />
  );
};

export default Block;
