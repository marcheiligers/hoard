import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// REDUX
import stocksActions from '../../stocks/stocksActions';
import companyActions from './companyActions';
const loadStockRequest = stocksActions.loadStockRequest;
const loadCompanyRequest = companyActions.loadCompanyRequest;

class CompanyContainer extends Component {
  static propTypes = {
    stock: PropTypes.object,
    error: PropTypes.string,
    router: PropTypes.object,
    loadStockRequest: PropTypes.func,
    loadCompanyRequest: PropTypes.func,
  };
  ComponentDidUpdate(prevProps) {
    if (this.props.stock !== prevProps.stock) {
      this.loadCompanyRequest(this.props.stock.symbol);
    }
  }
  render() {
    console.log('THIS.PROPS:', this.props)
    console.log('THIS.PROPS:', this.props.company)
    return <h1>Company Info Goes here</h1>
  }
}

export default connect(
  state => ({
    stock: state.stocks.selectedStock || {},
    company: state.company.selectedCompany,
    error: state.stocks.error ? state.stocks.error : null,
    // company: state.company.selectedCompany || {}
  }), {
    loadCompanyRequest,
   }
// Implement map dispatch to props
)(CompanyContainer)
