import { GET_SEATS } from "../constants/ActionTypeConstants";
import { combineReducers } from 'redux'



const seatRow = (state = {}, action) => {
    switch (action.type) {
        case GET_SEATS:
            return {
                ...state,
                ...action.rows.reduce((obj, row) => {
                    obj[row.id] = row
                    return obj
                }, {})
            }
        default:
            return state
    }
}

const rowIds = (state = [], action) => {
    switch (action.type) {
        case GET_SEATS:
            return action.rows.map(row => row.id)
        default:
            return state
    }
}

export default combineReducers({
    seatRow,
    rowIds
})

export const getRow = (state, number) =>
    state.seatRow[number]



export const getAllSeats = state =>
    state.rowIds.map(number => getRow(state, number))

    