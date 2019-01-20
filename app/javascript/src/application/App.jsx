import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import HomeComponent from "./home/homeComponent";
import About from "./about/aboutComponent";
import Topics from "./topics/topicsComponent";
import Versions from "./versions/versionsComponent";
import Stocks from "./stocks/stocksComponent";
import Layout from "./Layout/layoutContainer";
import { NotFound } from "./Errors";

// REDUX
import stocksActions from "./stocks/stocksActions";
const loadStocksRequest = stocksActions.loadStocksRequest;

class App extends Component {
  componentDidMount() {
    this.props.loadStocksRequest();
  }
  render() {
    return (
      <Layout stocks={this.props.stocks}>
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route path="/about" component={About} />
          <Route path="/versions" component={Versions} />
          <Route path="/topics" component={Topics} />
          <Route
            path="/stocks"
            render={props => <Stocks {...props} stocks={this.props.stocks} />}
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}
export default connect(
  state => ({
    stocks: state.stocks.allStocks
  }),
  { loadStocksRequest }
)(App);
