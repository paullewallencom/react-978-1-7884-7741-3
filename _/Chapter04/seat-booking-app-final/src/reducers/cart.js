import {
    ADD_TO_CART,
    CHECKOUT
} from '../constants/ActionTypeConstants'

const initialState = {
    addedSeats: []
}

const addedSeats = (state = initialState.addedSeats, action) => {
    switch (action.type) {
        case ADD_TO_CART:
        //if it is already there, remove it from cart
        if (state.indexOf(action.seat) !== -1) {
            return state.filter(seatobj=>seatobj!==action.seat);
          }
        return [...state, action.seat]
        default:
            return state
    }
}


export const getAddedSeats = state => state.addedSeats

const cart = (state = initialState, action) => {
    switch (action.type) {
        case CHECKOUT:
            return initialState
        default:
            return {
                addedSeats: addedSeats(state.addedSeats, action)
            }
    }
}

export default cart
