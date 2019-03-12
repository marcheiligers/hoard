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
  componentDidUpdate(prevProps) {
    if (prevProps.chartData !== this.props.chartData) { // for handling date range selectors
      if (prevProps.chartData.length !== this.props.chartData.length) {
        console.log(`ChartData Updated ${this.props.chartData.length} data entries`)
      }
    }
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
    chartError: state.company.chartError || null
  }), {
    loadCompanyChartDataRequest,
  }
)(CompanyChart)
