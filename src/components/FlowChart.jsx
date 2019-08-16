import React from 'react';
import PropTypes from 'prop-types';
import Block from 'components/Block';

const FlowChart = ({ data, onClickItem }) => {
  // const numberOfBoxes = [...Array(16).keys()];
  return (
    <div className="flow-chart">
      <div className="lines"></div>
      {data.map(({ name, parents, enabled, active, group }, index) => {
        return (
          <Block
            key={index}
            className={`box ${group}`}
            onClickItem={onClickItem}
            name={name}
            parents={parents}
            enabled={enabled}
            active={active}
          >
            <div className="box-content">
              <h3>{name}</h3>
            </div>
          </Block>
        );
      })}
      <div className="clearfix"></div>
    </div>
  );
};

FlowChart.defaultProps = {
  data: []
};

FlowChart.propTypes = {
  data: PropTypes.array
};

export default FlowChart;
