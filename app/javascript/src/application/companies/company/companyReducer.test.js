import companyReducer, { initialState } from './companyReducer';
import companyActions from './companyActions';
import companiesData from './companyData';

describe('company reducer -> load company', () => {
  const defaultState = companyReducer(initialState, { type: 'unexpected' });
  it('returns an object', () => {
    expect(defaultState).toBeInstanceOf(Object);
  });
  it('returns an object equal to initialState', () => {
    const expected = ['selectedCompany', 'error'];
    expect(Object.keys(defaultState)).toEqual(expect.arrayContaining(expected));
  });
  it('updates state on LOAD_COMPANY_SUCCESS', () => {
    const testCompany = companiesData.companies[0];
    let testAction = companyActions.loadCompanySuccess(testCompany);
    const newState = companyReducer(defaultState, testAction);
    expect(newState.selectedCompany).toEqual(testCompany);
    expect(newState.error).toBeNull();
  });
  it('updates state on LOAD_COMPANY_ERROR', () => {
    const testError = { message: 'Could not load company' };
    let testAction = companyActions.loadCompanyError(testError);
    const newState = companyReducer(defaultState, testAction);
    expect(newState.error).toEqual(testError);
  });
});
