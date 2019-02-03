import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StyledStocksTable from './stocksTable';

// REDUX
import stocksActions from '../stocksActions';
const loadStocksRequest = stocksActions.loadStocksRequest;

class StockLayout extends Component {
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
      console.log('The stocks have changed,', this.props.stocks)
    }
  }
  render() {
    return (
      <Fragment>
        <StocksTable {...props} />
      </Fragment>
    )
  }
}
export default connect(
  state => ({
    stocks: state.stocks || [],
    error: state.stocks.error ? state.stocks.error : null,
  }),
  { loadStocksRequest }
)(StocksLayout);
