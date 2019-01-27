export const companyActions = {
  LOAD_COMPANY_REQUEST: 'LOAD_COMPANY_REQUEST',
  LOAD_COMPANY_SUCCESS: 'LOAD_COMPANY_SUCCESS',
  LOAD_COMPANY_ERROR: 'LOAD_COMPANY_ERROR',
  loadCompanyRequest: symbol => ({
    type: companyActions.LOAD_COMPANY_REQUEST,
    symbol: symbol
  }),
  loadCompanySuccess: company => ({
    type: companyActions.LOAD_COMPANY_SUCCESS,
    selectedCompany: company
  }),
  loadCompanyError: err => ({
    type: companyActions.LOAD_COMPANY_ERROR,
    error: err
  })
};
export default companyActions;
