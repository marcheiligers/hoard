import React, { Component, Fragment } from "react";
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
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    width: "100%"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    border: "2px dotted yellow",
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    backgroundColor: "pink",
    flexGrow: 1,
    marginLeft: 0,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      marginLeft: drawerWidth,
      flexShrink: 0
    }
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
    const { classes, children } = this.props;
    const { mobileOpen } = this.state;
    const drawer = (
      <div>
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>
        <Sidebar />
        <Divider />
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
                <Hidden mdUp implementation="css">
                  {/* Make Menu hidden when at larger screen size*/}
                  <Menu />
                </Hidden>
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                Hoard
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden mdUp implementation="css">
            <Drawer
              variant="temporary"
              open={this.state.mobileOpen}
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
export default withStyles(styles)(Layout);
