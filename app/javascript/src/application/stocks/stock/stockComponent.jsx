import React, { Component } from 'react';
import { connect } from 'react-redux';
// REDUX
import stocksActions from '../stocksActions';
const loadStockRequest = stocksActions.loadStockRequest;

class Stock extends Component {
  componentDidMount() {
    this.props.loadStockRequest(this.props.match.params.stock_id);
  }
  render() {
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
  state => ({ stock: state.stocks.stock }),
  { loadStockRequest }
)(Stock);
