import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ParetoChart from './ParetoChart';
import SimpleSelect from '../../uiElements/FormSelect';
import CILoader from '../../uiElements/Loader'
//REDUX for fetching chart data
import companyActions from '../../companies/company/companyActions';
const loadCompanyChartDataRequest = companyActions.loadCompanyChartDataRequest;
const storeCompanyDateRange = companyActions.storeCompanyDateRange;
class CompanyChart extends Component {
  static propTypes = {
    chartData: PropTypes.array,
    chartDateRange: PropTypes.string,
    error: PropTypes.string,
    loadCompanyChartDataRequest: PropTypes.func,
    storeCompanyDateRange: PropTypes.func,
  };
  componentDidMount() {
    this.props.loadCompanyChartDataRequest(this.props.symbol, this.props.chartDateRange)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.chartDateRange !== this.props.chartDateRange) {
      this.props.loadCompanyChartDataRequest(this.props.symbol, this.props.chartDateRange)
    }
  }
  updateDateRange = (dateRange) => {
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
        {this.props.loading ? <CILoader /> : <ParetoChart />}
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    company: state.company.selectedCompany || {},
    chartData: state.company.chartData || [],
    chartDateRange: state.company.chartDateRange || '6m',
    error: state.company.error ? state.company.error : null,
    loading: state.utilities.loading,
  }), {
    loadCompanyChartDataRequest,
    storeCompanyDateRange
  }
)(CompanyChart)
