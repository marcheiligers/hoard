import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HomeComponent from "./home/homeComponent";
import About from "./about/aboutComponent";
import Topics from "./topics/topicsComponent";
import { Versions } from "./Routes";

export class Main extends Component {
  render() {
    switch (this.props.location.pathname) {
      case "/home":
        return <HomeComponent />;
      case "/about":
        return <About />;
      case "/topics":
        return "Topics";
      case "/versions":
        return <Versions />;
      default:
        return <HomeComponent />;
    }
  }
}

export default withRouter(Main);
