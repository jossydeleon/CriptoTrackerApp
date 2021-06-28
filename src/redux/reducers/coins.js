const coinsReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_COINS':
            return state;
        case 'SELECTED_COIN':
            return state;
        default: 
            return state;
    }
}

export default coinsReducer;