import { combineReducers } from 'redux'
import seats from './seats'
import cart, * as cartFunc from './cart'

export default combineReducers({
    cart,
    seats
})

const getAddedSeats = state => cartFunc.getAddedSeats(state.cart)

export const getTotal = state =>
    getAddedSeats(state)
        .reduce((total, seat) =>
            total + seat.price,
        0
        )
        .toFixed(2)

export const getCartSeats = state =>
    getAddedSeats(state).map(seat => ({
        ...seat
    }))