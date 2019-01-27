import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class CompanyChart extends React.Component {
  static propTypes = {
    router: PropTypes.object,
  };
  render() {
    return (
      <h1>Company Chart Goes Here</h1>
    );
  }
}

// export default connect(
//   state => ({
//   state => ({
//     company: state.company.selectedCompany
//   }), { loadCompanyRequest }
// )(CompanyChart)
