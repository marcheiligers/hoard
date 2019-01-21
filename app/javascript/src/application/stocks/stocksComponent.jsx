import React, { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import Stock from './stock/stockComponent';
import { NotFound, ItemNotFound } from '../Errors';
import StocksTable from './stocksTable';
import data from './stocksData';

const Stocks = ({ match: { url }, stocks }) => (
  <Fragment>
    {/* This is where the table comes in*/}
    <StocksTable />
    <ul>
      {stocks &&
        stocks.length &&
        stocks.map(({ id, symbol }) => (
          <li key={id}>
            <Link to={`${url}/${id}`}>{symbol}</Link>
          </li>
        ))}
    </ul>
    <Route
      exact
      path={url}
      render={() => <h3>Please select a stock from above.</h3>}
    />
    <Route
      path={`${url}/:stockId`}
      render={props => {
        const stock = stocks.find(
          ({ id }) => String(id) === props.match.params.stockId
        );
        if (!stock) {
          return <ItemNotFound item="stock" id={props.match.params.stockId} />;
        }
        return <Stock {...props} {...stock} />;
      }}
    />
  </Fragment>
);
export default Stocks;
