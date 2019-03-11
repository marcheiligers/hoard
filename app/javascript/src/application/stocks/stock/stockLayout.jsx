import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StockContainer from './stockContainer';
import CompanyContainer from '../../companies/company/CompanyContainer';
// REDUX
import stocksActions from '../stocksActions';
import companyActions from '../../companies/company/companyActions';
const loadStockRequest = stocksActions.loadStockRequest;
const loadCompanyRequest = companyActions.loadCompanyRequest;

class StockLayout extends Component {
  static propTypes = {
    stock: PropTypes.object,
    error: PropTypes.string,
    match: PropTypes.object,
    loadStockRequest: PropTypes.func,
    loadCompanyRequest: PropTypes.func,
  }
  componentDidMount() {
    this.props.loadStockRequest(this.props.match.params.stock_id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.stock !== this.props.stock) {
      if (this.props.stock.symbol) {
        this.props.loadCompanyRequest(this.props.stock.symbol);
      }
    }
  }
  render() {
    return (
      <Fragment>
        <StockContainer router={this.props} />
        {(this.props.stock && this.props.stock.symbol) ?
          <CompanyContainer symbol={this.props.stock.symbol} />
          : <div>GETTING DATA</div>
        }
      </Fragment>
    )
  }
}
export default connect(
  state => ({
    stock: state.stocks.selectedStock || {},
    company: state.company.selectedCompany || {},
    error: state.stocks.error ? state.stocks.error : null,
  }),
  {
    loadStockRequest,
    loadCompanyRequest,
  }
)(StockLayout);
