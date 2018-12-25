import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HomeComponent from "./home/homeComponent";
import About from "./about/aboutComponent";
import Topics from "./topics/topicsComponent";
import Versions from "./versions/versionsComponent";

export const Content = props => {
  switch (props.location.pathname) {
    case "/home":
      return <HomeComponent />;
    case "/about":
      return <About />;
    case "/topics":
      return <Topics />;
    case "/versions":
      return <Versions />;
    default:
      return <HomeComponent />;
  }
};

export default withRouter(Content);
