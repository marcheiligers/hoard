import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// REDUX
import companyActions from './companyActions';
const loadCompanyRequest = companyActions.loadCompanyRequest;

class CompanyContainer extends Component {
  static propTypes = {
    company: PropTypes.object,
    symbol: PropTypes.string,
    error: PropTypes.string,
    loadCompanyRequest: PropTypes.func,
  };
  componentDidMount() {
    if (this.props.symbol) {
      this.props.loadCompanyRequest(this.props.symbol);
    }
  }
  render() {
    return (
      <Fragment>
        <h1>Company Info Goes here</h1>
        { this.props.company &&
          Object.keys(this.props.company).map((item, idx) =>
            <div key={idx}>
              <span>{`${item}${" : "}`}</span>
              <span>{this.props.company[item]}</span>
            </div>
          )
        }
      </Fragment>
    )
  }
}

export default connect(
  state => ({
    company: state.company.selectedCompany || {},
    error: state.company.error ? state.company.error : null,
  }), {
    loadCompanyRequest,
   }
)(CompanyContainer)
