import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CompanyChart from './CompanyChart';
import SimpleCompanyCard from '../../uiElements/SimpleCard';
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
      ceo: this.props.company.ceo,
      issueType: this.props.company.issueType,
      sector: this.props.company.sector,
      primaryExchange: this.props.company.primaryExchange,
    }
  }
  render() {
    const info = this.extractCompanyInfo();
    return (
      <Fragment>
        <div >
          <SimpleCompanyCard info={info} />
          {/* show the next one if 'more-info' is clicked */}
          {/* <SimpleCompanyCard info={moreInfo} /> */}
        </div>
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
