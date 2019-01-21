import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment-timezone';
import data from './stocksData';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
});

function StocksTable(props) {
  const { classes } = props;
  const stocks = data.stocks;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <em>Stock</em>
            </TableCell>
            <TableCell align="right">symbol</TableCell>
            <TableCell align="right">annualDividends</TableCell>
            <TableCell align="right">heart</TableCell>
            <TableCell align="right">star</TableCell>
            <TableCell align="right">url</TableCell>
            <TableCell align="right">createdAt</TableCell>
            <TableCell align="right">updatedAt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map(stock => {
            return (
              <TableRow key={stock.id}>
                <TableCell component="th" scope="stock">
                  {stock.name ? stock.name : 'N/A'}
                </TableCell>
                <TableCell align="right">
                  {stock.symbol ? stock.symbol : 'N/A'}
                </TableCell>
                <TableCell align="right">
                  {stock.annualDividends ? stock.annualDividends : 'N/A'}
                </TableCell>
                <TableCell align="right">
                  {stock.heart ? stock.heart : 'N/A'}
                </TableCell>
                <TableCell align="right">
                  {stock.star ? stock.star : 'N/A'}
                </TableCell>
                <TableCell align="right">
                  {stock.url ? stock.url : 'N/A'}
                </TableCell>
                <TableCell align="right">
                  {stock.createdAt
                    ? moment(stock.createdAt)
                        .tz('America/Phoenix')
                        .format('ha z')
                    : 'N/A'}
                </TableCell>
                <TableCell align="right">
                  {stock.updatedAt
                    ? moment(stock.updatedAt)
                        .tz('America/Phoenix')
                        .format('ha z')
                    : 'N/A'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

StocksTable.propTypes = {
  classes: PropTypes.object.isRequired,
  stocks: PropTypes.array
};

export default withStyles(styles)(StocksTable);
