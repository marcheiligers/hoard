export const companyActions = {
  LOAD_COMPANY_REQUEST: 'LOAD_COMPANY_REQUEST',
  LOAD_COMPANY_SUCCESS: 'LOAD_COMPANY_SUCCESS',
  LOAD_COMPANY_ERROR: 'LOAD_COMPANY_ERROR',
  loadCompanyRequest: id => ({
    type: companyActions.LOAD_COMPANY_REQUEST,
    id: id
  }),
  loadCompanySuccess: stock => ({
    type: companyActions.LOAD_COMPANY_SUCCESS,
    selectedStock: stock
  }),
  loadCompanyError: err => ({
    type: companyActions.LOAD_COMPANY_ERROR,
    error: err
  })
};
export default companyActions;
