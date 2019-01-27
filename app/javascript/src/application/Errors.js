import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

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
    <h3>{`The ${item} you are looking for with id ${id} is not found.`}</h3>
    <Button variant="contained" component={Link} to="/stocks">
      ⇦ Go Back
    </Button>
  </div>
);
