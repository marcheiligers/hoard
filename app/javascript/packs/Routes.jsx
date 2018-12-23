import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from "./home/homeComponent";
import About from "./about/aboutComponent";
import Topics from "./topics/topicsComponent";

const App = () => (
  <Router>
    <div>
      <Header />
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
);

const Header = () => (
  <ul>
    <li>
      <NavLink
        to="/home"
        activeStyle={{
          fontWeight: "bold",
          color: "red"
        }}
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/about"
        activeStyle={{
          fontWeight: "bold",
          color: "red"
        }}
      >
        About
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/topics"
        activeStyle={{
          fontWeight: "bold",
          color: "red"
        }}
      >
        Topics
      </NavLink>
    </li>
  </ul>
);

export default App;
