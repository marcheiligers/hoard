import utilitiesReducer, { initialState } from './utilitiesReducer';
import utilitiesActions from './utilitiesActions';

describe('utilities reducer -> loader', () => {
  const defaultState = utilitiesReducer(initialState, { type: 'unexpected' });
  it('returns an object', () => {
    expect(defaultState).toBeInstanceOf(Object);
  });
  it('returns an object equal to initialState', () => {
    const expected = ['loading'];
    expect(Object.keys(defaultState)).toEqual(expect.arrayContaining(expected));
  });
  it('updates state on LOADING as true', () => {
    let testAction = utilitiesActions.loading(true);
    const newState = utilitiesReducer(defaultState, testAction);
    expect(newState.loading).toBeTruthy;
  });
  it('updates state on LOADING as false', () => {
    let testAction = utilitiesActions.loading(false);
    const newState = utilitiesReducer(defaultState, testAction);
    expect(newState.loading).toBeFalsy;
  });
});
