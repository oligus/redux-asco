import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Data from './components/data'
import { reducer as ascoReducer, createCollection } from '../lib/redux-asco'

const middlewares = [thunk]

// Take advantage of the redux browser extension if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({ asco: ascoReducer }),
  composeEnhancers(applyMiddleware(...middlewares))
)

store.dispatch(createCollection('testCollection', 'http://localhost:8080', 'api/collection'))

ReactDOM.render(
  <Provider store={store}>
    <Data />
  </Provider>,
  document.getElementById('app')
)
