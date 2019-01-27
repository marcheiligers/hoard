import React, { Component } from 'react';
import { connect } from 'react-redux';

export class CompaniesContainer extends Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  render() {
    return (
      <h1>Company Info Goes here</h1>
    );
  }
}

export default connect(
  state => ({
    company: state.companies.company
  }), { loadCompanyRequest }
// Implement map dispatch to props
)(CompaniesContainer)
