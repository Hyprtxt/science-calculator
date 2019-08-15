import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';

const Item = ({ children, onClick, active, enabled, className, buttonRef }) => {
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
      buttonRef={buttonRef}
      className={`${extraClassName}`}
      onClick={onClick}
      {...disableRipple}
    >
      {children}
    </ButtonBase>
  );
};

class Block extends React.Component {
  constructor(props) {
    super(props);
    this.blockElement = null;
    this.blockStyle = { fontSize: '16px' };
    this.setBlockRef = element => {
      this.blockElement = element;
    };
  }
  // const [width, setWidth] = React.useState(0);

  // if (blockElement !== null) {
  //   blockTextStyle.fontSize = 10 + 'px';
  //   console.log(blockElement.scrollWidth, 'blockElement');
  //   // console.log(document.querySelector('.fixed-bottom').scrollHeight);
  // }
  componentDidMount() {
    console.log(this.blockElement, this.blockElement.clientWidth);
    if (this.blockElement.clientWidth < 110) {
      this.blockStyle.fontSize = '10px';
    }
  }

  render() {
    const { props } = this;
    const { children, name, enabled, active, onClickItem, className } = props;

    // let blockTextStyle = ;

    // document.querySelector('.crude-extract').scrollWidth
    // style={blockTextStyle}
    return (
      <Item
        onClick={e => {
          if (enabled) {
            onClickItem(e);
          }
        }}
        style={this.blockStyle}
        buttonRef={this.setBlockRef}
        name={name}
        active={active}
        enabled={enabled}
        className={className}
      >
        {children}
      </Item>
    );
  }
}

export default Block;
