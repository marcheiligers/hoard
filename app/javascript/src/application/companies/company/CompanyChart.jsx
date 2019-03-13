import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SimpleSelect from '../../uiElements/FormSelect';
import ParetoChart from './ParetoChart';
//REDUX for fetching chart data
import companyActions from '../../companies/company/companyActions';
const loadCompanyChartDataRequest = companyActions.loadCompanyChartDataRequest;
const storeCompanyDateRange = companyActions.storeCompanyDateRange;
class CompanyChart extends Component {
  static propTypes = {
    chartData: PropTypes.array,
    error: PropTypes.string,
    error: PropTypes.string,
  };
  componentDidMount() {
    this.props.loadCompanyChartDataRequest(this.props.symbol, this.props.chartDateRange)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.chartData !== this.props.chartData) { // for handling date range selectors
      if (prevProps.chartData.length !== this.props.chartData.length) {
        console.log(`ChartData Updated ${this.props.chartData.length} data entries`)
      }
    }
    if (prevProps.chartData === this.props.chartData) { // for handling date range selectors
      console.log(`ChartData Did Not Update, add a snackbar to portray the message`)
    }
    if (prevProps.chartDateRange !== this.props.chartDateRange) {
      this.props.loadCompanyChartDataRequest(this.props.symbol, this.props.chartDateRange)
    }
  }
  updateDateRange = (dateRange) => {
    console.log('Got new dateRange:', dateRange)
    this.props.storeCompanyDateRange(dateRange);
  }
  // add a method for the user to select a specific date, either with a date selector, on click on a graphed point or text input.
  render() {
    return (
      <Fragment>
        <h2>Company Stocks Summary</h2>
        <SimpleSelect
          dateRange={this.props.chartDateRange}
          updateDateRange={this.updateDateRange} />
        <ParetoChart />
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    company: state.company.selectedCompany || {},
    chartData: state.company.chartData || [],
    chartDateRange: state.company.chartDateRange || '1d',
    error: state.company.error ? state.company.error : null,
  }), {
    loadCompanyChartDataRequest,
    storeCompanyDateRange
  }
)(CompanyChart)
