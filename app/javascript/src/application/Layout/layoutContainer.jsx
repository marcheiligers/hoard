import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Drawer,
  Divider,
  CssBaseline
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import Sidebar from "./Sidebar";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    overflow: "hidden",
    position: "relative",
    width: "100%",
    zIndex: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  divider: {
    backgroundColor: theme.palette.background.secondary
  }
});

class Layout extends Component {
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
      writers,
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
          theme={styles.theme}
          writers={writers}
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
  withStyles(styles)
)(Layout);
