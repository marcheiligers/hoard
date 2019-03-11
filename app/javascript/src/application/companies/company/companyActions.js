const companyActions = {
  LOAD_COMPANY_REQUEST: 'LOAD_COMPANY_REQUEST',
  LOAD_COMPANY_SUCCESS: 'LOAD_COMPANY_SUCCESS',
  LOAD_COMPANY_ERROR: 'LOAD_COMPANY_ERROR',
  LOAD_COMPANY_CHART_DATA_REQUEST: 'LOAD_COMPANY_CHART_DATA_REQUEST',
  LOAD_COMPANY_CHART_DATA_SUCCESS: 'LOAD_COMPANY_CHART_DATA_SUCCESS',
  LOAD_COMPANY_CHART_DATA_ERROR: 'LOAD_COMPANY_CHART_DATA_ERROR',
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
  }),
  loadCompanyChartDataRequest: (symbol, dateRange = 'ytd') => ({
    type: companyActions.LOAD_COMPANY_CHART_DATA_REQUEST,
    symbol: symbol,
    dateRange: dateRange
  }),
  loadCompanyChartDataSuccess: chartData => ({
    type: companyActions.LOAD_COMPANY_CHART_DATA_SUCCESS,
    chartData: chartData,
  }),
  loadComapnyChartDataError: err => ({
    type: companyAcitons.LOAD_COMPANY_CHART_DATA_ERROR,
    error: err
  }),
};
export default companyActions;
