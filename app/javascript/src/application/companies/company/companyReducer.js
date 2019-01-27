import companyActions from './companyActions';

export const initialState = {
  selectedCompany: null,
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
    default:
      return currentState;
  }
}
