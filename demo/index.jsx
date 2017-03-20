import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as ascoReducer, createCollection, destroyCollection } from '../lib/redux-asco'

const middlewares = [thunk]

// Take advantage of the redux browser extension if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({ asco: ascoReducer }),
  composeEnhancers(applyMiddleware(...middlewares))
)
store.dispatch(createCollection('testCollection', 'http://markviss.dev/api/test'))
store.dispatch(destroyCollection('testCollection'))

ReactDOM.render(
  <Provider store={store}>
    <div>Moo</div>
  </Provider>,
  document.getElementById('app')
)
