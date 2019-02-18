export const layoutStyles = theme => ({
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
    width: 240,
    height: "100vh",
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  button: {
    margin: theme.spacing.unit,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    }
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  divider: {
    backgroundColor: theme.palette.background.secondary
  }
});