import * as actions from "../actions/types";

const initialState = {
  coins: [],
  loading: false,
  error: null,
};

const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_COINS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.FETCH_COINS_SUCCESSFULLY:
      return {
        coins: action.payload,
        loading: false,
        error: null,
      };

    case actions.FETCH_COINS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default coinsReducer;
