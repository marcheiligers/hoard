import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "recompose";
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { toolbarStyles } from '../uiElements/styles';
// REDUX
import stocksActions from './stocksActions';
const deleteSelectedStocks = stocksActions.deleteSelectedStocks;

let EnhancedTableToolbar = props => {
  const { numSelected, classes, handleDelete } = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              Stocks
          </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected === 1 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon onClick={handleDelete} />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon onClick={(event) => console.log(`Filter Button Clicked! issue this.props.filterSelectedStocks()`)} />
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  deleteSelectedStocks: PropTypes.func,
};

export default compose(
  connect(null, { deleteSelectedStocks }),
  withStyles(toolbarStyles)
)(EnhancedTableToolbar);
