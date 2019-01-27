import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import StockContainer from './stockContainer';

class StockLayout extends Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
  }
  render() {
    return (
      <React.Fragment>
        <StockContainer router={this.props}/>
        <div>Company Info Goes Here</div>
        <div>Chart Goes Here</div>
      </React.Fragment>
    )
  }
}
export default withRouter(StockLayout);
