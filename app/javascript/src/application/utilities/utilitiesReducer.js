import utilitiesActions from './utilitiesActions';

export const initialState = {
  loading: null,
};

export default function utilitiesReducer(currentState = initialState, action) {
  switch (action.type) {
    case utilitiesActions.LOADING: {
      const newState = {
        ...currentState,
        loading: action.loading,
      };
      return newState;
    }
    default:
      return currentState;
  }
}
