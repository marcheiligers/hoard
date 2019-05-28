import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { FavoriteBorder, Favorite, StarBorder, Star } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CustomizedMenu from '../../uiElements/CustomizedMenu';
import stocksActions from '../../stocks/stocksActions';
const loadStockRequest = stocksActions.loadStockRequest;
const updateStockRequest = stocksActions.updateStockRequest;
// import CompanyChart from './CompanyChart';
// import SimpleCompanyCard from '../../uiElements/SimpleCard';

const companyCardStyles = {
  card: {
    minWidth: '30vw',
    marginLeft: '1vw',
    marginRight: '1vw',
    display: 'inline-flex',
    flexDirection: "row",
    wrap: "wrap",
    justifyContent: 'space-around'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  favButton: {
    padding: '5px 10px',
  },
  favItems: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '0 20px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paragraph: {
    maxWidth: '50vw'
  }
};
class CompanyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreItems: false,
    }
  }
  static propTypes = {
    company: PropTypes.object,
    symbol: PropTypes.string, // this is passed down from the stockLayout component
    error: PropTypes.string,
    companyCardStyles: PropTypes.object,
  };

  extractCompanyInfo = () => {
    return {
      symbol: this.props.company.symbol,
      companyName: this.props.company.companyName,
      exchange: this.props.company.exchange,
      industry: this.props.company.industry,
      website: this.props.company.website,
      description: this.props.company.description,
      ceo: this.props.company.ceo,
      issueType: this.props.company.issueType,
      sector: this.props.company.sector,
      primaryExchange: this.props.company.primaryExchange,
    }
  }
  showMoreItems = (e) => {
    e.preventDefault();
    console.log(`toggle dropdown list of website link ${e.target.href}, and stats about stock actions`);
    this.setState({ showMoreItems: !this.state.showMoreItems })
  }
  toggleProp = (event, prop) => {
    this.props.stock[prop] = !this.props.stock[prop];
    this.props.updateStockRequest(this.props.stock);
  }
  render() {
    const info = this.extractCompanyInfo();
    const classes = this.props.classes;
    return (
      <Card className={classes.card}>
        <CardContent>
          <div style={{ display: 'flex' }}>
            <Typography variant="h5" component="h2">
              {info.companyName}
            </Typography>
            <div className={classes.favItems}>
              <IconButton aria-label="Add to Loved" className={classes.favButton} onClick={e => this.toggleProp(e, 'heart')}>
                {this.props.stock.heart ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              <IconButton aria-label="Add to Favorites" className={classes.favButton} onClick={e => this.toggleProp(e, 'star')} >
                {this.props.stock.star ? <Star /> : <StarBorder />}
              </IconButton>
            </div>
          </div>
          <Typography className={classes.pos} color="textSecondary">
            Sector: {info.sector}
          </Typography>
          <Typography component="h6">
            CEO: {info.ceo}
          </Typography>
          <Typography paragraph className={classes.paragraph}>
            {info.description}
          </Typography>
          <Typography component="h6">
            <a href={info.website} target="_blank">{info.website}</a>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {`Stock Symbol: ${this.props.stock.symbol}`}
          </Typography>
          <Typography component="h6">
            {`Annual Dividends: ${this.props.stock.annualDividends ? this.props.stock.annualDividends : <em>None</em>}`}
          </Typography>
        </CardContent>
        <CardActions>
          {this.props.company && <CustomizedMenu stock={this.props.stock} company={this.props.company} />}
        </CardActions>
      </Card >
    );
  }
}

export default connect(
  state => ({
    company: state.company.selectedCompany || {},
    error: (state.company.error || state.stocks.error) ? (state.company.error || state.stock.error) : null,
    stock: state.stocks.selectedStock || {},
  }), {
    loadStockRequest,
    updateStockRequest
  }
)(withStyles(companyCardStyles)(CompanyContainer));
