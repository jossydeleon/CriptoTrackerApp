export const dispatchAddToFavorites = (coin) => {
    return {
        type: 'SAVE_COIN_TO_FAVORITES',
        payload: coin
    }
}

export const dispatchDeleteFromFavorites = (coin) => {
    return {
        type: 'DELETE_COIN_FROM_FAVORITES',
        payload: coin
    }
}