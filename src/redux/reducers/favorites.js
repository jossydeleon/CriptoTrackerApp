const favoritesReducer = (state = [], action) => {
    switch(action.type) {
        case 'SAVE_COIN_TO_FAVORITES':
            return [...state, action.payload];
        case 'DELETE_COIN_FROM_FAVORITES':
            return [...state.filter(item => item.id !== action.payload.id)];
        default: 
            return state;
    }
}

export default favoritesReducer;