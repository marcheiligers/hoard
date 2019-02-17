import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import stocksActions from '../stocks/stocksActions';
const clearStockError = stocksActions.clearStockError;
class PositionedSnackbar extends Component {
  static propTypes = {
    error: PropTypes.string,
    clearStockError: PropTypes.func
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     open: false,
  //   };
  // }

  // componentDidMount = () => {
  //   this.setState({ open: true });
  // }

  handleClose = () => {
    // this.setState({ open: false });
    this.props.clearStockError();
  }

  render() {
    // const { vertical, horizontal, open } = this.state;
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={this.props.error ? true : false}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.error}</span>}
      />
    );
  }
}

export default connect(
  state => ({
    error: state.stocks.error ? state.stocks.error : null,
  }), { clearStockError }
)(PositionedSnackbar);