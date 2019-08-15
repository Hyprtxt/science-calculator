import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';

const Item = ({
  children,
  onClick,
  active,
  enabled,
  className,
  buttonRef,
  style
}) => {
  let extraClassName = className;
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
      style={style}
      buttonRef={buttonRef}
      className={`${extraClassName}`}
      onClick={onClick}
      {...disableRipple}
    >
      {children}
    </ButtonBase>
  );
};

const Block = ({ children, name, enabled, active, onClickItem, className }) => {
  const [width, setWidth] = React.useState(0);
  let blockTextStyle = { fontSize: '18px', lineHeight: '22px' };
  const styleRef = React.useCallback(node => {
    if (node !== null) {
      // console.log(node.children[0].children[0].scrollHeight);
      // console.log(node.getBoundingClientRect(), window.devicePixelRatio);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);
  if (width < 150) {
    blockTextStyle.fontSize = '14px';
    blockTextStyle.lineHeight = '18px';
  }
  if (width < 100) {
    blockTextStyle.fontSize = '10px';
    blockTextStyle.lineHeight = '14px';
  }
  // console.log(width, width < 100, blockTextStyle);
  return (
    <Item
      buttonRef={styleRef}
      style={blockTextStyle}
      onClick={e => {
        if (enabled) {
          onClickItem(e);
        }
      }}
      name={name}
      active={active}
      enabled={enabled}
      className={className}
    >
      {children}
    </Item>
  );
};
export default Block;
