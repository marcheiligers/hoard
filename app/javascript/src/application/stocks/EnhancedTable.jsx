import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from "recompose";
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { stableSort, getSorting } from '../utilities/tableUtilities';
import { FavoriteBorder, Favorite, StarBorder, Star } from '@material-ui/icons';
import { enhancedTableStyles } from '../uiElements/styles';
// REDUX
import stocksActions from './stocksActions';
const loadStocksRequest = stocksActions.loadStocksRequest;
const updateSelectedStocks = stocksActions.updateSelectedStocks;
const deleteStockRequest = stocksActions.deleteStockRequest;
const updateStockRequest = stocksActions.updateStockRequest;

class EnhancedTable extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    stocks: PropTypes.array,
    selected: PropTypes.array,
    loadStocksRequest: PropTypes.func,
    updateSelectedStocks: PropTypes.func,
  }
  state = {
    order: 'asc',
    orderBy: 'name',
    page: 0,
    rowsPerPage: 5,
  };
  componentDidMount() {
    this.props.loadStocksRequest();
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.props.updateSelectedStocks(this.props.stocks.map(stock => stock.id));
      return;
    }
    this.props.updateSelectedStocks([]);
  };

  handleClick = (event, id) => {
    const selectedArray = this.props.selected;
    const selectedIndex = selectedArray.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedArray, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedArray.slice(1));
    } else if (selectedIndex === selectedArray.length - 1) {
      newSelected = newSelected.concat(selectedArray.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedArray.slice(0, selectedIndex),
        selectedArray.slice(selectedIndex + 1),
      );
    }
    this.props.updateSelectedStocks(newSelected);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  handleDelete = () => {
    if (this.props.selected.length === 1) {
      this.props.deleteStockRequest(this.props.selected[0]);
    } else {
      // TODO: issue a general growl
      // this.props.showGrowl
      alert('Cannot delete mutiple items, please only choose one')
    }
  }
  isSelected = id => this.props.selected.indexOf(id) !== -1;

  toggleProp = (event, stockId, prop) => {
    event.preventDefault();
    const stockChosen = this.props.stocks.find(stock => stock.id === stockId)
    if (stockChosen) {
      stockChosen[prop] = !stockChosen[prop];
      this.props.updateStockRequest(stockChosen);
    } else {
      console.log('Stock not found')
      // TODO: issue a general growl
      // this.props.showGrowl
    }
  }
  render() {
    const { classes, stocks, selected } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, stocks.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDelete={this.handleDelete}
        />
        <div className={classes.tableWrapper}>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              stocks={stocks}
            />
            <TableBody>
              {stableSort(stocks, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(stock => {
                  const isSelected = this.isSelected(stock.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={stock.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onClick={event => this.handleClick(event, stock.id)} />
                      </TableCell>
                      <TableCell
                      >
                        {
                          stock.heart ?
                            <Favorite
                              onClick={event => this.toggleProp(event, stock.id, 'heart')} /> :
                            <FavoriteBorder
                              onClick={event => this.toggleProp(event, stock.id, 'heart')} />
                        }
                      </TableCell>
                      <TableCell
                      >
                        {
                          stock.star ?
                            <Star
                              onClick={event => this.toggleProp(event, stock.id, 'star')} /> :
                            <StarBorder
                              onClick={event => this.toggleProp(event, stock.id, 'star')} />
                        }
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        {stock.name ? stock.name : '--'}
                      </TableCell>

                      <TableCell
                      >
                        {stock.symbol ? (
                          <Link
                            to={{
                              pathname: `stock/${stock.id}`
                            }}
                          >
                            {stock.symbol}
                          </Link>
                        ) : (
                            '--'
                          )}
                      </TableCell>
                      <TableCell
                      >
                        {stock.annualDividends ? stock.annualDividends : 'N/A'}
                      </TableCell>
                      <TableCell
                      >
                        {stock.createdAt
                          ? moment(stock.createdAt)
                            .tz('America/Phoenix')
                            .format('YYYY/MM/DD')
                          : '--'}
                      </TableCell>
                      <TableCell
                      >
                        {stock.updatedAt
                          ? moment(stock.updatedAt)
                            .tz('America/Phoenix')
                            .format('YYYY/MM/DD')
                          : '--'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={stocks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default compose(
  connect(
    state => ({
      stocks: state.stocks.allStocks,
      selected: state.stocks.selectedStocks,
    }),
    {
      loadStocksRequest,
      updateSelectedStocks,
      deleteStockRequest,
      updateStockRequest
    }
  ),
  withStyles(enhancedTableStyles)
)(EnhancedTable)
