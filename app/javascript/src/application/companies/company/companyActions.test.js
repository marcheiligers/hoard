import companiesData from './companyData.js';
import companyActions from './companyActions.js';

describe('company action creators -> companyActions', () => {
  it('gets a company\'s info on loadCompanyRequest', () => {
    const testSymbol = 'CIM';
    const testLoadCompanyRequest = companyActions.loadCompanyRequest(testSymbol);
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
      error: testError
    });
  });
  it('gets a company\'s stock chart data on loadCompanyChartDataRequest when no dateRange is provided', () => {
    const testSymbol = 'CIM';
    const testLoadCompanyChartDataRequest = companyActions.loadCompanyChartDataRequest(testSymbol);
    expect(testLoadCompanyChartDataRequest).toEqual({
      type: companyActions.LOAD_COMPANY_CHART_DATA_REQUEST,
      symbol: testSymbol,
      dateRange: '1d'
    });
  });
  it('gets a company\'s stock chart data on loadCompanyChartDataRequest when a dateRange is provided', () => {
    const testSymbol = 'CIM';
    const testDateRange = '1y'
    const testLoadCompanyChartDataRequest = companyActions.loadCompanyChartDataRequest(testSymbol, testDateRange);
    expect(testLoadCompanyChartDataRequest).toEqual({
      type: companyActions.LOAD_COMPANY_CHART_DATA_REQUEST,
      symbol: testSymbol,
      dateRange: testDateRange
    });
  });
  it('returns a company\'s stock chart data on loadCompanyChartDataSuccess', () => {
    const testStockChartData = companiesData.stockDataForOneDay[0];
    const testLoadCompanyChartDataSuccess = companyActions.loadCompanyChartDataSuccess(testStockChartData);
    expect(testLoadCompanyChartDataSuccess).toEqual({
      type: companyActions.LOAD_COMPANY_CHART_DATA_SUCCESS,
      chartData: testStockChartData
    });
  });
  it('returns and error message on loadCompanyChartDataError', () => {
    const testError = { message: 'Could not fetch chart data' };
    const testLoadCompanyChartDataError = companyActions.loadCompanyChartDataError(testError);
    expect(testLoadCompanyChartDataError).toEqual({
      type: companyActions.LOAD_COMPANY_CHART_DATA_ERROR,
      error: testError
    });
  });
  it('stores a date range selection on storeCompanyDateRange when one is provided', () => {
    const testDateRange = '1m';
    const testStoreCompanyDateRange = companyActions.storeCompanyDateRange(testDateRange);
    expect(testStoreCompanyDateRange).toEqual({
      type: companyActions.STORE_COMPANY_CHART_DATE_RANGE,
      dateRange: testDateRange
    });
  });
  it('stores the default date range on storeCompanyDateRange when one isn\'t provided', () => {
    const testStoreCompanyDateRange = companyActions.storeCompanyDateRange();
    expect(testStoreCompanyDateRange).toEqual({
      type: companyActions.STORE_COMPANY_CHART_DATE_RANGE,
      dateRange: '1d'
    });
  });
});
