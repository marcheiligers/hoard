import React from "react";
import PropTypes from "prop-types";

const HomeComponent = props => (
  <div>
    <h1>Home</h1>
    <p>Hello {props.name}!</p>
  </div>
);
HomeComponent.defaultProps = {
  name: "Heiligers"
};
HomeComponent.propTypes = {
  name: PropTypes.string
};

export default HomeComponent;
