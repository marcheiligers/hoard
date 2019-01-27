import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class CompanyContainer extends Component {
  static propTypes = {
    router: PropTypes.object,
  };
  render() {
    return (
      <h1>Company Info Goes here</h1>
    );
  }
}

// export default connect(
//   state => ({
//     company: state.companies.company
//   }), { loadCompanyRequest }
// // Implement map dispatch to props
// )(CompanyContainer)
