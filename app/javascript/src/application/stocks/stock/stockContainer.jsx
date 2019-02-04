import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ItemNotFound } from '../../Errors';
// REDUX
import stocksActions from '../stocksActions';
const loadStockRequest = stocksActions.loadStockRequest;

// rename -> it's connected to the Redux Store.
class StockContainer extends Component {
  static propTypes = {
    stock: PropTypes.object,
    error: PropTypes.string,
    router: PropTypes.object,
  };
  render() {
    if (this.props.error) {
      return (
        <ItemNotFound item="stock" id={this.props.router.match.params.stock_id} />
      );
    }
    const {
      symbol,
      name,
      annualDividends,
      heart,
      star,
      url
    } = this.props.stock;

    return (
      <div>
        <h1>
          <em>{name || symbol || `Stock`}</em>
        </h1>
        <ul>
          <li>symbol: {symbol}</li>
          <li>
            annualDividends: {annualDividends ? annualDividends : <em>None</em>}
          </li>
          <li>heart: {heart ? heart : <em>None</em>}</li>
          <li>star: {star ? star : <em>None</em>}</li>
          <li>url: {url ? url : <em>None</em>}</li>
        </ul>
      </div>
    );
  }
}
export default connect(
  state => ({
    stock: state.stocks.selectedStock || {},
    error: state.stocks.error ? state.stocks.error : null,
  }),
  { loadStockRequest }
)(StockContainer);
