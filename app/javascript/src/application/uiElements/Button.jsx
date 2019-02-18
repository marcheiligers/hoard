import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { buttonStyles } from './styles';

function ContainedButton(props) {
  const { classes } = props;
  return (
    <Button
      variant="contained"
      className={classes.button}
      size={props.size}
      color={props.color}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </Button >
  );
}

ContainedButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(buttonStyles)(ContainedButton);