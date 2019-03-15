import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { FavoriteBorder, Favorite, StarBorder, Star } from '@material-ui/icons';
import { ItemNotFound } from '../../Errors';
import stocksActions from '../stocksActions';
const loadStockRequest = stocksActions.loadStockRequest;
const updateStockRequest = stocksActions.updateStockRequest;
const stockCardStyles = {
  card: {
    minWidth: '30vw',
    marginLeft: '1vw',
    marginRight: '1vw',
    display: 'inline-flex',
    flexDirection: "row",
    wrap: "wrap",
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};
class StockContainer extends Component {
  static propTypes = {
    stock: PropTypes.object,
    error: PropTypes.string,
    router: PropTypes.object,
    classes: PropTypes.object.isRequired
  };

  toggleProp = (event, prop) => {
    this.props.stock[prop] = !this.props.stock[prop];
    this.props.updateStockRequest(this.props.stock);
  }
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Stock Information
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {this.props.stock.symbol}
          </Typography>
          <Typography component="h6">
            annualDividends: {this.props.stock.annualDividends ? this.props.stock.annualDividends : <em>None</em>}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="Add to Loved" onClick={e => this.toggleProp(e, 'heart')}>
            {this.props.stock.heart ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <IconButton aria-label="Add to Favorites" onClick={e => this.toggleProp(e, 'star')} >
            {this.props.stock.star ? <Star /> : <StarBorder />}
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}
export default connect(
  state => ({
    stock: state.stocks.selectedStock || {},
    error: state.stocks.error ? state.stocks.error : null,
  }),
  {
    loadStockRequest,
    updateStockRequest
  }
)(withStyles(stockCardStyles)(StockContainer));
