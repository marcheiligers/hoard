import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

class CustomizedMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    }
  };
  handleClick = (event) => {
    this.setAnchorEl(event.currentTarget);
  };
  handleClose = () => {
    this.setAnchorEl(null);
  };
  setAnchorEl = (target) => {
    this.setState({ anchorEl: target })
  };
  render() {
    return (
      <div>
        <Button
          aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={this.handleClick}
        >
          Show More
      </Button>
        <StyledMenu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <StyledMenuItem>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
          </StyledMenuItem>
          <StyledMenuItem aria-label={'company info button icon'} onClick={(e) => console.log(e.currentTarget)}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Info" />
          </StyledMenuItem>
        </StyledMenu>
      </div >
    );
  };
};

export default CustomizedMenu;
