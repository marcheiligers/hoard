import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StyledStocksTable from './stocksTable';
import EnhancedTable from './EnhancedTable';
import FormBasic from '../uiElements/FormBasic'; // TODO: move this form to the stocks folder
// REDUX
import stocksActions from './stocksActions';
const loadStocksRequest = stocksActions.loadStocksRequest;
const addStockRequest = stocksActions.addStockRequest;
class StocksLayout extends Component {
  static propTypes = {
    stocks: PropTypes.array,
    error: PropTypes.string,
    match: PropTypes.object,
    loadStocksRequest: PropTypes.func,
  }
  componentDidMount() {
    this.props.loadStocksRequest();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.stocks !== this.props.stocks) {
      if (prevProps.stocks.length !== this.props.stocks.length) {
        console.log('Stocks Updated!')
      }
    }
  }
  render() {
    return (
      <Fragment>
        <h1>Stocks</h1>
        <FormBasic stocks={this.props.stocks} />
        <EnhancedTable />
        <StyledStocksTable {...this.props} />
      </Fragment>
    )
  }
}
export default connect(
  state => ({
    stocks: state.stocks.allStocks || [],
    error: state.stocks.error ? state.stocks.error : null,
  }),
  { loadStocksRequest, addStockRequest }
)(StocksLayout);
