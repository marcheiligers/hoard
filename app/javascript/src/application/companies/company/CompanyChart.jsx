import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ParetoChart from './ParetoChart';
//REDUX for fetching chart data
import companyActions from '../../companies/company/companyActions';
const loadCompanyChartDataRequest = companyActions.loadCompanyChartDataRequest;
class CompanyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRange: 'ytd',
    }
  }
  static propTypes = {
    company: PropTypes.object,
    symbol: PropTypes.string,
    chartData: PropTypes.array,
    error: PropTypes.string,
  };
  componentDidMount() {
    this.props.loadCompanyChartDataRequest(this.props.symbol, this.state.dateRange)
  }
  componentDidUpdate() {
    //this is where I handle the date range selections
  }
  render() {
    return (
      <Fragment>
        <h1>Company Chart Goes Here</h1>
        <div>Date Range Selector Please that hands a range to state</div>
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
    loadCompanyChartDataRequest,
  }
)(CompanyChart)
