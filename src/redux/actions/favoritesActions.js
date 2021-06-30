import * as actions from "./types";

/**
 * Action creator to add/delete coin from favorite coins
 * @param {*} coin
 * @returns
 */
export const addOrDeleteFromFavorite = (coin) => (dispatch, getState) => {
  const id = coin.id;
  const favorites = getState().favorites;

  const found = favorites.find((coin) => coin.id === id);
  if (found) {
    return dispatch({
      type: actions.DELETE_FROM_FAVORITES,
      payload: coin.id,
    });
  }

  return dispatch({
    type: actions.ADD_TO_FAVORITES,
    payload: coin,
  });
};
