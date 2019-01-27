import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeComponent from './home/homeComponent';
import About from './about/aboutComponent';
import Topics from './topics/topicsComponent';
import Versions from './versions/versionsComponent';
import StyledStocksTable from './stocks/stocksTable';
import StockLayout from './stocks/stock/stockLayout';
import Layout from './Layout/layoutContainer';
import { NotFound } from './Errors';

const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={HomeComponent} />
      <Route path="/about" component={About} />
      <Route path="/versions" component={Versions} />
      <Route path="/topics" component={Topics} />
      <Route
        path="/stocks"
        render={props => <StyledStocksTable {...props} />}
      />
      <Route path="/stock/:stock_id" component={StockLayout} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
);
export default App;
