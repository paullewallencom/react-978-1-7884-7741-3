import React from 'react'
import PropTypes from 'prop-types'
const Cart = ({seats,total, onCheckoutClicked}) => {
  
  const hasSeats = seats.length > 0
  const nodes = hasSeats ? (
    
    seats.map(seat =>
      <div>
        Seat Number: {seat.number} - Price: {seat.price}
      </div>
    )
   
  ) : (
    <em>No seats selected</em>
  )

  return (
    <div>
    <b>Selected Seats</b> <br/>
      {nodes} <br/>
    <b>Total</b> <br/>
      {total}
      <br/>
      <button onClick={onCheckoutClicked}>
        Checkout
      </button>
    </div>
  )
}

Cart.propTypes = {
  seats: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
}
export default Cart;

