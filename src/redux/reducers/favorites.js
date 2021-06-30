import * as actions from "../actions/types";

const initialState = [];

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_TO_FAVORITES:
      return [...state, action.payload];
    case actions.DELETE_FROM_FAVORITES:
      return [...state.filter((item) => item.id !== action.payload)];
    default:
      return state;
  }
};

export default favoritesReducer;
