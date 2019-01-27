import companiesData from '.companiesData.js';// TODO add this file
import companyActions from './companyActions.js';

describe('company action creators -> companyActions', () => {
  it('gets a company\'s info on loadCompanyRequest', () => {
    const testSymbol = 'CIM';
    const testLoadCompanyRequest = companyActions.loadCompanyRequest(testId);
    expect(testLoadCompanyRequest).toEqual({
      type: companyActions.LOAD_COMPANY_REQUEST,
      symbol: testSymbol
    });
  });
  it('returns a company\'s info on loadCompanySuccess', () => {
    const testCompany = companiesData.companies[0];
    const testLoadCompanySuccess = companyActions.loadCompanySuccess(testCompany);
    expect(testLoadCompanySuccess).toEqual({
      type: companyActions.LOAD_COMPANY_SUCCESS,
      selectedCompany: testCompany
    });
  });
  it('returns and error message on loadCompanyError', () => {
    const testError = { message: 'Could not load company' };
    const testLoadCompanyError = companyActions.loadCompanyError(testError);
    expect(testLoadCompanyError).toEqual({
      type: companyActions.LOAD_COMPANY_ERROR,
      error: testError.message
    });
  });
});
