import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CompanyContainer from '../../companies/company/CompanyContainer';
import CompanyChart from '../../companies/company/CompanyChart';
// REDUX
import stocksActions from '../stocksActions';
import companyActions from '../../companies/company/companyActions';
const loadStockRequest = stocksActions.loadStockRequest;
const loadCompanyRequest = companyActions.loadCompanyRequest;

class StockLayout extends Component {
  static propTypes = {
    selectedStock: PropTypes.object,
    error: PropTypes.string,
    match: PropTypes.object,
    loadStockRequest: PropTypes.func,
    loadCompanyRequest: PropTypes.func,
  }
  componentDidMount() {
    this.props.loadStockRequest(this.props.match.params.stock_id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedStock !== this.props.selectedStock) {
      if (this.props.selectedStock.symbol) {
        this.props.loadCompanyRequest(this.props.selectedStock.symbol);
      }
    }
  }
  render() {
    return (
      <Fragment>
        {(this.props.selectedStock && this.props.selectedStock.symbol) ?
          <Fragment>
            <CompanyContainer symbol={this.props.selectedStock.symbol} />
            <CompanyChart symbol={this.props.selectedStock.symbol} />
          </Fragment>
          : <div>GETTING DATA</div>
        }
      </Fragment>
    )
  }
}
export default connect(
  state => ({
    selectedStock: state.stocks.selectedStock || {},
    company: state.company.selectedCompany || {},
    error: state.stocks.error ? state.stocks.error : null,
  }),
  {
    loadStockRequest,
    loadCompanyRequest,
  }
)(StockLayout);
