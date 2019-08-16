import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import useResizeRect from 'hooks/useResizeRect';

const Block = ({ children, onClickItem, active, enabled, className }) => {
  const buttonRef = React.useRef(null);
  const rect = useResizeRect(buttonRef);
  let blockTextStyle = { fontSize: '18px', lineHeight: '22px' };
  if (rect.width < 150) {
    blockTextStyle.fontSize = '14px';
    blockTextStyle.lineHeight = '18px';
  }
  if (rect.width < 100) {
    blockTextStyle.fontSize = '10px';
    blockTextStyle.lineHeight = '14px';
  }
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
      className={`${extraClassName}`}
      style={blockTextStyle}
      buttonRef={buttonRef}
      onClick={e => {
        if (enabled) {
          onClickItem(e);
        }
      }}
      {...disableRipple}
    >
      {children}
    </ButtonBase>
  );
};

export default Block;
