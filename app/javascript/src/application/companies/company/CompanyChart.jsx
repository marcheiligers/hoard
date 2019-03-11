import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CanvasJSReact from '../../canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

import ParetoChart from './ParetoChart';
class CompanyChart extends Component {
  static propTypes = {
    company: PropTypes.object,
    symbol: PropTypes.string,
    chartData: PropTypes.array,
    error: PropTypes.string,
  };
  render() {
    return (
      <Fragment>
        <h1>Company Chart Goes Here</h1>
        <ParetoChart />
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    chartData: state.company.chartData || [],
    error: state.company.error ? state.company.error : null,
  }), {
  }
)(CompanyChart)
