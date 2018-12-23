import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from "./home/homeComponent";
import About from "./about/aboutComponent";
import Topics from "./topics/topicsComponent";

const appVersion = "0.0.1";

const App = () => (
  <Router>
    <div style={{ display: "flex" }}>
      <Header version={appVersion} />
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
      <Route path="/versions/" component={Versions} />
    </div>
  </Router>
);

const Header = ({ version }) => (
  <nav className=".j10">
    <div className="j21 j23 j151 j129 j152 j156">
      <Hoard v={version} />
      <hr className="j161" />
      <ul className="j167 j166">
        <li>
          <NavLink
            to="/home"
            style={{ lineHeight: "1.5rem", padding: "1rem" }}
            activeStyle={{
              fontWeight: "bold",
              color: "white"
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            style={{ lineHeight: "1.5rem", padding: "1rem" }}
            activeStyle={{
              fontWeight: "bold",
              color: "white"
            }}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/topics"
            style={{ lineHeight: "1.5rem", padding: "1rem" }}
            activeStyle={{
              fontWeight: "bold",
              color: "white"
            }}
          >
            Topics
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);
const Hoard = ({ v }) => {
  return (
    <div className="j131">
      <div className="j132">
        <a className="j117 j118 j130" href="/">
          <h6 className="j70 j87">Hoard</h6>
        </a>
        <a className="j117 j118 j133" href="/versions/">
          <span className="j70 j80">{`v${v}`}</span>
        </a>
      </div>
    </div>
  );
};
const Versions = () => <div>{appVersion ? appVersion : "v0.0.1"}</div>;
export default App;
