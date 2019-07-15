import React from "react";

class RangeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 25
    };
  }
  handleOnChange(e) {
    this.setState({
      value: e.target.value
    });
  }
  render(props) {
    return (
      <div className="range-input">
        <label htmlFor="trim">Potency</label>
        <input
          type="range"
          min="1"
          max="100"
          step="1"
          name="potency"
          defaultValue={this.state.value}
          onChange={e => {
            this.handleOnChange(e);
          }}
        />
        <span>{this.state.value}%</span>
      </div>
    );
  }
}

export default RangeInput;
