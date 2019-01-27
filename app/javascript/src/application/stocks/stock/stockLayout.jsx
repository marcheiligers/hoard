import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StockContainer from './stockContainer';
import { CompanyContainer } from '../../companies/company/CompanyContainer';
import { CompanyChart } from '../../companies/company/CompanyChart';

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
        <CompanyContainer router={this.props}/>
        <CompanyChart router={this.props}/>
      </React.Fragment>
    )
  }
}
export default StockLayout;
