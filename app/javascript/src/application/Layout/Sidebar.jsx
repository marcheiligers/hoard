import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  ListItemIcon,
  ListItemText,
  Divider,
  MenuList,
  MenuItem
} from '@material-ui/core';
import {
  Home,
  List,
  Bookmark,
  Info,
  AccountCircle,
  Build
} from '@material-ui/icons';

export const Sidebar = ({ location, classes }) => {
  return (
    <MenuList>
      <MenuItem
        component={Link}
        to="/"
        selected={'/' === location.pathname}
      >
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary={'Home'} />
      </MenuItem>
      <MenuItem
        component={Link}
        to="/about"
        selected={'/about' === location.pathname}
      >
        <ListItemIcon>
          <Info />
        </ListItemIcon>
        <ListItemText primary={'About'} />
      </MenuItem>
      <MenuItem
        component={Link}
        to="/versions"
        selected={'/versions' === location.pathname}
      >
        <ListItemIcon>
          <List />
        </ListItemIcon>
        <ListItemText primary={'Versions'} />
      </MenuItem>
      <MenuItem
        component={Link}
        to="/topics"
        selected={'/topics' === location.pathname}
      >
        <ListItemIcon>
          <Bookmark />
        </ListItemIcon>
        <ListItemText primary={'Topics'} />
      </MenuItem>
      <MenuItem
        component={Link}
        to="/stocks"
        selected={'/stocks' === location.pathname}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        <ListItemText primary={'Stocks'} />
      </MenuItem>
      <Divider className={classes.divider} />
      <MenuItem component={Link} to="#"><ListItemIcon>
        <Build />
      </ListItemIcon>
        <ListItemText primary={'Utilities'} />
      </MenuItem>
    </MenuList>
  );
};
Sidebar.propTypes = {
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withRouter(Sidebar);
