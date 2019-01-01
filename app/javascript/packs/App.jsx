import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import HomeComponent from "./home/homeComponent";
import About from "./about/aboutComponent";
import Topics from "./topics/topicsComponent";
import Versions from "./versions/versionsComponent";
import Writers from "./writers/writersComponent";
import Stocks from "./stocks/stocksComponent";
import Layout from "./Layout/layoutContainer";
import { NotFound } from "./Errors";

// DUMMY DATA
import data from "./stocks/stocksData";
const stocks = data.stocks;
// REDUX
import writersActions from "./writers/writersActions";
// import data from "./writersData.js";

const loadWritersRequest = writersActions.loadWritersRequest;

class App extends Component {
  componentDidMount() {
    this.props.loadWritersRequest();
  }
  render() {
    return (
      <Layout writers={this.props.writers} stocks={stocks}>
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route path="/about" component={About} />
          <Route path="/versions" component={Versions} />
          <Route path="/topics" component={Topics} />
          <Route
            path="/writers"
            render={props => (
              <Writers {...props} writers={this.props.writers} />
            )}
          />
          <Route
            path="/stocks"
            render={props => <Stocks {...props} stocks={stocks} />}
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}
export default connect(
  state => ({
    writers: state.writers.allWriters
  }),
  { loadWritersRequest }
)(App);
