import React from 'react'
import PropTypes from 'prop-types'

const Seat = ({ number, price, status, rowNo, handleClick }) => {
  return (

    <li className={'seatobj ' + status} key={number.toString()}>
      <input type="checkbox" disabled={status === "booked" ? true : false} id={number.toString()} onClick={handleClick} />
      <label htmlFor={number.toString()}>{number}</label>
    </li>

  )
}

Seat.propTypes = {
  number: PropTypes.number,
  price: PropTypes.number,
  status: PropTypes.string,
  rowNo: PropTypes.number,
  handleClick: PropTypes.func
}

export default Seat;

