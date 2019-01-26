import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment-timezone';

// REDUX
import stocksActions from './stocksActions';
const loadStocksRequest = stocksActions.loadStocksRequest;

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

class StocksTable extends Component {
  componentDidMount() {
    this.props.loadStocksRequest();
  }
  render() {
    const { classes, stocks } = this.props;
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
              <TableCell align="right">createdAt</TableCell>
              <TableCell align="right">updatedAt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks &&
              stocks.map(stock => {
                return (
                  <TableRow key={stock.id}>
                    <TableCell component="th" scope="stock">
                      {stock.name ? stock.name : 'N/A'}
                    </TableCell>
                    <TableCell align="right">
                      {stock.symbol ? (
                        <Link
                          to={{
                            pathname: `stock/${stock.id}`,
                            state: { stock: stocks.find(stock => stock.id) }
                          }}
                        >
                          {stock.symbol}
                        </Link>
                      ) : (
                        'N/A'
                      )}
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
                      {stock.createdAt
                        ? moment(stock.createdAt)
                            .tz('America/Phoenix')
                            .format('YYYY/MM/DD')
                        : 'N/A'}
                    </TableCell>
                    <TableCell align="right">
                      {stock.updatedAt
                        ? moment(stock.updatedAt)
                            .tz('America/Phoenix')
                            .format('YYYY/MM/DD')
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
}
StocksTable.propTypes = {
  classes: PropTypes.object.isRequired,
  stocks: PropTypes.array
};
// Applying styles
const StyledStocksTable = withStyles(styles)(StocksTable);
// Exporting connected styled component
export default connect(
  state => ({
    stocks: state.stocks.allStocks
  }),
  { loadStocksRequest }
)(StyledStocksTable);
// export default withStyles(styles)(StocksTable);
