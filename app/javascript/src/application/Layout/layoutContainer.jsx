import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Drawer,
  CssBaseline
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import { layoutStyles } from '../uiElements/styles';
import Sidebar from "./Sidebar";

class Layout extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    children: PropTypes.object,
    stocks: PropTypes.array
  }
  state = {
    mobileOpen: false
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  render() {
    const {
      classes,
      location: { pathname },
      children,
      stocks
    } = this.props;
    const { mobileOpen } = this.state;
    const drawer = (
      <div>
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>
        <Sidebar
          location={location}
          classes={classes}
          theme={layoutStyles}
          stocks={stocks}
        />
      </div>
    );
    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <Menu />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                Hoard
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{ keepMounted: true }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
      </Fragment>
    );
  }
}
export default compose(
  withRouter,
  withStyles(layoutStyles)
)(Layout);
