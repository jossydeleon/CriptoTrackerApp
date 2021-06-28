import coinsReducer from "./coins";
import favoritesReducer from "./favorites";
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    coins: coinsReducer,
    favorites: favoritesReducer
})

export default allReducers;