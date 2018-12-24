import React from "react";
import { withRouter, Link, Route } from "react-router-dom";

const Topics = ({ match, location }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <a href={"#"}>Components</a>
      </li>
      <li>
        <a href={"#"}>Props v. State</a>
      </li>
    </ul>
  </div>
);
export default withRouter(Topics);
