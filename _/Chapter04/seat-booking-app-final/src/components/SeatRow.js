import React from 'react'
import PropTypes from 'prop-types'
import Seat from './Seat';

const SeatRow = ({ seats, rowNumber, onAddToCartClicked }) => {
  return (
  <div>
    <li className="row row--1" key="1">
      <ol className="seatrow">
        {seats.map(seat =>
          <Seat key={seat.number} number={seat.number}
            price={seat.price}
            status={seat.status}
            rowNo={seat.rowNo} 
            handleClick={() => onAddToCartClicked(seat)}
          />
        )}

      </ol>
    </li>
  </div>
)
}
SeatRow.propTypes = {
  seats: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.number,
    price: PropTypes.number,
    status: PropTypes.string,
    rowNo: PropTypes.number
  })),
  rowNumber: PropTypes.number,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default SeatRow;
