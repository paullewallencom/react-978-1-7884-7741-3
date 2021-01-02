import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bookSeats } from '../actions'
import { getTotal, getCartSeats } from '../reducers'
import Cart from '../components/Cart'

const CartContainer = ({ seats, total, bookSeats }) => {

    return (

    <Cart
        seats={seats}
        total={total}
        onCheckoutClicked={() => bookSeats(seats)}
    />
)
}
CartContainer.propTypes = {
    seats: PropTypes.arrayOf(PropTypes.shape({
        number: PropTypes.number.isRequired,
        rowNo: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired
    })).isRequired,
    total: PropTypes.string,
    bookSeats: PropTypes.func.isRequired
}



const mapStateToProps = (state) => ({
    seats: getCartSeats(state),
    total: getTotal(state)
})

export default connect(mapStateToProps, {bookSeats})(CartContainer)
