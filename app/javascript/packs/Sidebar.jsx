import React, { Component } from "react";
import {
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  MenuList,
  MenuItem,
  Drawer
} from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Routes from "./Routes";

export const Sidebar = props => {
  const { location, classes, theme } = props;
  const activeRoute = routeName => {
    return location.pathname.indexOf(routeName) > -1 ? true : false;
  };
  return (
    <div>
      <Drawer variant="permanent">
        <MenuList>
          {Routes.map((prop, key) => {
            return (
              <Link to={prop.path} style={{ textDecoration: "none" }} key={key}>
                <MenuItem selected={activeRoute(prop.path)}>
                  <ListItemIcon>
                    <prop.icon />
                  </ListItemIcon>
                  <ListItemText primary={prop.sidebarName} />
                </MenuItem>
              </Link>
            );
          })}
        </MenuList>
      </Drawer>
    </div>
  );
};

export default withRouter(Sidebar);
