import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CompanyChart from './CompanyChart';

class CompanyContainer extends Component {
  static propTypes = {
    company: PropTypes.object,
    symbol: PropTypes.string, // this is passed down from the stockLayout component
    error: PropTypes.string,
  };

  extractCompanyInfo = () => {
    return {
      symbol: this.props.company.symbol,
      companyName: this.props.company.companyName,
      exchange: this.props.company.exchange,
      industry: this.props.company.industry,
      website: this.props.company.website,
      description: this.props.company.description,
      issueType: this.props.company.issueType,
      sector: this.props.company.sector,
      primaryExchange: this.props.company.primaryExchange,
    }
  }
  render() {
    const info = this.extractCompanyInfo();
    return (
      <Fragment>
        <h1>{this.props.company.companyName}</h1>
        <CompanyInfo info={info} />
        <CompanyChart symbol={this.props.symbol} />
      </Fragment>
    )
  }
}

export default connect(
  state => ({
    company: state.company.selectedCompany || {},
    error: state.company.error ? state.company.error : null,
  }), {}
)(CompanyContainer)

const CompanyInfo = (info) => {
  return Object.keys(info.info).map((item, idx) =>
    <div key={idx}>
      <span>{`${item}${" : "}`}</span>
      <span>{info.info[item]}</span>
    </div>
  )
}