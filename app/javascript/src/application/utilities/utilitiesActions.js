const utilitiesActions = {
  LOADING: 'LOADING',
  loading: bool => ({
    type: utilitiesActions.LOADING,
    loading: bool,
  })
};
export default utilitiesActions;