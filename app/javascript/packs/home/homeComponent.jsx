import React from "react";
import PropTypes from "prop-types";

const Home = props => (
  <div>
    <h1>Home</h1>
    <p>Hello {props.name}!</p>
  </div>
);
Home.defaultProps = {
  name: "Heiligers"
};

Home.propTypes = {
  name: PropTypes.string
};

export default Home;
