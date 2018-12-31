import React, { Fragment } from "react";
import { Link, Route } from "react-router-dom";
import Writer from "./Writer/writerComponent";
import { NotFound } from "../Errors";

const Writers = ({ match: { url }, writers }) => (
  <Fragment>
    <ul>
      {writers &&
        writers.length &&
        writers.map(({ id, name }) => (
          <li key={id}>
            <Link to={`${url}/${id}`}>{name}</Link>
          </li>
        ))}
    </ul>
    <Route
      exact
      path={url}
      render={() => <h3>Please select a writer from above.</h3>}
    />
    <Route
      path={`${url}/:writerId`}
      render={props => {
        const writer = writers.find(
          ({ id }) => id === props.match.params.writerId
        );
        if (!writer) {
          return <NotFound />;
        }
        return <Writer {...props} {...writer} />;
      }}
    />
  </Fragment>
);
export default Writers;
