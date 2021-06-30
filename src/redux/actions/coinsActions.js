import * as actions from "./types";
import axios from "axios";

/**
 * Action creator to request crypto coins to the server api.
 * We use the middleware redux-thunk, to allow use async functions
 * @param {*} dispatch 
 * @param {*} getState 
 * @returns 
 */
export const fetchCryptoCoins = () => async (dispatch, getState) => {
  dispatch({
    type: actions.FETCH_COINS_REQUEST,
  });

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1&sparkline=false"
    );

    return dispatch({
      type: actions.FETCH_COINS_SUCCESSFULLY,
      payload: response.data,
    });

  } catch (error) {
    return dispatch({
      type: actions.FETCH_COINS_FAILURE,
      payload: error,
    });
  }
};