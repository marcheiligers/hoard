import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeComponent from "./home/homeComponent";
import About from "./about/aboutComponent";
import Topics from "./topics/topicsComponent";
import Versions from "./versions/versionsComponent";
import Writers from "./writers/writersComponent";
import Layout from "./Layout/layoutContainer";
import { NotFound } from "./Errors";
import data from "./writersData.js";

class App extends Component {
  state = {
    writers: []
  };
  componentDidMount() {
    const writers = data.writers;
    this.setState({ writers });
  }
  render() {
    const { writers } = this.state;
    return (
      <BrowserRouter>
        <Layout writers={writers}>
          <Switch>
            <Route exact path="/home" component={HomeComponent} />
            <Route path="/about" component={About} />
            <Route path="/versions" component={Versions} />
            <Route path="/topics" component={Topics} />
            {/*<Route path="/writers" component={Writers} />*/}
            <Route
              path="/writers"
              render={props => <Writers {...props} writers={writers} />}
            />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}
export default App;
