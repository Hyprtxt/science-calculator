import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';

const Item = ({ name, onClick, active, enabled }) => {
  let extraClassName = '';
  if (active) {
    extraClassName += ' active';
  }
  if (enabled) {
    extraClassName += ' enabled';
  }
  let disableRipple = enabled
    ? { disableRipple: false }
    : { disableRipple: true };
  return (
    <ButtonBase
      className={`item ${extraClassName}`}
      onClick={onClick}
      {...disableRipple}
    >
      {name}
    </ButtonBase>
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
