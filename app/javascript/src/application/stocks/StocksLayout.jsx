import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StyledStocksTable from './stocksTable';
import FormBasic from '../uiElements/FormBasic';
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
      console.log('The stocks have changed and received in StocksLayout', this.props.stocks)
    }
  }
  handleAddStock(e, symbol = '') {
    e.preventDefault()
    if (symbol !== '') {
      this.props.addStockRequest(symbol);
    } else {
      console.log('handleAddStock clicked, event:', e.target)
    }
  }
  render() {
    return (
      <Fragment>
        <h1>Stocks</h1>
        <div>
          <FormBasic addStock={this.handleAddStock} />
        </div>
        <button>Remove</button>
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
