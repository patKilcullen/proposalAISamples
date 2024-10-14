export const InFoViewActions = {
  FETCH_STARTS: 'FETCH_STARTS',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_ERROR: 'SET_ERROR',
  CLEAR_INFOVIEW: 'CLEAR_INFOVIEW',
};

export function contextReducer(state, action) {
  switch (action.type) {
    case InFoViewActions.FETCH_STARTS: {
      return {
        ...state,
        loading: true,
        message: '',
        error: '',
      };
    }
    case InFoViewActions.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: '',
        error: '',
      };
    }
    case InFoViewActions.SET_MESSAGE: {
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: '',
      };
    }
    case InFoViewActions.SET_ERROR: {
      return {
        ...state,
        loading: false,
        message: '',
        error: action.payload,
      };
    }
    case InFoViewActions.CLEAR_INFOVIEW: {
      return {
        ...state,
        loading: false,
        message: '',
        error: '',
      };
    }
    default:
      return state;
  }
}
