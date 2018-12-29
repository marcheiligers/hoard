export const writersActions = {
  LOAD_WRITERS_REQUEST: "LOAD_WRITERS_REQUEST",
  LOAD_WRITERS_SUCCESS: "LOAD_WRITERS_SUCCESS",
  LOAD_WRITERS_ERROR: "LOAD_WRITERS_ERROR",
  loadWritersRequest: () => ({
    type: writersActions.LOAD_WRITERS_REQUEST
  }),
  loadWritersSuccess: writers => ({
    type: writersActions.LOAD_WRITERS_SUCCESS,
    writers: writers
  }),
  loadWritersError: err => ({
    type: writersActions.LOAD_WRITERS_ERROR,
    error: err.message
  })
};
export default writersActions;
