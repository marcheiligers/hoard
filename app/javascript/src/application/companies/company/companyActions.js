const companyActions = {
  LOAD_COMPANY_REQUEST: 'LOAD_COMPANY_REQUEST',
  LOAD_COMPANY_SUCCESS: 'LOAD_COMPANY_SUCCESS',
  LOAD_COMPANY_ERROR: 'LOAD_COMPANY_ERROR',
  LOAD_COMPANY_CHART_DATA_REQUEST: 'LOAD_COMPANY_CHART_DATA_REQUEST',
  LOAD_COMPANY_CHART_DATA_SUCCESS: 'LOAD_COMPANY_CHART_DATA_SUCCESS',
  LOAD_COMPANY_CHART_DATA_ERROR: 'LOAD_COMPANY_CHART_DATA_ERROR',
  STORE_COMPANY_CHART_DATE_RANGE: 'STORE_COMPANY_CHART_DATE_RANGE',
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
  loadCompanyChartDataRequest: (symbol, dateRange = '1d') => ({
    type: companyActions.LOAD_COMPANY_CHART_DATA_REQUEST,
    symbol: symbol,
    dateRange: dateRange
  }),
  loadCompanyChartDataSuccess: chartData => ({
    type: companyActions.LOAD_COMPANY_CHART_DATA_SUCCESS,
    chartData: chartData,
  }),
  loadCompanyChartDataError: err => ({
    type: companyActions.LOAD_COMPANY_CHART_DATA_ERROR,
    error: err
  }),
  storeCompanyDateRange: (dateRange = '1d') => ({
    type: companyActions.STORE_COMPANY_CHART_DATE_RANGE,
    dateRange: dateRange
  })
};
export default companyActions;
