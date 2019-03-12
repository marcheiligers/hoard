import companyActions from './companyActions';

export const initialState = {
  selectedCompany: null,
  chartData: null,
  chartDateRange: 'ytd',
  chartError: null,
  error: null
};

export default function companyReducer(currentState = initialState, action) {
  switch (action.type) {
    case companyActions.LOAD_COMPANY_SUCCESS: {
      const newState = {
        ...currentState,
        selectedCompany: action.selectedCompany,
        error: null
      };
      return newState;
    }
    case companyActions.LOAD_COMPANY_ERROR: {
      const newState = {
        ...currentState,
        error: action.error
      };
      return newState;
    }
    case companyActions.LOAD_COMPANY_CHART_DATA_SUCCESS: {
      const newState = {
        ...currentState,
        chartData: action.chartData,
        error: null,
      };
      return newState;
    }
    case companyActions.LOAD_COMPANY_CHART_DATA_ERROR: {
      const newState = {
        ...currentState,
        chartError: action.error
      };
      return newState;
    }
    case companyActions.STORE_COMPANY_CHART_DATE_RANGE: {
      const newState = {
        ...currentState,
        chartDateRange: action.dateRange
      };
      return newState;
    }
    default:
      return currentState;
  }
}
