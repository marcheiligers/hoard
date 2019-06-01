import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function CILoader(props) {
  const { classes } = props;
  return (
    <div style={{ textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}

CILoader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CILoader);