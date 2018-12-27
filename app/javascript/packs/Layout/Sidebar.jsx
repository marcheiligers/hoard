import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  MenuList,
  MenuItem,
  Drawer
} from "@material-ui/core";
import { Home, List, Bookmark, Info, AccountCircle } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

export const Sidebar = ({ location, classes, theme, writers }) => {
  return (
    <MenuList>
      <MenuItem
        component={Link}
        to="/home"
        selected={"/home" === location.pathname}
      >
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary={"Home"} />
      </MenuItem>
      <MenuItem
        component={Link}
        to="/about"
        selected={"/about" === location.pathname}
      >
        <ListItemIcon>
          <Info />
        </ListItemIcon>
        <ListItemText primary={"About"} />
      </MenuItem>
      <MenuItem
        component={Link}
        to="/versions"
        selected={"/versions" === location.pathname}
      >
        <ListItemIcon>
          <List />
        </ListItemIcon>
        <ListItemText primary={"Versions"} />
      </MenuItem>
      <MenuItem
        component={Link}
        to="/topics"
        selected={"/topics" === location.pathname}
      >
        <ListItemIcon>
          <Bookmark />
        </ListItemIcon>
        <ListItemText primary={"Topics"} />
      </MenuItem>
      <MenuItem
        component={Link}
        to="/writers"
        selected={"/writers" === location.pathname}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        <ListItemText primary={"Writers"} />
      </MenuItem>
      <Divider className={classes.divider} />
      <MenuList>
        {writers.map(({ id, name }) => {
          const to = `/writers/${id}`;
          return (
            <MenuItem
              to={to}
              key={id}
              className={classes.nested}
              component={Link}
              selected={to === location.pathname}
            >
              {name}
            </MenuItem>
          );
        })}
      </MenuList>
    </MenuList>
  );
};

export default withRouter(Sidebar);
