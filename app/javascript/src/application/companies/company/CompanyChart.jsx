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
  state = {
    dateRange: 'ytd'
  }
  static propTypes = {
    chartData: PropTypes.array,
    error: PropTypes.string,
    chartError: PropTypes.string,
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
  updateDateRange = (dateRange) => {
    console.log('Got new dateRange:', dateRange)
    this.props.storeCompanyDateRange(dateRange);
  }
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
    chartDateRange: state.company.chartDateRange || 'ytd',
    error: state.company.error ? state.company.error : null,
    chartError: state.company.chartError || null
  }), {
    loadCompanyChartDataRequest,
    storeCompanyDateRange
  }
)(CompanyChart)
