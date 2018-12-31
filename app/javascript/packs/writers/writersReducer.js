import writersActions from "./writersActions";

const initialState = {
  allWriters: [],
  selectedWriter: null,
  error: null
};

export default function writersReducer(currentState = initialState, action) {
  switch (action.type) {
    case writersActions.LOAD_WRITERS_SUCCESS: {
      const newState = {
        ...currentState,
        allWriters: action.writers
      };
      return newState;
    }
    default:
      return currentState;
  }
}
