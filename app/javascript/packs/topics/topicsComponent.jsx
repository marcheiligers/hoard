import React from "react";
import { withRouter, Link, Route } from "react-router-dom";

const Topics = ({ match, location }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>Components</li>
      <li>Props v. State</li>
    </ul>
  </div>
);
export default withRouter(Topics);
