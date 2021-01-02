import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addSeatToCart } from '../actions'
import SeatRow from '../components/SeatRow'
import SeatList from '../components/SeatList'
import { getAllSeats } from '../reducers/seats';

const SeatContainer = ({ seatrows, addSeatToCart }) => {
    return (
    
    <SeatList title="Seats">
        {seatrows.map((row, index) =>
            <SeatRow key={index}
                seats={row.seats}
                rowNumber={index}
                onAddToCartClicked={addSeatToCart} />

        )}

    </SeatList>

)
}
SeatContainer.propTypes = {
    seatrows: PropTypes.arrayOf(PropTypes.shape({
        number: PropTypes.number,
        price: PropTypes.number,
        status: PropTypes.string,
        rowNo: PropTypes.number
    })).isRequired,
    addSeatToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    seatrows: getAllSeats(state.seats)
})

export default connect(
    mapStateToProps,
    { addSeatToCart }
)(SeatContainer)
