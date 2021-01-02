import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import SeatBookingApp from './containers/SeatBookingApp'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { getAllSeats } from './actions'


const middleware = [thunk];
//middleware will print the logs for state changes
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

store.dispatch(getAllSeats())

render(
    <Provider store={store}>
        <SeatBookingApp />
    </Provider>,
    document.getElementById('root')
)

