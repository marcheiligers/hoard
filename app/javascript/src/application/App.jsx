import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeComponent from './home/homeComponent';
import About from './about/aboutComponent';
import Topics from './topics/topicsComponent';
import Versions from './versions/versionsComponent';
import StocksLayout from './stocks/stocksTable';
import StockLayout from './stocks/stock/stockLayout';
import Layout from './Layout/layoutContainer';
import CompanyContainer from './companies/company/CompanyContainer';
import CompanyChart from './companies/company/CompanyChart';
import { NotFound } from './Errors';

const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={HomeComponent} />
      <Route path="/about" component={About} />
      <Route path="/versions" component={Versions} />
      <Route path="/topics" component={Topics} />
      <Route path="/stocks" component={StocksLayout} />
      <Route path="/stock/:stock_id" component={StockLayout} />
      <Route path="/companies/:symbol" component={CompanyContainer} />
      <Route path="/companies/:symbol/chart" component={CompanyChart} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
);
export default App;
// TODO: add a container for the Stocks again to handle adding a new stock (POST) and removing a stock (DELETE)
