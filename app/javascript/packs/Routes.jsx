import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from "./home/homeComponent";
import About from "./about/aboutComponent";
import Topics from "./topics/topicsComponent";

const App = () => (
  <Router>
    <div style={{ display: "flex" }}>
      <Header />
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
);

const Header = () => (
  <nav style={{ width: "240px" }}>
    <ul style={headerStyle}>
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
  </nav>
);

export default App;

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  listStyle: "none",
  margin: "2em",
  fontFamily: "Helvetica"
};
