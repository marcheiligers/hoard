import utilitiesActions from './utilitiesActions.js';

describe('utilities action creators -> utilitiesActions', () => {
  it('sets loading to false', () => {
    const testLoading = utilitiesActions.loading(false);
    expect(testLoading).toEqual({
      type: utilitiesActions.LOADING,
      loading: false
    });
  });
  it('sets loading to true', () => {
    const testLoading = utilitiesActions.loading(true);
    expect(testLoading).toEqual({
      type: utilitiesActions.LOADING,
      loading: true
    });
  });
});
