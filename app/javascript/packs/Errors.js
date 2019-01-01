import React from "react";

export const NotFound = () => (
  <div className="defaultErrorPage">
    <div className="dialog">
      <div>
        <h1>The page you were looking for doesn't exist.</h1>
        <p>You may have mistyped the address or the page may have moved.</p>
      </div>
      <p>
        If you are the application owner check the logs for more information.
      </p>
    </div>
  </div>
);

export const ItemNotFound = ({ item, id }) => (
  <div>
    <h1>Oops!</h1>
    <p>{`The item ${item} you are looking for with id ${id} is not found`}</p>
  </div>
);
